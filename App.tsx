import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Slider from "./Slider";
import Radial from "./Radial";

const { width, height } = Dimensions.get("window");

export default function App() {
  const date = new Date(Date.now());
  const currentDate = date.getDate();
  const [active, setActive] = useState(currentDate - 1);

  return (
    <View style={styles.container}>
      <Slider
        handleRadius={15}
        dailRadius={130}
        min={0}
        max={359}
        xCenter={width / 2}
        yCenter={height / 2}
        value={active}
        onValueChange={(val) => setActive(val)}
        sliderWidth={16}
        sliderColor={"rgba(27, 27, 27, 0.6)"}
        handleColor={"rgba(27, 27, 27, 1)"}
        sliderStrokeColor={"rgba(27, 27, 27, 0.6)"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
