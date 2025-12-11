import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

export type Category = "All" | "Games" | "Consoles" | "Accessories";

type Props = {
  categories: Category[];
  value: Category;
  onChange: (c: Category) => void;
  contentStyle?: ViewStyle;
};

export default function CategoryBar({ categories, value, onChange, contentStyle }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, contentStyle]}
    >
      {categories.map((c) => {
        const active = value === c;
        return (
          <TouchableOpacity
            key={c}
            onPress={() => onChange(c)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>{c}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  pill: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    justifyContent: "center",
    marginRight: 10,
  },
  pillActive: {
    backgroundColor: "#00ffff",
    borderColor: "#00ffff",
  },
  pillText: { color: "#cfd6df", fontWeight: "600" },
  pillTextActive: { color: "#000", fontWeight: "800" },
});
