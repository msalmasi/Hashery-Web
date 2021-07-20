require('dotenv').config()

const express = require('express')
const https = require('https')
const fs = require('fs')
const app = express()
const port = 80
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db.sqlite')
const axios = require('axios')
const STREAMLABS_API_BASE = 'https://www.streamlabs.com/api/v1.0'

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))

https
  .createServer(
    {
      key: fs.readFileSync('/etc/letsencrypt/live/hashery.io/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/hashery.io/fullchain.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/hashery.io/fullchain.pem'),
    },
    app
  )
  .listen(443, () => {
    console.log('Listening...')
  })


app.get('/', (req, res) => {
    res.render("index");
})

app.listen(port, () => console.log(`Hashery-Web listening on port ${port}!`))