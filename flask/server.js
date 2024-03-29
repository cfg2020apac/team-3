const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/clustering_results.html')
})

app.get('/interests', (req, res) => {
  res.sendFile(__dirname + '/interests.html')
})

app.get('/events', (req, res) => {
  res.sendFile(__dirname + '/events.html')
})

app.get('/interests/piechart', (req, res) => {
  res.sendFile(__dirname + '/users_interests.png')
})

app.get('/interests/above-21', (req, res) => {
  res.sendFile(__dirname + '/users_interests_a21.png')
})

app.get('/interests/below-15', (req, res) => {
  res.sendFile(__dirname + '/users_interests_b15.png')
})

app.get('/interests/15-to-21', (req, res) => {
  res.sendFile(__dirname + '/users_interests_tff.png')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})