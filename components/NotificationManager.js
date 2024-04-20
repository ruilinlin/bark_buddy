import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import * as Notifications from "expo-notifications";
import Checkbox from "expo-checkbox";

export async function verifyPermission() {
  try {
    const status = await Notifications.getPermissionsAsync();
    if (status.granted) {
      return true;
    }

    const permissionResponse = await Notifications.requestPermissionsAsync();
    return permissionResponse.granted;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default function NotificationManager({ date }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    async function localNotificationHandler() {
      try {
        const havePermission = await verifyPermission();
        if (!havePermission) {
          Alert.alert("You need to give permission for notifications");
          return;
        }

        const currentTime = new Date();
        const differenceInMs = date.getTime() - currentTime.getTime();

        if (differenceInMs <= 24 * 60 * 60 * 1000) {
          Alert.alert(
            "Invalid Reminder Time",
            "The reminder time should be at least 24 hours before the event starts."
          );
          setIsChecked(false);
          return;
        }

        const trigger = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        trigger.setSeconds(0);

        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Reminder: Event Tomorrow!",
            body: "Don't forget to attend the event tomorrow 💕",
          },
          trigger: { date: trigger },
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (isChecked) {
      localNotificationHandler();
    }
  }, [isChecked]);

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        style={styles.checkbox}
      />
      <Text style={styles.text}>
        Remind me 24 hours before the event starts
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    fontSize: 12,
  },
});
