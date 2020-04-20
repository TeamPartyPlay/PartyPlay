import React, { useState, useContext } from 'react';
import { Text, View } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { Input, CheckBox } from 'react-native-elements';
import { DateTime, Tags } from '../Event/AddForm';


// tslint:disable-next-line: interface-name
interface EventScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const EventScreen: NavigationStackScreenComponent<EventScreenProps> = props => {
    // const {} = useContext() TODO: UserContext
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [owner, setOwner] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);

    return(
        <View>
            <Input
                placeholder="Name" 
                label="Name"
                value={name} 
                onChangeText={text => setName(text)}
            />
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
            <Tags state={[tags, setTags]}/>
            <DateTime />
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