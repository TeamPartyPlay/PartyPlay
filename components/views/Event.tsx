import React, { useState, useContext } from 'react';
import { Text, View, Button, AsyncStorage } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { Input, CheckBox } from 'react-native-elements';
import { DateTime, Tags } from '../Event/AddForm';
import axois from 'axios';


// tslint:disable-next-line: interface-name
interface EventScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const EventScreen: NavigationStackScreenComponent<EventScreenProps> = props => {
    // const {} = useContext() TODO: UserContext
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>();
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);

    const clearForm = () => {
        setName("");
        setDescription("");
        setStart(new Date());
        setEnd(undefined);
        setIsPublic(false);
        setTags([]);
    }

    const onSubmit = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const res = await fetch('https://partyplayserver.herokuapp.com/api/event', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    // tslint:disable-next-line: object-literal-sort-keys
                    description,
                    lat: 0,
                    lng: 0,
                    start,
                    end,
                    isPublic,
                    tags,
                    token: userToken
                })
            })
            if(res.status === 200){
                const json =  await res.json();
                clearForm();
                props.navigation.goBack();
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <View style={{flex: 1, flexDirection: "column"}}>
            <View>
            <Input
                placeholder="Name" 
                label="Name"
                value={name} 
                onChangeText={text => setName(text)}
                style={{height: 300}}
            />
            </View>

            <Input
                placeholder="Description" 
                label="Description"
                value={description} 
                onChangeText={text => setDescription(text)}
            />
            <CheckBox 
                title="Is Public" 
                checked={isPublic} 
                onPress={() => setIsPublic(!isPublic)}
            />
            <DateTime dateTimeState={[start, setStart]} />
            <Tags state={[tags, setTags]}/>
            <Button title="Submit" onPress={onSubmit} />
        </View>
    )

}


EventScreen.navigationOptions = {
    headerTitle: "Add An Event",
    headerStyle:{
        height: 75,
        backgroundColor: '#33333D'
    }
  }

export default EventScreen;