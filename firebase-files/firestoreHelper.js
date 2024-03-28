import { collection, addDoc, doc, deleteDoc, getDoc, updateDoc} from "firebase/firestore";
import { database } from "./firebaseSetup";


export async function addActivity(data,CollectionName) {
  try {
    const docRef = await addDoc(collection(database, CollectionName), data);
    console.log("New activity added with ID: ", docRef.id);
    return docRef.id;
  } catch (err) {
    console.log(err);
  }
}


export async function deleteActivity(id,CollectionName) {
  try {
    await deleteDoc(doc(database, CollectionName, id));
    console.log("Activity deleted with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}


export async function fetchActivitybyID(id,CollectionName) {
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
    console.error("Error fetching activity data: ", error);
  }
}


export async function updatedata(id,updatedData,CollectionName){
  try {
    const docRef = doc(database, CollectionName ,id);
    await updateDoc(docRef, updatedData);
  } catch (err) {
    console.log(err);
  }
}


export async function fetchDataList(CollectionName){
  try {
    const docRef = doc(database, CollectionName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching activity data: ", error);
  }
}