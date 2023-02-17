import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Hasanat from "../components/Hasanat";
export default function Battery() {
  const containerRef = useRef();
  const [width, setWidth] = useState();
  const sign = useRef("+");
  const horizontalPos = useRef();
  console.log("this", containerRef.current);

  const sur = [
    "Fatha",
    "Baqara",
    "El Nsaa",
    "Al Amran",
    "AL-MAIDAH",
    "Al Anam",
    `AL-A'RAF`,
    "AL-ANFAL",
    "AL-TAUBAH",
    "Al nur",
  ];
  useEffect(() => {
    console.log("ref", containerRef.current?.offsetWidth);
    if (containerRef.current?.offsetWidth) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);
  return (
    <Background>
      <Hasanat />
      <ScrollView contentContainerStyle={styles.app} ref={containerRef}>
        {width &&
          sur.map((sura, i) => {
            console.log("i=0", sura);
            let left;
            if (i === 0) {
              left = width / 2 - 50;
              horizontalPos.current = left;
              sign.current = "+";
            } else {
              if (sign.current === "+") {
                left = horizontalPos.current + 50;
                if (width - 108 <= left) {
                  sign.current = "-";
                  left = horizontalPos.current - 50;
                }
                horizontalPos.current = left;
                console.log("+", left, sura);
              } else {
                left = horizontalPos.current - 50;
                if (left <= 0) {
                  sign.current = "+";
                  left = horizontalPos.current + 50;
                }
                horizontalPos.current = left;
                console.log("-", left, sura);
              }
            }
            return (
              <Text
                style={{ ...styles.sura, top: i * 120, left: left }}
                key={`Battery_${sura}`}
              >
                {sura}
              </Text>
            );
          })}
      </ScrollView>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    width: "100%",
  },
  sura: {
    display: "flex",
    width: 100,
    height: 100,
    borderWidth: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    position: "absolute",
  },
});
