import { Text, TouchableOpacity, View } from "react-native";
import { Icon, Icons, SettingItem } from "../../lib/types";
import { ReactNode } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

const Item = ({ icons: { leftIcon, rightIcon }, title, navigation, route, description }: SettingItem) => (
    <TouchableOpacity style={{ flexDirection:'column', rowGap: 10 }}
        onPress={() => navigation.navigate(route)}
    >
        <View style={{ justifyContent: 'space-between', flexDirection: "row" }}>
            <View style={{ flexDirection: 'row', alignItems: "center", columnGap: 13, }}>
                {leftIcon && <FontAwesome name={leftIcon.name} color={leftIcon.color || '#fff'} size={leftIcon.size || 21} />}

                <Text style={{ color: '#fff', fontSize: 16 }}>{title}</Text>
            </View>

            {rightIcon && <FontAwesome name={rightIcon.name} color={rightIcon.color || '#fff'} size={rightIcon.size || 21} />}

        </View>
        {description && (<Text style={{ color: "#fff" }}>{description}</Text>)}
    </TouchableOpacity>
)

const ItemList = ({ children, data, navigation }: { children?: ReactNode, data: Array<{}>, navigation: any }) => {
    //   data.map((item: SettingItem) => {
    //     console.log(item.description );
    //   })
        
    return(
        <View style={{ flexDirection: "column", rowGap: 20, paddingTop: 10 }}>
        <View style={{ flexDirection: 'column', rowGap: 22, paddingHorizontal: 20 }}>
            {data.map(({ icons, title, route }: SettingItem) => (
                <Item icons={icons} title={title} navigation={navigation} route={route} />
            ))}
        </View>
        {children}
    </View>
    )
}
;

export default ItemList