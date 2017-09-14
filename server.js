// we are able to require express because it's in our node_modules
var express = require('express')

var app = express()

// for every request that comes in, first check if there's a file in the public folder with the same name as the request URL.
app.use(express.static('./public'))

// STARTING LOCATION, START OF ROAD TRIP (Eric's Road Trip)
app.get('/', function(request, response){
    // response.send('<h1>Hello world</h1>')
    response.sendFile('./html/index.html', {root: './public'})
})

//BOSTON
app.get('/boston', function(req, res){
    // using res.sendFile is basically a simpler way to send files than using fs.readFile
    // var dataFromUser = '../notes.md' // a malicious user might try to abuse this kind of flexible file serving, but express won't allow it.
    var dataFromUser = './html/boston.html'
    res.sendFile(dataFromUser, {root: './public'})
    // res.send('<h1>This is a simple express app</h1>')
})
app.post('/boston', function(req, res){
    // this pattern is referred to as 'post->redirect->'
    // res.redirect tells the client to send another get request
    // res.redirect does NOT work for AJAX requests
    // to handle ajax requests, you'll pretty much always use `res.send()`
    res.redirect('/nyc')
})

//NYC
app.get('/nyc', function(req, res){
    var dataFromUser = './html/nyc.html'
    res.sendFile(dataFromUser, {root: './public'})
})
app.post('/nyc', function(req, res){
    res.redirect('/vermont')
})

//VERMONT
app.get('/vermont', function(req, res){
    var dataFromUser = './html/vermont.html'
    res.sendFile(dataFromUser, {root: './public'})
})
app.post('/vermont', function(req, res){
    res.redirect('/vermont')
})

app.get('/about/me', function(req,res){
    // express is smart enough to automatically convert this object into JSON
    res.send({message:"this app was built by raphael"})
})

// our static file server replaces these two routes
// app.get('/main.css', function(req, res){
//     res.sendFile('./main.css', {root: './public'})
// })
// app.get('/get-the-javascript-file', function(req, res){
//     res.sendFile('./main.js', {root: './public'})
// })

// sneak peek at middleware
app.use(function(req, res){
    res.send('four oh four')
})

app.listen(8000)
