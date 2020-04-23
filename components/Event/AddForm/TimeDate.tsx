import React, { useState, useEffect } from 'react';
import { View, DatePickerAndroid, Platform, TimePickerAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Theme from '../../providers/Theme';

interface iDateTime {
    dateTimeState: [Date, React.Dispatch<React.SetStateAction<Date>>]
    title?: string,
}

const DateTime: React.FC<iDateTime>= ({dateTimeState, title}) => {
    const [date, setDate] = dateTimeState;

    const DatePicker = async (mode?: "calendar" | "spinner" | "default") => {
        try {
            if(Platform.OS === 'android') {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    minDate: date,
                    date,
                    mode: mode || 'calendar',
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                  const newDate = new Date(date);
                  newDate.setFullYear(year, month, day);
                  setDate(newDate);
                }
            }
            if(Platform.OS === 'ios'){}

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    const TimePicker = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
              hour: date.getHours(),
              minute: date.getMinutes(),
              is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const newDate = new Date(date);
                newDate.setHours(hour);
                newDate.setMinutes(minute);
                setDate(newDate);
            }
          } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
          }
    }

    useEffect(() => {
        if(date.getMilliseconds() !== 0 || date.getSeconds() !== 0){
            const newDate = new Date(date);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
            setDate(newDate);
        }
        console.log(date)
    }, [date])

    return(
        <>
        {title && 
        <View>
            <Text h4>{title}</Text>
        </View>
        }
        <View style={styles.materialButtonWithVioletTextRow}>
            <TouchableOpacity style={styles.container} onPress={() => DatePicker("calendar")}>
                <Text style={styles.caption}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={() => TimePicker()}>
                <Text style={styles.caption}>{date.toLocaleTimeString()}</Text>
            </TouchableOpacity>
        </View>
    </>
    )
}

const styles = StyleSheet.create({

    materialButtonWithVioletTextRow: {
        height: 36,
        flexDirection: "row",
    },
    container: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        width: '50%'
    },
    caption: {
        color: "#29b473",
        fontSize: 25,
    },
    captionClose: {
        color: "#fff",
        fontSize: 14,
    },

});

export default DateTime;