import {
  Modal,
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
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { colors } from "../helper/Color";
import Input from "./Input";
import { AntDesign } from "@expo/vector-icons";
import {
  searchUsersByUserId,
  writeToSubcollection,
  readAllFromSubCol,
  updateToSubCol,
  addNewAttribute,
} from "../firebase-files/firestoreHelper";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
import { doc, updateDoc, onSnapshot, increment } from "firebase/firestore";
import { auth, database } from "../firebase-files/firebaseSetup";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export const PostComments = ({ setModalVisible, postId }) => {
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = screenHeight * 0.75;
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState("");
  const [userInformation, setUserInformation] = useState(null);
  const [isCommentAdded, setIsCommentAdded] = useState(false);
  // const [commentNumbers,setConmmentNumbers] = useState( commentsnumbers);

  // console.log(" userInformation is",userInformation);
  useEffect(() => {
    fetchUserData();
    if (postId) {
      fetchCommentData();
    }
  }, [postId, isCommentAdded]);

  async function fetchUserData() {
    let fetcheduserInformation = [];

    try {
      const userData = await searchUsersByUserId(auth.currentUser.uid);
      if (userData) {
        // console.log("-----------------");
        // console.log(userData);

        // Push user data even if avatar is null, ensure 'avatar' key is always present
        fetcheduserInformation.push({
          name: userData.name,
          avatar: userData.avatar || null, // Use null as default if no avatar
          id: userData.userId,
        });

        // console.log("!!!!!!");
        // console.log(fetcheduserInformation);
      }
      setUserInformation(fetcheduserInformation);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert(
        "Error",
        "Please edit your profile via the button located in the top-right corner!"
      );
    }
  }

  // async function fetchCommentData() {
  //   try {
  //     // if (postId && Posts.commentNumbers > 0)
  //     if (postId)
  //      {
  //       // null check for user and user.id
  //       const CommentData = await readAllFromSubCol(
  //         "Posts",
  //         postId,
  //         "CommentList"
  //       );
  //       if (CommentData) {
  //         setCommentList(CommentData);
  //         console.log("--------------------------------")
  //         console.log("It is CommentList", CommentData);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Comment data:", error);
  //   }
  // }

  async function fetchCommentData() {
    try {
      const CommentData = await readAllFromSubCol(
        "Posts",
        postId,
        "CommentList"
      );
      if (CommentData) {
        setCommentList(CommentData);
        // console.log("Fetched Comment List:", CommentData);
      }
    } catch (error) {
      console.error("Error fetching Comment data:", error);
    }
  }

  const handleCommentSubmit = () => {
    if (!commentContent.trim()) {
      setError("Please Enter A Comment to submit.");
      Alert.alert("Please enter a comment before submitting.");
      return;
    }

    const newcomment = {
      name:
        userInformation && userInformation[0].name
          ? userInformation[0].name
          : "anonymous visitor",
      avatar:
        userInformation && userInformation[0].avatar
          ? userInformation[0].avatar
          : null,
      content: commentContent,
      createdAt: new Date(),
    };
    // console.log("????????");
    // console.log("newcomment is", newcomment);

    const postRef = doc(database, "Posts", postId);
    writeToSubcollection(newcomment, "Posts", postId, "CommentList");
    updateDoc(postRef, {
      commentNumbers: increment(1), // Increment the comment count by 1
    });
    fetchCommentData();
    // onsubmit(comment);
    setCommentContent("");
    setError("");
    setIsCommentAdded(!isCommentAdded);
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={[styles.modalView, { height: modalHeight }]}>
            <View style={styles.headerContainer}>
              {/* <FontAwesome5 name="step-backward" size={18} color="black" onPress={() => setModalVisible(false)} style={styles.backButton}/> */}
              <Text style={styles.headerText}>Comments</Text>
            </View>
            {/* Modal content */}
            <FlatList
              style={styles.commentsContainer}
              data={commentList}
              renderItem={({ item }) => (
                <View style={styles.userinformation}>
                  <Image
                    source={
                      item.avatar
                        ? { uri: item.avatar }
                        : require("../assets/dog-lover.png")
                    }
                    style={styles.avatorContainer}
                    resizeMode="cover"
                  />
                  {/* <Image source={item.avatar} style={styles.avatorContainer} resizeMode="cover" /> */}
                  <View style={styles.commentsmodal}>
                    <Text style={styles.Username}>{item.name}</Text>
                    <Text>{item.content}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
              // ListFooterComponent={
              //   <TouchableOpacity style={styles.bottomContainer} onPress={() => setModalVisible(false)}>
              //     <Text>Close</Text>
              //   </TouchableOpacity>
              // }
            />
            <View style={styles.bottomContainer}>
              {/* <Image source={comments.avatar} style={styles.avatorContainerSingle} resizeMode="cover" /> */}
              <Input
                Customstyle={styles.inputBox}
                value={commentContent}
                onChangeText={setCommentContent}
                error={error}
              />

              {/* <AntDesign name="up" size={22} color="black" onPress={() => setModalVisible(false)} style={styles.backButton}/> */}
              <FontAwesome
                name="check-circle"
                size={24}
                color="black"
                onPress={handleCommentSubmit}
                style={styles.backButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.commentsmodal,
  },

  modalView: {
    // justifyContent: 'flex-end',
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 210,
    alignItems: "center",
    // overflow: 'hidden',
  },
  headerText: {
    flex: 1,
    // marginLeft:40,
    fontWeight: "bold",
    textAlign: "center", // Center the text
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    // padding: 10,
    marginLeft: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    color: colors.commentsfontcolor,
    // fontSize: 20,
    backgroundColor: "#fff",
  },
  bottomContainer: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    color: colors.commentsfontcolor,
    fontSize: 20,
  },

  text: {
    color: colors.fontcolor,
  },
  avatorContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.backgroundlight,
  },
  Username: {
    fontSize: 13,
    color: colors.commentsfontcolor,
    paddingLeft: 5,
    // marginBottom:20,
  },
  commentsContainer: {
    // flex: 1,
    paddingLeft: 5,
  },
  commentsmodal: {
    flexDirection: "coloumn",
    justifyContent: "flex-start",
    marginLeft: 10,
    width: "88%",
  },
  userinformation: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 40,
    paddingLeft: 5,
  },
  inputBox: {
    width: "70%",
    marginBottom: 20,
  },
  backButton: {
    marginLeft: 20,
  },
  avatorContainerSingle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.backgroundlight,
    margin: 20,
  },
});
