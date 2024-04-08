import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, CollectionName) {
  try {
    const docRef = await addDoc(collection(database, CollectionName), data);
    console.log("New doc added with ID: ", docRef.id);
    return docRef.id;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id, CollectionName) {
  try {
    await deleteDoc(doc(database, CollectionName, id));
    console.log("Activity deleted with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}

export async function readFromDB(id, CollectionName) {
  try {
    const docRef = doc(database, CollectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

export async function searchUsersByUserId(currentUser) {
  try {
    const usersRef = collection(database, "users");
    const q = query(usersRef, where("userId", "==", currentUser));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      // No matching user found
      return null;
    }
    // Get the first one, also should be the only one
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}

export async function updateToDB(id, updatedData, CollectionName) {
  try {
    const docRef = doc(database, CollectionName, id);
    await updateDoc(docRef, updatedData);
  } catch (err) {
    console.log(err);
  }
}

export async function readAllFromDB(CollectionName) {
  try {
    const docRef = doc(database, CollectionName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No documents!");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
