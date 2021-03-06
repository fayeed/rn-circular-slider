import React, { useMemo, memo } from "react";
import { G, Circle, Text, Line } from "react-native-svg";
import { Dates, dates } from "./Dates";

interface RadialPorps {
  radius?: number;
  stroke?: string;
  value?: number;
}

export default function Radial({
  radius = 130,
  stroke = "#000",
  value = 0,
}: RadialPorps) {
  const textRadius = radius - 1;

  const arr = useMemo(() => new Array(28).fill(0), []);

  const width = (radius + 15) * 2;

  const currentDate = 7;

  return (
    <G x={width / 2} y={width / 2}>
      <G transform={{ translate: "0, 4" }}>
        {arr.map((h, i) => (
          <Text
            key={`s-${i}`}
            fill={value >= i ? "#fff" : "#000"}
            fontSize="10"
            textAnchor="middle"
            x={
              textRadius *
              Math.cos(((2 * Math.PI) / 28) * (i - currentDate) - Math.PI / 2)
            }
            y={
              textRadius *
              Math.sin(((2 * Math.PI) / 28) * (i - currentDate) - Math.PI / 2)
            }
          >
            {i + 1}
          </Text>
        ))}
        {dates.map((e, i) => (
          <Circle
            key={`cir-${i}`}
            r={12}
            cx={
              (textRadius + 1) *
              Math.cos(((2 * Math.PI) / 28) * (i - currentDate) - Math.PI / 2)
            }
            cy={
              (textRadius + 1) *
                Math.sin(
                  ((2 * Math.PI) / 28) * (i - currentDate) - Math.PI / 2
                ) -
              4
            }
            strokeWidth={2}
            stroke={e.mood ? "red" : "transparent"}
          />
        ))}
      </G>
    </G>
  );
}
