import { Text, View } from 'react-native'

const YourLikes = () => {
  const likes = 0;
  return (
    <View style={{justifyContent: 'center', flexDirection: 'row', alignContent: 'center', alignItems: 'center', height: "100%"}}>
      {!likes && (<Text style={{color: '#777', marginTop: -100, fontSize: 15}}>
        Posts you like will appear here.
      </Text>)}
    </View>
  )
}

export default YourLikes