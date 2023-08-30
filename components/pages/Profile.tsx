import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProfileHeader } from '../shared';
import { ThreadCard } from '../cards';
import { useGlobalContext } from '../../hooks/hook';

type UserInfo = {
  username: string,
  name: string;
  image: string;
  bio: string;
  _id: string
}

const Button = ({ title, action }: { title: string, action?: void }) => (
  <TouchableOpacity
    style={{ backgroundColor: 'transparent', padding: 7, borderColor: '#555', borderWidth: 1, borderRadius: 8, flexBasis: '50%' }}
    onPress={() => action}
  >
    <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center' }}>{title}</Text>
  </TouchableOpacity>
)

const CustomModal = ({ modalVisible, setModalVisible}) => (
  <View style={{}}>
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
      
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  {/* <Pressable
    style={{}}
    onPress={() => setModalVisible(true)}>
    <Text style={{}}>Show Modal</Text>
  </Pressable> */}
</View>
)

const Profile = ({ route: { params: { id } }, navigation }) => {

  const { user } = useUser();

   const { modalVisible, setModalVisible} = useGlobalContext();

   console.log("modal status", modalVisible);
   

  const [currentTab, setCurrentTab] = useState('Threads');
  const [threads, setThreads] = useState([]);
  const [replies, setReplies] = useState([]);

  const [userInfo, setUserInfo] = useState<UserInfo>();

  // clerk will direct the user to the login page automaticly
  // if(!user) return <ActivityIndicator  size={30} style={{ backgroundColor: '#000', height: "100%", justifyContent: 'flex-start', paddingTop: 40}} color={"#fff"}/>;


  useEffect(() => {
    const fetchUserInfo = async () => {
      
      const res = await axios.get(`http://192.168.1.106:4000/user/${id}`);
      if (res.status === 200) {
        const userInfo = res.data.user;

        // console.log("userInformation are", userInfo);

        setUserInfo({
          username: userInfo.username,
          name: userInfo.name,
          _id: userInfo._id,
          image: userInfo.image,
          bio: userInfo.bio
        });
        // if(!userInfo?.onboarded) redirect('/onboarding');

      }
    }

    fetchUserInfo();
  }, [id])

  useEffect(() => {

    const fetchThreads = async (url: string) => {
      console.log("user info", userInfo, url);
      
      const res = await axios.get(url);
      if(res.status === 200) {
        console.log("fetching threads");
        if(currentTab === 'Threads') {
          setThreads([...res.data.posts]);
        } else if(currentTab === 'Replies') {
          setReplies([...res.data])
        }
      }
    }
      if(currentTab === 'Threads') {
        if(userInfo)
          fetchThreads(`http://192.168.1.106:4000/thread/author/${userInfo._id}`)
      }
  }, [currentTab, userInfo])

  if (!userInfo) return <ActivityIndicator size={30} style={{ backgroundColor: '#000', height: "100%", justifyContent: 'flex-start', paddingTop: 40 }} color={"#fff"} />;
  // console.log("thraeds", threads);
  
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        {
          backgroundColor: '#000',
          // height: '100%',
          paddingVertical: 15

        }
      }
    >

      <ProfileHeader
        name={userInfo.name}
        bio={userInfo.bio}
        imageUrl={userInfo.image}
        username={userInfo.username}
      />
      <View style={{ paddingHorizontal: 0, flexDirection: 'column', rowGap: 17 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 15, alignItems: 'center', marginTop: 15 }}>
          <Button title="Edit profile" />
          <Button title="Share profile" />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 15, alignItems: 'center', marginTop: 10 }}>
          <View style={{ flexBasis: '50%', }}>
            <Text
              onPress={() => setCurrentTab('Threads')}
              style={{
                color: currentTab === 'Threads' ? '#fff' : '#555',
                fontSize: 16,
                textAlign: 'center',
                borderBottomColor: '#fff',
                borderBottomWidth: currentTab === 'Threads' ? 1 : 0,
                padding: 6,
                paddingBottom: 10
              }}
            >
              Threads
            </Text>
          </View>

          <View style={{ flexBasis: '50%' }}>
            <Text
              onPress={() => setCurrentTab('Replies')}
              style={{
                color: currentTab === 'Replies' ? '#fff' : '#555',
                fontSize: 16,
                textAlign: 'center',
                borderBottomColor: '#fff',
                borderBottomWidth: currentTab === 'Replies' ? 1 : 0,
                padding: 6,
                paddingBottom: 10
              }}>Replies</Text>
          </View>
        </View>

        {currentTab === 'Threads' ? (
          <ScrollView style={{ marginTop: 40, marginBottom: 20 }}>
            {threads.length === 0 ? <Text style={{ color: 'gray', textAlign: 'center' }}>You haven't posted any threads yet.</Text>
              : (
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
                      author={{ image: item.author.image, id: item.author.id, name: item.author.name }}
                    />
                  )}
                  contentContainerStyle={
                    { backgroundColor: "#000", width: '100%', height: '100%', flexDirection: 'column', rowGap: 20, paddingVertical: 15 }
                  }

                  keyExtractor={(item) => item._id}
                />

              )}
          </ScrollView>
        ) : (
          <View style={{ marginTop: 40 }}>
            {replies.length === 0 ?
              <Text style={{ color: 'gray', textAlign: 'center' }}>
                You haven't posted any replies yet.
              </Text> : (
                <Text></Text>
              )
            }
          </View>
        )}
      </View>
      { user.id !== id && <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
    </ScrollView>


  )
}

export default Profile

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // height: 400,
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    height: 300,
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: '#fff',
    textAlign: 'center',
  },
});