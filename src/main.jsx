import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"

import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyCmZuLc6nIOTEfu2oMQVysIY3pryIUPbhI",
  authDomain: "ucsd-capacity-chart.firebaseapp.com",
  databaseURL: "https://ucsd-capacity-chart-default-rtdb.firebaseio.com",
  projectId: "ucsd-capacity-chart",
  storageBucket: "ucsd-capacity-chart.appspot.com",
  messagingSenderId: "618156047733",
  appId: "1:618156047733:web:0a890ae1fa31abd202a73c",
  measurementId: "G-0V5T1GBY6J"
};
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App db={database}/>
  </React.StrictMode>
)
