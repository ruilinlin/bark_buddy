import { StyleSheet, Text, View } from 'react-native'
import { querySnapshot, collection, onSnapshot } from 'firebase/firestore';
import { database } from "../firebase_files/firebaseSetup";
import React, { useState, useEffect } from 'react';
import updatedata from "../firebase_files/firestoreHelper";


export default function DatabaseFetchList(CollectionName) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const collectionRef = collection(database, CollectionName);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedata = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setdata(updatedata);
      
    }, (error) => {
      console.error("Error fetching data", error);
    });
// Cleanup on unmount
    return () => unsubscribe(); 
  }, []);

  return data;
};