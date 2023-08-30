import { ItemList } from "../shared"
import { followsGroup } from "../../constants/items"

const Follows = ({ navigation }) => {
  return (
    
    <ItemList data={followsGroup} navigation={navigation}/>
  
  )
}

export default Follows