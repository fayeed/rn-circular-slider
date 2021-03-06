import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native";
import Slider from "./Slider";
import Radial from "./Radial";
import { dates } from "./Dates";

const { width, height } = Dimensions.get("window");

export default function App() {
  const currentDate = 7;
  const [active, setActive] = useState(currentDate);
  const xOffset = new Animated.Value(0);
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: xOffset } } }],
    { useNativeDriver: true }
  );
  const ref = useRef<FlatList>();

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 360,
          width: width,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: 60,
            height: 20,
            width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#FFD080",
              fontWeight: "bold",
              fontSize: 18,
              letterSpacing: 2,
            }}
          >
            Frankie Marshal
          </Text>
        </View>
        <Slider
          handleRadius={15}
          dailRadius={130}
          min={0}
          max={359}
          xCenter={width / 2}
          yCenter={420 / 2}
          value={active}
          onValueChange={(val) => {
            const index =
              Math.round(val / 12.85) >= 28 ? 27 : Math.round(val / 12.85);
            ref.current.scrollToIndex({
              index,
              animated: true,
            });
            setActive(val);
          }}
          sliderWidth={18}
          sliderColor={"#FFD080"}
          handleColor={"#FFD000"}
          sliderStrokeColor={"#FFD080"}
        />
      </View>

      <Animated.FlatList
        ref={ref}
        data={dates}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        initialScrollIndex={currentDate}
        keyExtractor={(item, i) => `${item.month}-${i}`}
        onScrollToIndexFailed={() => {}}
        contentContainerStyle={{
          height: 500.0,
          alignItems: "center",
          overflow: "visible",
        }}
        renderItem={({ item, index }) => {
          const d = Math.round(active / 12.85);
          return (
            <Animated.View
              style={{
                width: width * 0.8,
                alignItems: "center",
                position: "relative",
                opacity: d === index ? 1 : 0.1,
                marginHorizontal: width * 0.1,
                height: 260.0,
                borderRadius: 10,
                backgroundColor:
                  d === index
                    ? dates[d].mood
                      ? "green"
                      : "#606871"
                    : "#606871",
                zIndex: d === index ? 500 : 0,
                transform: [
                  {
                    translateX: xOffset.interpolate({
                      inputRange: [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                      ],
                      outputRange: [-300, 0, 240],
                    }),
                  },
                  {
                    translateY: xOffset.interpolate({
                      inputRange: [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                      ],
                      outputRange: [-80, -20, 560],
                    }),
                  },
                  {
                    scale: xOffset.interpolate({
                      inputRange: [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                      ],
                      outputRange: [0.8, 1, 0.8],
                    }),
                  },
                ],
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "red",
                  top: -40,
                }}
              />
              <Text
                style={{
                  fontSize: 28,
                  color: "#fff",
                  letterSpacing: 6,
                  marginTop: 40,
                }}
              >{`${item.month.toUpperCase()} ${item.date}`}</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                  textAlign: "center",
                  padding: 8,
                }}
              >
                {item.description}
              </Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
