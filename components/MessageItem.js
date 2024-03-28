import { Modal,StyleSheet,Image, Text, View, FlatList,Button,SafeAreaView,Alert, Pressable, ScrollView,TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'
import { colors } from '../helper/Color';
import PressableButton from '../components/PressableButton';

export default function MessageItem({message,handleAccept,handleReject}) {
  return (
    <View>
        <FlatList style={styles.messageContainer}
            data={message}
            renderItem={({ item }) => (
              <View style={styles.userinformation}>
                <Image source={item.avatar} style={styles.avatorContainer} resizeMode="cover" />
              <View style={styles.messagemodal}>                               
                <Text style={styles.Username}>{item.name}</Text>
                <Text>{item.message}</Text>
                <View style={styles.buttonContainer}>
                  <PressableButton backgroundColor={colors.lightbackgroundlight} onPress={handleAccept} children={"Accept"}/> 
                  <PressableButton backgroundColor={colors.lightbackgroundlight} onPress={handleReject} children={"Reject"}/>   
                </View>  
                </View>
               
              </View>
            )}
            keyExtractor={item => item.id}              
            // ListFooterComponent={
            //   <TouchableOpacity style={styles.bottomContainer} onPress={() => setModalVisible(false)}>
            //     <Text>Close</Text>
            //   </TouchableOpacity>
            // }
          />
    </View>
  )
}

const styles = StyleSheet.create({ 
  messageContainer:{
    paddingLeft: 10, 
    width:"90",
  },
  userinformation:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop:40,
    paddingLeft:5,
  },
  avatorContainer:{
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor:colors.backgroundlight,
  },
  Username:{
    fontSize:13,
    color:colors.messagefontcolor,
    paddingLeft: 5, 
    // marginBottom:20,
  },
  messagemodal:{
    flexDirection: 'coloumn',
    justifyContent: 'flex-start',
    marginLeft:10,
    width: "88%",
  },
  buttonContainer:{
    flexDirection: 'row',
  },
})