import React, {FC, useState} from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

interface iTags {
    state: [string[], React.Dispatch<React.SetStateAction<string[]>>]
}

const Tags: React.FC<iTags> = ({state}) => {
    const [tags, setTags] = state;
    const [tag, setTag] = useState("");

    const onSubmit = () => {
        setTags([...tags, tag]);
        setTag("");
    }

    return(
        <>
            <Input
                placeholder="New Tag" 
                label="New Tag"
                value={tag} 
                onChangeText={text => setTag(text)}
            />
            <Button 
                icon={<Ionicons name={`md-add`}/>}
                onPress={onSubmit} 
            />
            {tags.map((value, index) => (
                <Text key={index}>{value}</Text>
            ))}
        </>
    )
}

export default Tags;