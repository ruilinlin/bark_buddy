import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
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

export async function writeToSubcollection(
  data,
  parentCollection,
  parentId,
  subcollection,
  subDocId = null
) {
  try {
    const parentDocRef = doc(database, parentCollection, parentId);

    if (!subDocId) {
      // didn't provide subDocId, which means subcollection doesn't exist, create it
      await addDoc(collection(parentDocRef, subcollection), data);
    } else {
      await setDoc(
        doc(collection(parentDocRef, subcollection), subDocId),
        data
      );
    }
    console.log("Document successfully written to subcollection!");
  } catch (error) {
    console.error("Error writing document to subcollection: ", error);
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

export async function readAllFromSubCol(
  parentCollection,
  parentId,
  subCollection
) {
  try {
    const parentDocRef = doc(database, parentCollection, parentId);
    const subCollectionRef = collection(parentDocRef, subCollection);
    const querySnapshot = await getDocs(subCollectionRef);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error fetching data from subcollection: ", error);
    throw error;
  }
}
