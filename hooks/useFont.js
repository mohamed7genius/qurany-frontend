import { useFonts } from "expo-font";
import { useState } from "react";

export default function useFont() {
  const [state, setState] = useState(false);
  const [fontsLoaded] = useFonts({
    regularFont: require("../src/assets/fonts/Tajawal-Regular.ttf"),
    boldFont: require("../src/assets/fonts/Tajawal-Bold.ttf"),
    extraBoldFont: require("../src/assets/fonts/Tajawal-ExtraBold.ttf"),
    lightFont: require("../src/assets/fonts/Tajawal-Light.ttf"),
    quranFont: require("../src/assets/fonts/UthmanicHafs_V20.ttf"),
  });
  if (!fontsLoaded) {
    return { state };
  } else if (!state) {
    setState(true);
  }

  return { fontsLoaded, state };
}
