import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "./Input";

export default function DatePicker({ onDateChange, savedDate }) {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    onDateChange(date);
    hideDatePicker();
  };

  return (
    <View>
      <Input
        label="Date and Time*"
        value={
          date
            ? date.toString().substring(0, 21)
            : savedDate
            ? savedDate.toString().substring(0, 21)
            : ""
        } // Use conditional rendering to show the date string if date is not null
        onPressIn={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={show}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
