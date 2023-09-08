et express = require('express');
let app = express();
let bodyParser = require('body-parser');
//1 challenge #1 
//console.log("Hello World")

//2 challenge #2
// app.get("/",(req, res) => {
//    res.send("Hello Express")
// })

//body Parser
app.use(bodyParser.urlencoded({extended: false}))

app.use("/public",express.static(__dirname + '/public'))

app.use((req,res,next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next()
})

// home route 
app.get("/",(req, res) => {
  res.sendFile( __dirname + '/views/index.html')
 })
 const mySecret = process.env['MESSAGE_STYLE']
  console.log(mySecret);
app.get('/json',(req,res)=>{
 
  if(mySecret == "uppercase"){
      res.json({"message": "HELLO JSON"})
  }else{ 
      console.log(process.env['MESSAGE_STYLE'])
      res.json({"message": "Hello json"})    
  }
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.get("/:word/echo",(req,res)=>{
  res.json({echo:req.params.word})
})

app.get("/name",(req,res) => {
  res.json({name:req.query.first + " " + req.query.last})
})

app.post("/name",(req,res) => {
  res.json({name:req.body.first + " " + req.body.last})
})
