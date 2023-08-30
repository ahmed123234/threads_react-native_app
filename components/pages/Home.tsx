import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState, useEffect } from "react";
import axios from "axios";
import { ThreadCard } from "../cards";
import { Thread } from "../../lib/types";
import { useUser } from "@clerk/clerk-react";

const Home = ({ navigation }) => {
  const [threads, setThreads] = useState<Thread[]>();
  useEffect(() => {
   const fetchThreads = async () => {
    const res = await axios.get(`http://192.168.1.106:4000/thread?pageNumber=1&pageSize=25`);
    if(res.status === 200) {
      const { posts } = res.data;
      console.log("data", posts);
      
      setThreads(posts);
    }
   }
   fetchThreads();
  }, []);

  const { user } = useUser();

  if(!threads) {
    return <ActivityIndicator  size={30} style={{ backgroundColor: '#000', height: "100%", justifyContent: 'flex-start', paddingTop: 40}} color={"#fff"}/>
  } 

  return (
    <ScrollView>
      <FlatList 
      data={threads}
      horizontal={false}
      scrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => ( 
  
        <ThreadCard 
          key={item._id}
          id={item._id}
          navigation={navigation}
          comments={item.children}
          currentUserId={user?.id}
          community={item.community}
          content={item.text}
          createdAt={item.createdAt}
          parentId={item.parentId}
          author={{ image: item.author.image, id: item.author.id, name: item.author.name}}
        />
      )}
      contentContainerStyle={
        {backgroundColor: "#000", width: '100%', height: '100%', flexDirection: 'column', rowGap: 20, paddingVertical: 15}
      }

      keyExtractor={(item) => item._id }
    />
    </ScrollView>
  )
}

export default Home