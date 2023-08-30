import { useUser } from "@clerk/clerk-react"
import { Image, InputAccessoryView, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useGlobalContext } from "../../hooks/hook";
import { useEffect, useState } from "react";
import { Touchable } from "react-native";
import { type } from "os";
import axios from "axios";


const ThreadForm = ({ 
  // main, 
  setThreads, 
  thread , 
  setCurrentThread, 
  currentThread, 
  index, 
  currentIndex, 
  setCurrentIndex , 
  threads
}: {
  // main: boolean,
  setThreads: any,
  threads:Props[]
  index: number,
  thread: Props,
  setCurrentThread: any, 
  currentThread: any,
  currentIndex: any,
  setCurrentIndex: any
}) => {

  console.log(thread, index);
  
  const { currentUser: { image, username } } = useGlobalContext();
  const [isActive, setIsActive] = useState<Boolean>(thread.state);


  // useEffect(() => {
  //   setIsActive(prev => !prev)
  // }, [thread.state])

  // const [prev, setPrev] = useState(thread.prev);

  // useEffect(() => {
  //   if(prev.content === '') {
  //     setIsActive(false);
      
  //     if(thread.isCurrent === false) {
  //       // threads.pop();
  //       // console.log("hi");
        
  //     }
  //   } 
    // else {
    //   setThreads((prev) => 
    //     [...prev, {state: false, content: '', prev: thread, isCurrent: false }]);
    // }
  // }, [prev.content])

  const handlePress = () => {
    if(index === 0 || threads[index - 1].content !== '') {
      setCurrentThread(thread);
      setThreads(prev => {
        // const currentThreadIndex = threads.findIndex((thread) => thread.isCurrent === true );
        // const currentTh = threads.find((thread) => thread.isCurrent === true);
        // currentThread.isCurrent = false;
        // threads[currentThreadIndex] = currentTh;
        prev.map((thread) => {
          if(thread.isCurrent === true) {
            thread.isCurrent = false; 
            return;
          }
        })
  
        const newCurrentThIndex = threads.findIndex((thread) => thread === currentThread );
        let newCurrentTh = threads.find((thread) => thread === currentThread);
        newCurrentTh = { ...newCurrentTh, isCurrent: true, state: true };
        threads[newCurrentThIndex] = newCurrentTh;
        
        // prev.map((thread) => {
          
        //   if(thread === currentThread ) { 
        //     thread.isCurrent = true; 
        //     thread.state = true;
        //     return;
        //   }
        // })

        return [...threads]
      })
    }
    
    if (!isActive || index == threads.length - 1) {
      setIsActive(true)
      setThreads((prev) => 
        [...prev, {state: false, content: '', isCurrent: false }]);
    }
  }

  return (
    <Pressable
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 30, width: 400,
        paddingHorizontal: 30,
        position: 'relative'
      }}
      onPress={handlePress}
    >
      <Image 
        source={{ uri: image }}
        width={thread.state ? 45 : 20}
        height={thread.state ? 45 : 20}
        resizeMode='cover'
        style={{
          borderRadius: 50,
          position: 'absolute',
          top: thread.state ? 0 : 10,
          left: thread.state ? 10 : 21,
          opacity: !thread.state? 0.4: 1,
          // paddingTop: !main && 5
        }}
      />
      <Text style={{ color: '#fff', paddingHorizontal: 30, paddingTop: 5 }}>{thread.state ? username : ''}</Text>
      <View style={{ width: '70%' }}>
        <TextInput
          onPressIn={handlePress}
          returnKeyType='google'
          placeholder={thread.state ? "Start a thread..." : 'Add to thread'}
          placeholderTextColor={'gray'}
          editable={ thread.state || threads[index - 1].content !== ''}
          multiline
          value={thread.content}
          onChangeText={(text) => {

            setThreads(prev => {
              prev.map((thread, index) => {
                if(thread.isCurrent === true) {
                  thread.content = text;

                  if(text === '' && index > 0) {
                    // thread.isCurrent = false;
                    threads.splice(index, 1)
                    // setIsActive(false)
                    
                    // setCurrentThread(threads[0]);
                    // for(let i = index; i < threads.length; i++) {
                    //   // threads[i].state = ;
                    //   threads[i].content = '';
                    //   // threads[i].
                    // }

                    setThreads(threads);
                  }
                  return;  

                  
                }
                
                // console.log(index);
                
                // if(text == '' && index > 0 && thread.isCurrent) {
                  // thread.content = '';
                  // console.log("try to delete thread", thread);
                  
                  // threads.splice(index, 1)
                  // return;
                // }
              })
              return [...prev]
            })
            // setThreads((prev) => {
            // prev.map((thread) => {
            //   if (thread.isCurrent) {
            //     thread.content = text;
            //   }
            // })
          // })
          // setCurrentThread({...currentThread, content: text })
          // console.log("current thread", currentThread);
          
            // setCurrentThread({index: {content: text}} )
          }}
          // numberOfLines={10}
          style={{
            color: '#fff',
            // padding: 10,
            overflow: 'scroll',
            borderBlockColor: 'red',
            borderLeftWidth: 1,
            borderColor: 'gray',
            paddingHorizontal: 30,
            paddingBottom: 10
            // opacity: !isActive && 0.4
          }}
        />
      </View>

    </Pressable>
  )
}
interface Props {
  state: boolean;
  content: string; 
  // prev: Props;
  isCurrent: boolean;
  // next: ThreadProp | null;
}
type ThreadProp = Record<number, Props>

const CreateThread = ({navigation}) => {
  // const { user: {username, imageUrl, }} = useUser(); 
  // const pre: Props = {content: 'first', isCurrent:false, state: false, prev: null}
  const th1: Props = { state: true, content: '' , isCurrent: true };
  const th2: Props = { state: false, content: '',isCurrent: false} ;

  const { currentUser: {objectId}} = useGlobalContext();
  // th1.next = th2;
  const [threads, setThreads] = useState<Props[]>([
    th1, th2
  ]);
  const [ currentThread, setCurrentThread ] = useState<Props>(threads[0]);
  const [ currentIndex, setCurrentindex ] = useState<number>(0);

  console.log("author", objectId);
  

  const createThread = async () => {
    try {
      const res = await axios.post('http://192.168.1.106:4000/thread', {
        "text": threads[0].content,
        "author": objectId,
        "communityId": ""
      });

      if(res.status === 201) {
        const { createdThread: { _id: threadId } } = res.data;

        console.log("thread Id is ", threadId);
        
        // setThreads((prev) => {
        //   prev.pop();
        //   return [...prev];
        // })
        threads.map(async (thread, index) => {
          if(index > 0) {
            console.log("comment number", index, "is ------ ", thread);
            if(thread.content === '') return;
            
            const res = await axios.post(`http://192.168.1.106:4000/thread/${threadId}`, {
              "commentText": thread.content,
              "userId": objectId          
            })

            
            
            if( res.status === 201) {
              console.log(res.data); 
              // navigation.navigate('Profile')
               
            }
          }
        })
        navigation.navigate('Profile')
      }
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <ScrollView style={{
      backgroundColor: "#000",
      flex: 1,
      width: '100%',
      // position: 'relative',
      // height: '100%'
    }}>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', columnGap: 10, marginBottom: 10 }}>
        {threads.map((thread, index) => (

          <ThreadForm 
            // main={thread.state} 
            setThreads={setThreads} 
            thread={thread} 
            setCurrentThread={setCurrentThread}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentindex} 
            currentThread={currentThread} 
            index={index}
            threads={threads}
            />
        ))}
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        // position: 'absolute',
        paddingHorizontal: 20,
        // bottom: -10
      }}
      >
        <Pressable>
          <Text style={{ color: 'gray' }}>Anyone can replay</Text>
        </Pressable>

        <TouchableOpacity
          onPress={createThread}
          disabled={threads[0].content === ''}
        >
          <Text style={{ color: threads[0].content? 'lightblue': 'gray' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default CreateThread


{/* <Image source={{ uri: image }}
          width={22}
          height={22}
          resizeMode='cover'
          style={{
            borderRadius: 50,
            position: 'absolute',
            bottom: 3,
            left: 20, 
            opacity: 0.4
          }}
        />
        <View style={{ width: '70%' }}>
          <TextInput
          returnKeyType='google'
            placeholder="Start a thread..."
            placeholderTextColor={'gray'}
            editable
            multiline
            // numberOfLines={10}
            style={{
              color: '#fff',
              // padding: 10,
              overflow: 'scroll',
              borderBlockColor: 'red',
              borderLeftWidth: 1,
              borderColor: 'gray',
              paddingHorizontal: 30
            }}
          /> */}
{/* </View> */ }




// Notes to be checked

// const ThreadForm = ({ 
//   // main, 
//   setThreads, 
//   thread , 
//   setCurrentThread, 
//   currentThread, 
//   index, 
//   currentIndex, 
//   setCurrentIndex , 
//   threads
// }: {
//   // main: boolean,
//   setThreads: any,
//   threads:Props[]
//   index: number,
//   thread: Props,
//   setCurrentThread: any, 
//   currentThread: any,
//   currentIndex: any,
//   setCurrentIndex: any
// }) => {

//   console.log(thread, index);
  
//   const { currentUser: { image, username } } = useGlobalContext();
//   const [isActive, setIsActive] = useState<Boolean>(thread.state);


  // useEffect(() => {
  //   setIsActive(prev => !prev)
  // }, [thread.state])

  // const [prev, setPrev] = useState(thread.prev);

  // useEffect(() => {
  //   if(prev.content === '') {
  //     setIsActive(false);
      
  //     if(thread.isCurrent === false) {
  //       // threads.pop();
  //       // console.log("hi");
        
  //     }
  //   } 
    // else {
    //   setThreads((prev) => 
    //     [...prev, {state: false, content: '', prev: thread, isCurrent: false }]);
    // }
  // }, [prev.content])

  // const handlePress = () => {
  //   if(index === 0 || threads[index - 1].content !== '') {
  //     setCurrentThread(thread);
  //     setThreads(prev => {
  //       prev.map((thread) => {
  //         thread.isCurrent = false; 
  //         // if(thread.isCurrent === true) {
  //         //   thread.isCurrent = false; 
  //         // }
  //       })
  
  //       prev.map((thread) => {
          
  //         if(thread === currentThread ) {
  //           // console.log("the newly current thraed is ", thread);
            
  //           thread.isCurrent = true; 
  //           thread.state = true;
  //           return;
  //         }
  //       })
  //       return [...prev]
  //     })
  //   }
    
  //   if (!isActive || index == threads.length - 1) {
  //     setIsActive(true)
  //     setThreads((prev) => 
  //       [...prev, {state: false, content: '', isCurrent: false }]);
  //   }
  // }

  // useEffect(() => {
  
  //   setThreads((prev) =>{
  //     // const index = prev.length;
  //     [...prev, { }]})
  // }, [content])
//   return (
//     <Pressable
//       style={{
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         rowGap: 30, width: 400,
//         paddingHorizontal: 30,
//         position: 'relative'
//       }}
//       // onPress={handlePress}
//     >
//       <Image 
//         source={{ uri: image }}
//         width={thread.state ? 45 : 20}
//         height={thread.state ? 45 : 20}
//         resizeMode='cover'
//         style={{
//           borderRadius: 50,
//           position: 'absolute',
//           top: thread.state ? 0 : 10,
//           left: thread.state ? 10 : 21,
//           opacity: !thread.state? 0.4: 1,
//           // paddingTop: !main && 5
//         }}
//       />
//       <Text style={{ color: '#fff', paddingHorizontal: 30, paddingTop: 5 }}>{thread.state ? username : ''}</Text>
//       <View style={{ width: '70%' }}>
//         <TextInput
//           onPressIn={handlePress}
//           returnKeyType='google'
//           placeholder={thread.state ? "Start a thread..." : 'Add to thread'}
//           placeholderTextColor={'gray'}
//           editable={ thread.state || threads[index - 1].content !== ''}
//           multiline
//           value={thread.content}
//           // onChangeText={(text) => setThreads((prev) => [...prev, {...thread[index], content: text }])}
//           onChangeText={(text) => {
//             // const thraed = threads.filter(thread => thread.isCurrent === true)

//             setThreads(prev => {
//               prev.map((thread, index) => {
//                 if(thread.isCurrent === true) {
//                   thread.content = text;

//                   if(text === '' && index > 0) {
//                     // thread.isCurrent = false;
//                     threads.splice(index, 1)
//                     // setIsActive(false)
                    
//                     // setCurrentThread(threads[0]);
//                     // for(let i = index; i < threads.length; i++) {
//                     //   // threads[i].state = ;
//                     //   threads[i].content = '';
//                     //   // threads[i].
//                     // }

//                     setThreads(threads);
//                   }
//                   return;  

                  
//                 }
                
//                 // console.log(index);
                
//                 // if(text == '' && index > 0 && thread.isCurrent) {
//                   // thread.content = '';
//                   // console.log("try to delete thread", thread);
                  
//                   // threads.splice(index, 1)
//                   // return;
//                 // }
//               })
//               return [...prev]
//             })
//             // setThreads((prev) => {
//             // prev.map((thread) => {
//             //   if (thread.isCurrent) {
//             //     thread.content = text;
//             //   }
//             // })
//           // })
//           // setCurrentThread({...currentThread, content: text })
//           // console.log("current thread", currentThread);
          
//             // setCurrentThread({index: {content: text}} )
//           }}
//           // numberOfLines={10}
//           style={{
//             color: '#fff',
//             // padding: 10,
//             overflow: 'scroll',
//             borderBlockColor: 'red',
//             borderLeftWidth: 1,
//             borderColor: 'gray',
//             paddingHorizontal: 30,
//             paddingBottom: 10
//             // opacity: !isActive && 0.4
//           }}
//         />
//       </View>

//     </Pressable>
//   )
// }