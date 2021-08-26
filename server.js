let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let mongoose = require('mongoose')
//import Student Model from ./models
let Student = require('./models/user.js')
//initialize express app
let app = express()
//configure express app to parse json content and form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//configure express app to serve static files
app.use(express.static(path.join(__dirname, 'public')))
//connect to mongodb instance where database is mydb
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')
//save new student
app.post('/', (req, res, next) => {
 //create new student using schema
 let newStudent = new Student({
   name: req.body.name,
   marks: req.body.marks,
   teachers: req.body.teachers
 })
 //save new student to db
 newStudent.save((err, result) => {
   if (err) { console.log(err) }
   else { res.json(result) }
 })
})
app.get('/', (req, res, next) => {
  //use find() method to return all students
  Student.find((err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
  })
})
//listen on port 3000
app.listen(3000, () => {
 console.log('Server listening on port 3000')
})