import React, {useState} from "react";
import {TouchableOpacity, StyleSheet, View, Text, Button} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Audio} from "expo-av";

export default function Recording() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const {recording} = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
        console.log("ree" ,recording)

      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    console.log('sound' , sound)

    setRecordings(updatedRecordings);
  }
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          >
            <MaterialIcons name="play-circle-filled" size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        title={recording ? "stop Recording" : "start Recording"}
        onPress={recording ? stopRecording : startRecording}
      >
        {getRecordingLines()}

        <MaterialIcons name="mic" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    flexDirection: "row",
  },

  button: {
    position: "absolute",
    top: 0,
    left: 250,
  },
});
