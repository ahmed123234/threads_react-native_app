import { Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View, ViewBase } from "react-native";
import { Thread } from "../../lib/types";
import { calculateDateDifference, formatDateString } from "../../lib/utils";
import { heart } from "../../constants/images";
import { useUser } from "@clerk/clerk-react";
// import { formatDateString } from "@/lib/utils";

// type Props = {
//   thread: Thread;
//   navigation: any;
//   isComment?: boolean
// }

type SubProps = {
  name: string;
  image: string;
  id: string;
}
type Props = {
  id: string;
  parentId: string | null;
  community: SubProps | null;
  createdAt: string;
  content: string;
  author: SubProps;
  comments: {
    author: {
      image: string;
    }
  }[];
  currentUserId: string;
  isComment?: boolean, 
  navigation: any
}

const ThreadCard = ({ id, parentId, community, createdAt, content, author, comments, currentUserId, isComment, navigation }: Props) => {
  
  const { user: { id: currentId }} = useUser();

  const navigateTo = (route: string) => navigation.navigate(route, {
    // image: author?.image ?? '',
    id: author.id,
    // setModalVisible?: 
  }
)

  return (
    // html semantic tag usualy yused for card
    // @ts-ignore
    <View style={styles.container(isComment)}>
     {/* <Text style={{color: "#fff"}}>{content}</Text> */}
     <View style={{ alignItems: 'flex-start', justifyContent:'space-between', flexDirection : 'column', rowGap: 10}}>
        <View style={{ width: '100%', flexDirection: 'row', columnGap: 12}}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => { 
                author.id === currentId ? navigateTo('Profile'): navigateTo('UserProfile')
                }}
              style={{ position: 'relative', marginBottom: 10 }}
            >
              <Image
                source={{ uri: author.image }}
                alt="profile image"
                width={30}
                height={30}
                style={{ borderRadius: 50 }}
                resizeMode='cover'
              />
            </TouchableOpacity>
            
          </View>

          <View style={{flexDirection: 'column', rowGap: 3, width: "90%", paddingRight: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <TouchableOpacity
                    onPress={() => author.id === currentId ? navigateTo('Profile'): navigateTo('UserProfile')}
                
                    style={{width: "auto"}}
                  >
                      <Text 
                        style={{
                          color: '#fff'
                        }}>{author.name}
                      </Text>

                  </TouchableOpacity>

                  <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
                      <Text style={{color: '#777'}}>{calculateDateDifference(createdAt).hours}</Text>

                      <Pressable onPress={() => {alert('Hi there')}}>
                        <Text style={{color: '#fff', fontSize: 16}}>...</Text>
                      </Pressable>
                  </View>

                </View>
            <Text style={{ marginTop: 2, color: '#fff' }}>{content}</Text>

            <View 
              style={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 3,
                marginBottom: isComment? 10: 0,
                // backgroundColor: "gray"
              }}
            >
              <View style={{ display: 'flex', flexDirection: "row", columnGap: 15, alignItems: "center", justifyContent: "flex-start" }}>
                <Image
                  source={heart}
                  alt="heart"
                  width={24}
                  height={24}
                  resizeMode='cover'
                  style={{
  
                    backgroundColor: "red"
      
                  }}
                  
                />

                <TouchableOpacity onPress={() => { navigation.navigate(`/thread/${id}`)}}>
                  <Image
                    source={require('../../assets/reply.svg')}
                    alt="reply"
                    width={24}
                    height={24}
                    resizeMode='contain'

                    style={{
                      backgroundColor: "red"
                    }}
                  />
                </TouchableOpacity>

                <Image
                  source={require('../../assets/repost.svg')}
                  alt="repost"
                  width={24}
                  height={24}
                  resizeMode='contain'
                  style={{
                    backgroundColor: "red"
                  }}
                />

                <Image
                  source={require('../../assets/share.svg')}
                  alt="share"
                  width={24}
                  height={24}
                  resizeMode='contain'
                  style={{
                    backgroundColor: "red"
                  }}
                />
              </View>

              {isComment && comments.length > 0 && (
                <TouchableOpacity
                  onPress={() => { navigation.navigate(`/thread/${id}`)}}
                >
                  <Text  style={{ marginTop: 1, color: 'gray'}} >
                    {comments.length} replies
                  </Text>
                </TouchableOpacity>
              )}

            </View>
          </View>
        </View>
        {/* TODO: delete thread */}
        {/* TODO: show comment logos */}

        {/* community aspects */}
        {!isComment && community && (
          <TouchableOpacity  
            style={{
              marginTop: 5, 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor: "green"
            }}

            onPress={() => { navigation.navigate(`/communities/${community.id}`)}} >

            <Text style={{ color: 'gary' }}>
              {formatDateString(createdAt)}
              - {community.name} Community              
            </Text>
            <Image 
              source={{ uri: community.image }}
              alt="logo"
              width={14}
              height={14}
              style={{marginLeft: 1}}
              resizeMode='cover'
            />
          </TouchableOpacity>
          
        )}
      </View>
    </View>
  )
}

export default ThreadCard;

const styles = StyleSheet.create({
  // @ts-ignore
  container: (isComment: boolean) => ({
    display: "flex",
    width: 'auto', 
    // marginHorizontal: 20,
    flexDirection: 'column', 
    // rowGap: 41,
    borderRadius: 20,
    paddingHorizontal: isComment? 0: 'auto',
    padding: !isComment && 15,
    // backgroundColor: '#333'
  }),
})