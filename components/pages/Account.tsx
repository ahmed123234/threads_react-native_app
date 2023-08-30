import { View } from "react-native"
import { ItemList } from "../shared"
import { ACCOUNT_GROUP } from "../../constants/items"

const Account = ({ navigation }) => {
  return (
    <ItemList data={ACCOUNT_GROUP} navigation={navigation} />
  )
}

export default Account