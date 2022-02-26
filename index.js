// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc,doc,deleteDoc
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDqO17KAgITRZzCUz9GgjjydJFmVHKiqt4",
    authDomain: "harshit-firebase.firebaseapp.com",
    projectId: "harshit-firebase",
    storageBucket: "harshit-firebase.appspot.com",
    messagingSenderId: "335046951597",
    appId: "1:335046951597:web:5bf7105f0a07a6a760bc24",
    measurementId: "G-C677CT230P"
  };
  // init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
  onSnapshot(colRef,(snapshot)=>{
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})
