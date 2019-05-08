var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = require('../db/db');
var sql = require("mssql");
//const helmet = require('helmet')

//var __dirname = require("path").dirname(require.main.filename);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})

// config for your database
var config = {
    user: 'gabin',
    password: 'gabin',
    server: "PC-GABIN",
    database: 'cyber_edu'
};

// Sets "X-Content-Type-Options: nosniff".
//app.use(helmet())
var teams = new Array();
var password = "gabin";
sql.connect(config, function (err) {
    if (err) console.log(err);
    });

app.get('/api/themes', (req, res) => {
  let response = db.themes;
  res.send(response);
});
app.get('/api/subThemes', (req, res) => {
  let response = db.subThemes.filter(obj => {
    let res = true;
    for(key in req.query){
      res = res && req.query[key] === obj[key];
    }
    return res;
  });
  console.log(response);
  res.send(response.map(obj => ({key: obj.key,subtitle: obj.subtitle, point: obj.point})));
});
app.get('/api/exercise', (req, res) => {
  let param = Object.entries(req.query);
  let response = db.subThemes.find(obj => obj[param[0][0]]===param[0][1]);
  console.log(response);
  res.send(response);
});
app.get('/api/sql_injection', (req, res) => {
  var result={};
  // create Request object
  var request = new sql.Request();
  // query to the database and get the records
  var myRequest = 'select * from users where login=\''+req.query.login+'\' and password=\''+req.query.password+'\';';
  request.query(myRequest, function (err, recordset) {
    if (err){
      console.log(err);
      result.msg="Error in the database";
      result.validate="false";
    }else {
      if(recordset.rowsAffected>0){
        // send records as a response
        result.msg= "You successfully connected as "+recordset.recordset[0].login;
        result.password= "P45SW0RD";
        result.validate= true
      }else{
        result.validate=false;
        result.msg="Wrong login or password !";
      }
    }
    res.send(result);
  });


});



app.use(express.static(__dirname));

io.on('connection', function(socket){
  var team;
  socket.on("exercise", function(msg){
    var result={};
    if(team.exercise.indexOf(msg.exercise)!=-1){
      result.class=false;
      result.msg="Already done";
    }
    else if(msg.answer.toUpperCase().replace(/\W/g,"")===db.subThemes_correction.find(obj => obj.key === msg.exercise).answer){
      team.exercise.push(msg.exercise);
      result.class=false;
      result.msg="Good job, you earn "+db.subThemes.find(obj => obj.key === msg.exercise).point+" points.";
      team.point+=db.subThemes.find(obj => obj.key === msg.exercise).point;
      io.emit("scoreBoard",teams.sort(function(a, b){return b.point - a.point}));
      console.log(teams);
    }
    else{
      result.class=true;
      result.msg="Try again.";
    }
    socket.emit("exercise",result);
  });

  socket.on('choose name', (msg) => {
    teams.push({id:teams.length,name:msg.name,point:0,exercise:[]});
    team=teams.find(obj => {return obj.id === teams.length-1})
    io.emit("scoreBoard",teams.filter((obj) => {return {name: obj.name, id: obj.id, point: obj.point}}).sort(function(a, b){return b.point - a.point}));
    console.log(teams);
  });

  socket.on('chosenName', (msg) => {
    if(msg.password===password){
      team=teams.find(obj => {return obj.id === msg.id});
      socket.emit("chooseNameSuccess");
      io.emit("scoreBoard",teams.filter((obj) => {return {name: obj.name, id: obj.id, point: obj.point}}).sort(function(a, b){return b.point - a.point}));
      console.log(teams);
    }else{
      socket.emit('listName', {teams,rep: "Wrong password !"});
    }
  });

  socket.on('chooseExistingName', (msg) => {
    socket.emit('listName', {teams: teams.filter( (obj) => { return {name: obj.name,id:obj.id}}),rep: ""});
  });

  socket.on('disconnect', function(msg){
    console.log(msg);
  });

});

app.get('/time/start', (req, res) => {
  io.emit('timer', new Date("may 9, 2019 15:37:25").getTime());
  res.send("received");
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});


app.get('*', (req, res) => {
  console.log("404");
  res.send("404");
});
