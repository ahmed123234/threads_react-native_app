import { Image, Text, TouchableOpacity, View } from "react-native";
import TopBarNav from "../../screens/TopBarNav";
import { useState } from "react";

type Props = {
    name: string;
    username: string;
    bio: string;
    imageUrl: string;
}

const ProfileHeader = ({ name, username, bio, imageUrl }: Props) => {

    return (
        <View style={{paddingHorizontal: 20, flexDirection: 'column', rowGap: 17}}>

            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 15, width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>

                <Image
                    source={{ uri: imageUrl }}
                    alt='profile image'
                    width={80}
                    height={80}
                    resizeMode='cover'
                    style={{ borderRadius: 50 }}
                />


                <View style={{ flexDirection: 'column', rowGap: 5, paddingRight: 10, }}>
                    <TouchableOpacity
                        // onPress={() => { navigation.navigate(`/profile/${id}`) }}
                        style={{ width: "auto" }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                color: '#fff'
                            }}>{name}
                        </Text>

                    </TouchableOpacity>

                    <Text
                        style={{
                            color: '#777',
                            fontSize: 16,
                        }}>@{username}
                    </Text>
                </View>

            </View>

            <Text style={{ color: '#fff', fontSize: 16 }}>{bio}</Text>
            <Text style={{ color: '#777', fontSize: 12 }}>{0} followers</Text>
            
            <View  style={{ height: 2, backgroundColor: 'gray', marginTop: 10 }}/>

            {/* <TopBarNav/> */}
            
        </View>
    )
}

export default ProfileHeader