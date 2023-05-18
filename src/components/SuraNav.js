import React, {useState, useRef, useEffect, useContext} from "react";
import {TouchableOpacity, StyleSheet, View, Text, Button} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { MODEL_URL, QURAN_VOICE_URL } from '@env';
const JsLingua = require('jslingua');
import { UserContext } from '../contexts/userContext';
import { useTranslation } from "react-i18next";
import { qariData } from "../helpers/quran";

export default function SuraNav({ ayat, wordPointer, suraIndex, ayaPointer, setAyaPointer, setWrongWordIndex }) {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState();
  const [waitingServerResponse, setWaitingServerResponse] = useState();
  const [responseText, setResponseText] = useState();
  const prevDuration = useRef();
  const recordingState = useRef();
  const ayaPointerRef = useRef(ayaPointer);
  const URI = useRef();
  const arTrans = JsLingua.gserv('trans', 'ara');
  const similarityAbove = 10; // in %
  const { score, setScore, setLevel, level, qariName } = useContext(UserContext);
  const [isAyaPlaying, setIsAyaPlaying] = useState();
  const [playingAyaSound, setPlayingAyaSound] = useState();

  useEffect(() => {
    return () => {
      stopRecording();
    }
  }, []);

  /* const checkStatus = async (e) => {
    try {
      //console.log('check status', new Date());
      const duration = e.durationMillis / 1000;
      URI.current = recordingState.current.getURI();

      //console.log('duration', duration);
      if(duration > 5 ){
        stopRecording();
        console.log('restart');
        startRecording();
      }
      prevDuration.current = duration;
    } catch(err) {
      console.log('error', err);
    }
  } */

  const startRecording = async () => {
    try {
      if ( waitingServerResponse ) {
        return;
      }
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
      /* recording.setOnRecordingStatusUpdate(checkStatus);
      recording.setProgressUpdateInterval(5000); // 5s */
      await recording.startAsync();
      recordingState.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  const areSimilar = (ayaWord, word) => {
    if ( !ayaWord || !word || ayaWord == '' || word == '') {
      return false;
    }
    const ayaChars = ayaWord.split('');
    const wordChars = word.split('');

    const largeWordLength = ayaChars.length > wordChars.length ? ayaChars.length : wordChars.length;

    if ( largeWordLength == 0 ) {
      return false;
    }

    const charRate = 100 / largeWordLength;
    let similarityRate = 0;

    for(let i=0;i<largeWordLength;i++){
      if ( ayaChars[i] == wordChars[i] ) {
        similarityRate += charRate;
      }
    }

    // Increase score
    setScore(Number(score)+(Number(wordChars.length)*10) )

    console.log('similarityRate', similarityRate);
    return similarityRate >= similarityAbove;

  };

  const stopRecording = async () => {
    try {
      URI.current = recordingState.current.getURI();
      await recordingState.current.stopAndUnloadAsync();
      setIsRecording(false);
      setWaitingServerResponse(true);
      const response = await FileSystem.uploadAsync(MODEL_URL, URI.current, {
        headers: {
          "content-type": "audio/mpeg",
          "header-key": 'qurany',
        },
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });
      
      const jsonRes = JSON.parse(response.body);
      setResponseText(jsonRes.text);
      if ( jsonRes.text ) {

        let currentAyat = ayat[ayaPointer].split(' ');
        const currentResponse = jsonRes.text.split(' ');
        
        let prevAyaPointer = ayaPointerRef.current;
        for (let i=0;i<currentResponse.length;i++){

          if ( areSimilar(arTrans.t(currentAyat[wordPointer.current]), arTrans.t(currentResponse[i])) ) {
            wordPointer.current = wordPointer.current + 1;
            if ( wordPointer.current >= currentAyat.length ) {
              setWrongWordIndex(-1);
              currentAyat = ayat[ayaPointer + 1]
              wordPointer.current = 0;
              ayaPointerRef.current = ayaPointer + 1;
              setAyaPointer(ayaPointer + 1);
              if ( ayaPointer + 1 >= ayat.length ) {
                // end of the sura
                break;
              }
            }
          }
        }

        if ( ayaPointerRef.current >= ayat.length ) { 
          // end of sura
          // Increase Level
          setAyaPointer(0);
          if ( level < suraIndex + 1 ) {
            setLevel(Number(suraIndex+1));
            // TODO: Display a modal for congrat and to move to next sura or repeat
          } else {
            // TODO: Display modal for second/etc congrat and to next sura or repeat
          }
          console.log('Congrates');
          return;
        } else if ( ayaPointerRef.current == prevAyaPointer ) {
          // report wrong word
          // TODO: we can add a flag to prevent make the next word as an error
          setWrongWordIndex(wordPointer.current);
          console.log('wrong word ', wordPointer.current);
        } else if ( level < suraIndex + 1 ) {
          // Add completed ayats to level %
          const completedAyatLength = String(ayaPointerRef.current).split('').length;
          let newLevel = completedAyatLength >= 3 ? ayaPointerRef.current : completedAyatLength == 2 ? `0${ayaPointerRef.current}` : `00${ayaPointerRef.current}`;
          setLevel(Number(`${suraIndex}.${newLevel}`));
        }
      } else {
        // empty audio record
        stopRecording();
      }
      setWaitingServerResponse(false);
    } catch ( err ) {
      console.log('error', err);
      setWaitingServerResponse(false);
    }
  };

  const playAya = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
      });

      const sound = new Audio.Sound();
      const suraNumber = String(suraIndex+1).length == 3 ? String(suraIndex+1) : String(suraIndex+1).length == 2 ? String(`0${suraIndex+1}`) : String(`00${suraIndex+1}`);
      const ayaNumber = String(ayaPointer+1).length == 3 ? String(ayaPointer+1) : String(ayaPointer+1).length == 2 ? String(`0${ayaPointer+1}`) : String(`00${ayaPointer+1}`);
      const ayaFullNumber = String(suraNumber) + String(ayaNumber);

      console.log('ayaFullNumber', ayaNumber, suraNumber, ayaPointer);
      await sound.loadAsync({
          uri: `${QURAN_VOICE_URL}/${qariData[qariName]}/${ayaFullNumber}.mp3`,
      });
      await sound.setVolumeAsync(1.0);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((playbackState) => {
        if ( playbackState.didJustFinish ) {
          setIsAyaPlaying(false);
        }
      });
      setIsAyaPlaying(true);
      setPlayingAyaSound(sound);
    } catch ( err ) {
      console.log('Error : ', err);
    }
  };
  
  const stopAya = async () => { 
    try {
      setIsAyaPlaying(false);
      await playingAyaSound.unloadAsync();
      setPlayingAyaSound();
    } catch ( err ) {
      console.log('Error', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={waitingServerResponse ? [styles.smallContainer, styles.disabledBtn] : styles.smallContainer}
        // onPress={isRecording ? stopRecording : startRecording}
        onPressIn={startRecording}
        onPressOut={stopRecording}
        disabled={waitingServerResponse}
      >
        <MaterialIcons name={isRecording ? "mic-off" : "mic"} size={30} color="white" />
        <Text style={styles.text}>{t( isRecording ? `sura.stopRec` : waitingServerResponse ? `sura.loadingResponse` : `sura.startRec`)}</Text>
      </TouchableOpacity>
      <View style={styles.bigContainer}>
        <Text style={styles.text}>{waitingServerResponse ? t('sura.loading') : responseText}</Text>
      </View>
      <TouchableOpacity
        style={styles.smallContainer}
        onPress={isAyaPlaying ? stopAya : playAya }
      >
        <MaterialIcons name={isAyaPlaying ? "stop" : "play-circle-filled"} size={30} color="white" />
        <Text style={styles.text}>{t( isAyaPlaying ? `sura.stop` : `sura.listenTo`)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    flexDirection: "row",
  },
  disabledBtn: {
    opacity: .5
  },
  smallContainer: {
    flex: 3,
    alignItems: 'center'
  },
  bigContainer: {
    flex: 4,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  text: {
    color: '#fff',
    fontFamily: "regularFont",
    textAlign: 'center',
    fontSize: 16,
  }
});
