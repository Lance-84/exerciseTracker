const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const {user} = require("./model/user.js");
const {log} = require("./model/log.js");

mongoose.connect(process.env.MONGO_URI)
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", async (req, res) => {
  const id = await user.create({
    username: req.body.username
  });
  res.json({username: req.body.username, id: id._id});
})

app.post("/api/users/:id/exercises", async (req, res) => {
  const logsave = await log.create({
    userId: new mongoose.Types.ObjectId(req.body[":_id"]),
    description: req.body.description,
    duration: req.body.duration
  });
  res.json({id: logsave.userId, description: req.body.description, duration: req.body.duration, date: logsave.date})
})

app.get("/api/users/:id/logs", async (req, res) => {
  const ans = await log.find({userId: req.params.id},"userId description duration date -_id").exec();
  res.json(ans);
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
