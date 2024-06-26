import GradientBackground from "../components/DarkBackGround";
import PostItem from "../components/PostItem";
import { PostComments } from "../components/PostComments";
import PressableButton from "../components/PressableButton";
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Button,
  SafeAreaView,
  Alert,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { colors } from "../helper/Color";
import { useNavigation } from "@react-navigation/core";
import { Animated } from "react-native";
import DynamicHeader from "../components/DynamicHeader";
import {
  readAllFromDB,
  searchUsersByUserId,
} from "../firebase-files/firestoreHelper";
import { useFocusEffect } from "@react-navigation/native";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { auth, database } from "../firebase-files/firebaseSetup";

export default function PostScreen({ navigation }) {
  // const navigation =useNavigation();
  const [ModalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showPostStack, setShowPostStack] = useState(false);
  const [postData, setPostData] = useState([]);
  const [userInformation, setUserInformation] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  // console.log("postId is pass ", currentPostId);

  useEffect(() => {
    // Set up a listener to get realtime data from Firestore
    const unsubscribe = onSnapshot(
      query(collection(database, "Posts"), orderBy("createdAt", "desc")),
      (querySnapshot) => {
        try {
          if (querySnapshot.empty) {
            Alert.alert("You need to add a Post");
            return;
          }
          const fetchedPosts = [];
          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const PostData = {
              ...data,
              id: doc.id,
            };
            fetchedPosts.push(PostData);
            // console.log(PostData);
          }
          setPostData(fetchedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      },
      (error) => {
        Alert.alert("Error", error.message);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run effect only once when component mounts

  useEffect(() => {
    // Set up a listener to get realtime data from Firestore
    const unsubscribe = onSnapshot(
      query(collection(database, "users")),
      async (querySnapshot) => {
        try {
          if (querySnapshot.empty) {
            Alert.alert("There is no user inside users collection");
            return;
          }
          const fetcheduserInformation = [];

          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            // console.log("????????????");
            // console.log(data);
            const UserData = {
              ...data,
              id: doc.id,
            };
            if (!UserData.avatar) {
              fetcheduserInformation.push({
                name: UserData.name,
                avatar: null,
                id: UserData.userId,
              });
            }

            if (UserData.avatar && UserData.name) {
              // console.log("-----------------");
              // console.log(UserData);
              fetcheduserInformation.push({
                name: UserData.name,
                avatar: UserData.avatar,
                id: UserData.userId,
              });
            }
            // console.log("!!!!!!");
            // console.log(fetcheduserInformation);
            // console.log("The fetched userinformation is",fetcheduserInformation);
          }
          setUserInformation(fetcheduserInformation);
          // console.log("setuserinformation is ", userInformation);
        } catch (error) {
          console.error("Error fetching userInformation:", error);
        }
      },
      (error) => {
        Alert.alert("Error", error.message);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run effect only once when component mounts

  const showAddButton = true;

  // const stories = [
  //   {
  //     id: "1",
  //     username: "iiamcharlie",
  //     avatar: require("../assets/favicon.png"),
  //   },
  //   {
  //     id: "2",
  //     username: "iiamcharles",
  //     avatar: require("../assets/favicon.png"),
  //   },
  // ];

  function handleCommentClick(postId) {
    setModalVisible(true);
    setCurrentPostId(postId);
    // console.log(setModalVisible);
  }

  function handleShowPostStack() {
    setShowPostStack(true);
    navigation.navigate("PostNavigator");
  }

  return (
    <GradientBackground colors={colors}>
      <View style={styles.container}>
        <DynamicHeader
          title="BarkBuddy"
          scrollY={scrollY}
          showAddButton={showAddButton}
          onPress={() => {
            handleShowPostStack();
          }}
        />

        <ScrollView horizontal style={styles.storiesContainer}>
          {userInformation &&
            userInformation.map((user) => {
              console.log("it is userInformation.avatar", user.avatar);
              return (
                <View key={user.id} style={styles.story}>
                  <Image
                    source={
                      user.avatar
                        ? { uri: user.avatar }
                        : require("../assets/dog-lover.png")
                    }
                    style={styles.storyAvatar}
                  />
                  {/* You can uncomment the next line if you need to display the username */}
                  {/* <Text style={styles.storyUsername}>{user.name}</Text> */}
                </View>
              );
            })}
        </ScrollView>

        <FlatList
          style={styles.listContainer}
          data={postData}
          renderItem={({ item }) => {
            // Find the corresponding user information based on item's name
            const userInfo = userInformation
              ? userInformation.find((info) => info.id === item.userId)
              : null;
            // console.log("it is item", item);
            // console.log("it is userInformation", userInformation);
            // console.log("it is userInfo", userInfo);
            // If userInfo exists, use its avatar and name, otherwise use defaults
            const avatar = userInfo ? userInfo.avatar : null;
            const name = userInfo ? userInfo.name : "anonymous visitor";

            // const avatar = require("../assets/dog-lover.png");
            // const name =  "anonymous visitor";
            // console.log("item.id is fetched", item.id);
            return (
              <PostItem
                postId={item.id}
                avatar={avatar}
                postItemname={name}
                images={item.images}
                describe={item.description}
                likenumbers={item.likeNumbers}
                commentsnumbers={item.commentNumbers}
                onCommentClick={() => handleCommentClick(item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />

        {ModalVisible && (
          <PostComments
            postId={currentPostId}
            setModalVisible={setModalVisible}
          />
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   background:background,
    justifyContent: "center",
  },
  storiesContainer: {
    marginTop: 35,
    marginBottom: 15,
  },
  listContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  story: {
    alignItems: "center",
    margin: 8,
    marginBottom: 20,
  },
  storyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.backgroundlight,
  },
  storyUsername: {
    color: colors.fontcolor,
  },
  postCard: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // white with 30% opacity
    borderRadius: 8,
    padding: 10,
  },
});
