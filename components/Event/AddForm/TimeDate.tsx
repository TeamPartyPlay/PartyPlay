import React, { useState, SyntheticEvent } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, View } from 'react-native';
import { Button } from 'react-native-elements';

const DateTime: React.FC<{}>= () => {
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setVisible(Platform.OS === 'ios');
        setDate(currentDate);
    }

    return(
        <View>
            <Button
                title="Open"
                onPress={() => setVisible(true)}
            />
            {visible && (
                <DateTimePicker
                    mode='time'
                    value={date}
                    onChange={onChange}
                    />
            )}
        </View>
    )
}

export default DateTime;