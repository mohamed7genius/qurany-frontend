import { useFonts } from "expo-font";
import { useState } from "react";

export default function useFont() {
  const [state, setState] = useState(false);
  const [fontsLoaded] = useFonts({
    regularFont: require("../src/assets/Fonts/Tajawal-Regular.ttf"),
    boldFont: require("../src/assets/Fonts/Tajawal-Bold.ttf"),
    extraBoldFont: require("../src/assets/Fonts/Tajawal-ExtraBold.ttf"),
    lightFont: require("../src/assets/Fonts/Tajawal-Light.ttf"),
    quranFont: require("../src/assets/Fonts/UthmanicHafs_V20.ttf"),
  });
  if (!fontsLoaded) {
    return { state };
  } else if (!state) {
    setState(true);
  }

  return { fontsLoaded, state };
}
