var express = require('express')
var app = express()
var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://localhost:27017/test'));
app.set('view engine', 'ejs')
var index = require('./routes/index')
var users = require('./routes/users')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/** This module let us use HTTP verbs such as PUT or DELETE  in places where they are not supported*/ 
var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


app.use('/', index)
app.use('/users', users)

app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})
