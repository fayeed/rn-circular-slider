import React, { useRef, useState, useCallback, useMemo } from "react";
import { PanResponder, View, Dimensions, Image } from "react-native";
import Svg, {
  Circle,
  Path,
  Text,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import Radial from "./Radial";
import { dates } from "./Dates";

interface SliderProps {
  xCenter: number;
  yCenter: number;
  handleRadius: number;
  dailRadius: number;
  min: number;
  max: number;
  value: number;
  onValueChange: (val) => void;
  sliderWidth: number;
  handleColor: string;
  sliderColor: string;
  sliderStrokeColor: string;
}

export default function Slider({
  xCenter,
  yCenter,
  handleRadius,
  dailRadius,
  min,
  max,
  sliderWidth,
  sliderColor,
  handleColor,
  sliderStrokeColor,
  value,
  onValueChange,
}: SliderProps) {
  const currentDate = 7;
  const [angle, setAngle] = useState<number>(value * 12.85);
  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gesture) => true,
      onStartShouldSetPanResponderCapture: (evt, gesture) => true,
      onMoveShouldSetPanResponder: (evt, gesture) => true,
      onMoveShouldSetPanResponderCapture: (evt, gesture) => true,
      onPanResponderMove: (evt, gesture) => {
        const xOrigin = xCenter - (dailRadius + handleRadius);
        const yOrigin = yCenter - (dailRadius + handleRadius);
        const a = cartesianToPolar(
          gesture.moveX - xOrigin,
          gesture.moveY - yOrigin
        );

        if (a <= min) {
          setAngle(min);
          onValueChange(min);
        } else if (a >= max) {
          setAngle(max);
          onValueChange(max);
        } else {
          const an = Math.round(a / 12.85) * 12.85;

          setAngle(an >= max ? 360 : an);
          onValueChange(an >= max ? 360 : an);
        }
      },
    })
  );

  const cartesianToPolar = (x: number, y: number) => {
    const val = dailRadius + handleRadius;
    const a = currentDate * 12.85 + 90;

    if (x === 0) {
      return y > val ? 0 : 180;
    } else if (y === 0) {
      return x > val ? a : y > val ? a * 2 : 0;
    } else {
      return (
        Math.round(Math.atan((y - val) / (x - val)) * (180.0 / Math.PI)) +
        (x > val ? a : y > val ? a * 2 : 0)
      );
    }
  };

  const polarToCartesian = (angle: number) => {
    const val = dailRadius + handleRadius;
    const a = currentDate * 12.85 + 90;
    const newAngle = ((angle - a) * Math.PI) / 180.0;

    const x = val + dailRadius * Math.cos(newAngle);
    const y = val + dailRadius * Math.sin(newAngle);

    return { x, y };
  };

  const start = polarToCartesian(0);
  const end = polarToCartesian(angle);
  const width = (dailRadius + handleRadius) * 2;

  return (
    <Svg width={width} height={width}>
      <Defs>
        <LinearGradient id="path" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
          <Stop offset="1" stopColor="red" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Circle
        r={dailRadius + sliderWidth / 2 - 1}
        cx={width / 2}
        cy={width / 2}
        strokeWidth={2}
        stroke={sliderStrokeColor}
      />
      <Path
        stroke={sliderColor}
        strokeWidth={sliderWidth}
        strokeLinecap="round"
        fill="none"
        d={`M${start.x} ${start.y} A ${dailRadius} ${dailRadius} 0 ${
          angle > 180 ? 1 : 0
        } 1 ${end.x} ${end.y}`}
      />
      <Radial value={angle / 12.85} />
      <View
        style={{
          height: width,
          width,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 180,
            width: 180,
            borderRadius: 90,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("./user.jpg")}
            style={{
              height: 140,
              width: 140,
              borderRadius: 70,
              borderWidth: 4,
              borderColor: "#fff",
            }}
          />
        </View>
      </View>
      <Circle
        fill={
          dates[
            Math.round(angle / 12.85) === 28 ? 0 : Math.round(angle / 12.85)
          ].mood
            ? "url(#path)"
            : "grey"
        }
        r={90}
        cx={width / 2}
        cy={width / 2}
      />

      <G x={end.x - handleRadius} y={end.y - handleRadius}>
        <Circle
          r={handleRadius}
          cx={handleRadius}
          cy={handleRadius}
          fill={handleColor}
          {...responder.current.panHandlers}
        />
        <Text
          x={handleRadius}
          y={handleRadius + 12 / 2}
          fontSize={12}
          fill={"white"}
          textAnchor="middle"
        >
          {Math.round(angle / 13) + 1}
        </Text>
      </G>
    </Svg>
  );
}
