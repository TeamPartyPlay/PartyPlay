import React, {FC, useState} from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Theme from '../../providers/Theme';

interface iTags {
    state: [string[], React.Dispatch<React.SetStateAction<string[]>>]
}

const Tags: React.FC<iTags> = ({state}) => {
    const [tags, setTags] = state;
    const [tag, setTag] = useState("");

    const onSubmit = () => {
        if(tag){
            setTags([...tags, tag]);
            setTag("");
        }
    }

    const remove = (index: number) => {
        setTags(tags.filter((_val, i) => index !== i));
    }

    return(
        <>
            <View>
                <Input
                    style={{height: 400, width: 150}}
                    placeholder="New Tag" 
                    label="New Tag"
                    value={tag} 
                    onChangeText={text => setTag(text)}
                />
                <Button
                    title="Add Tag"
                    icon={<Ionicons name={`md-add`} size={25} color={Theme.colors.secondary}/>}
                    onPress={onSubmit}
                />

                
            </View>
            <View style={{flex: 1, flexDirection: "row", flexWrap:'wrap'}}>
            {tags.map((value, index) => (
                <View key={index} style={{height: 50, padding: 5}}>
                    <Button 
                    icon={<Ionicons name="md-close" size={15} color="red" />}
                    iconRight={true} 
                    buttonStyle={{backgroundColor: Theme.colors.secondary}} 
                    title={value} 
                    onPress={() => remove(index)} 
                    />
                </View>
             ))}
             </View>
        </>

    )
}

export default Tags;