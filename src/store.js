import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Configurar firestore
const firebaseCponfig = {
    apiKey: "AIzaSyCB7gQM_cFK06XNBITHG0Sglx0HReKkbUA",
    authDomain: "bibliostore-6975d.firebaseapp.com",
    databaseURL: "https://bibliostore-6975d.firebaseio.com",
    projectId: "bibliostore-6975d",
    storageBucket: "bibliostore-6975d.appspot.com",
    messagingSenderId: "200684802781",
    appId: "1:200684802781:web:8865d88be4d8ed66"
}

//inicializar firebase 
firebase.initializeApp(firebaseCponfig)

//Configuaracion react-redux
const rrfConfig = {
    userProfile : 'user',
    useFirestoreForProfile: true
}

// crea el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

//State inicial
const initialState = {}

// create store

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store