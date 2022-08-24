import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyADQCkE7KFCo1n60slCf7Xd3wz-MCRZPqM",
    authDomain: "mh-msins-17ad3.firebaseapp.com",
    projectId: "mh-msins-17ad3",
    storageBucket: "mh-msins-17ad3.appspot.com",
    messagingSenderId: "323929860627",
    appId: "1:323929860627:web:8659ec0eef4c0e92b7ede6",
    measurementId: "G-RJ77STM5QG"
};

const app = initializeApp(firebaseConfig);
export const authorization = getAuth(app);
