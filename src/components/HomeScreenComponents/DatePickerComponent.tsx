import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";

const DatePickerField = ({
  control,
  name,
  label,
  placeholder = "Select date",
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text style={value ? styles.dateText : styles.placeholder}>
                {value ? value.toDateString() : placeholder}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowPicker(Platform.OS === "ios");
                  if (selectedDate) {
                    console.log(
                      `Selected ${name}:`,
                      selectedDate.toISOString()
                    );
                    onChange(selectedDate);
                  }
                }}
              />
            )}
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7,
    marginTop: 18,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    color: "#000",
  },
  placeholder: {
    color: "#999",
  },
});

export default DatePickerField;
