import { ItemList, SignOut } from "../shared"
import { SettingsGroup } from "../../constants/items";


const Settings = ({ navigation }) => {
  return (
    <ItemList
        data={SettingsGroup}
        navigation={navigation}
    >
        <SignOut/>
    </ItemList>
  )
}

export default Settings