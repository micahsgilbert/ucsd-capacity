const functions = require("firebase-functions");
const admin = require('firebase-admin')
const fetch = require('node-fetch')

admin.initializeApp()

exports.updateDatabase = functions.pubsub.schedule("* * * * *").onRun(context => {
  fetch("https://waitz.io/live/ucsd").then(res => res.json()).then(data => {
    data["data"].map(item => {
      databaseRef = admin.database().ref("/" + item.name)
      databaseRef.push().set({
        "busyness": item.busyness,
        "isOpen": item.isOpen,
        "time": Math.round(Date.now()/1000)
      })
    })
  }) 
  return null
})




