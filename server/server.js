var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = require('../db/db');
var sql = require("mssql");
var jsdom = require("jsdom");
var serveStatic = require("serve-static");
var { JSDOM } = jsdom;
var path = require("path");
//var serveStatic = require('serve-static');
//const helmet = require('helmet')

//var __dirname = require("path").dirname(require.main.filename);
app.use(express.static(path.join(__dirname, '../dist')));
app.use(serveStatic("../dist"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})


// config for your database
var configDB = {
    user: 'gabin',
    password: 'gabin',
    server: "PC-GABIN",
    database: 'cyber_edu'
};

var endTimer = null,
    interval,
    paused,
    isPaused = false,
    isStop = false,
    teams = new Array(),
    password = "gabin";

var timer = function (){
  if(new Date().getTime() >= endTimer.getTime()){
    clearInterval(interval);
    endTimer = null;
    paused = null;
    isPaused = false;
    isStop = true;
    io.emit("stop");
  }
}

sql.connect(configDB, function (err) {
  if (err) console.log(err);
});
app.use(express.static(__dirname));
app.use(serveStatic(__dirname + "../dist"));

/*
app.get('/', (req, res) => {
  res.sen('coucou');
  res.sendFile('index.html');
})
*/
app.get('/api/themes', (req, res) => {
  let response = db.themes;
  res.send(response);
});

app.get('/api/selectedTheme', (req, res) => {
  let param = Object.entries(req.query);
  let response = db.themes.find(obj => obj[param[0][0]]===param[0][1]);
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
  res.send(response.map(obj => ({key: obj.key,subtitle: obj.subtitle, point: obj.point})));
});
app.get('/api/exercise', (req, res) => {
  let param = Object.entries(req.query);
  let response = db.subThemes.find(obj => obj[param[0][0]]===param[0][1]);
  res.send(response);
});

app.get('/api/sql_injection', (req, res) => {
  var result={};
  // create Request object
  var request = new sql.Request();
  // query to the database and get the records
  var myRequest = 'select * from users where login=\''+req.query.login+'\' and password=\''+req.query.password+'\';';
  request.query(myRequest)
  .catch((err) => {
    // result.msg="Error in the database";
    result.msg = "Error in the database<br/>" + err;
    result.validate = false;
    res.send(result);
  })
  .then((recordset) => {
    if(recordset.rowsAffected>0){
      // send records as a response
      result.msg= "You successfully connected as "+recordset.recordset[0].login;
      result.password= "P45SW0RD";
      result.validate= true
    }else{
      result.validate=false;
      result.msg="Wrong login or password !";
    }
    res.send(result);
  })
})

io.on('connection', function(socket){
  var team = null;

  socket.on("exercise", function(msg){
    var result={};
    if(team == null)
    {
      socket.emit('wrongId');
    }
    else if(team.exercise.indexOf(msg.exercise)!=-1){
      result.variant='warning';
      result.validate=false;
      result.msg="Already done";
    }
    else if(msg.answer.toUpperCase().replace(/\W/g,"")===db.subThemes_correction.find(obj => obj.key === msg.exercise).answer){
      team.exercise.push(msg.exercise);
      result.variant='success';
      result.validate=true;
      result.msg="Good job, you earn "+db.subThemes.find(obj => obj.key === msg.exercise).point+" points.";
      team.point+=db.subThemes.find(obj => obj.key === msg.exercise).point;
      let i=1;
      io.emit("scoreBoard",teams.map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}).sort(function(a, b){return b.point - a.point}));
    }
    else{
      result.variant='danger';
      result.validate=false;
      result.msg="Try again.";
    }
    socket.emit("exercise",result);
  });

  socket.on('choose name', (msg) => {
    var id=randomId();
    teams.push({id,name:msg.name,point:0,exercise:[]});
    team=teams.find(obj => {return obj.id === id});
    connection(socket, team);
    });

  socket.on('chosenName', (msg) => {
    if(msg.password===password){
      team=teams.find(obj => {return obj.id === msg.id});
      if(team!=null)
        connection(socket, team);
      else
        socket.emit('listName', {teams,rep: "This team don't exist"});
    }else{
      socket.emit('listName', {teams,rep: "Wrong password !"});
    }
  });

  socket.on('chooseExistingName', (msg) => {
    socket.emit('listName', {teams: teams,rep: ""});
  });

  socket.on('scoreBoard', (msg) => {
    let i = 1;
    socket.emit("scoreBoard",teams.map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}).sort(function(a, b){return b.point - a.point}));
  });

  socket.on('testId', (msg) => {
    if(typeof teams.find((obj) => { return obj.id == msg}) === 'undefined')
    {
      socket.emit('wrongId');
    }else{
      team = teams.find(obj => {return obj.id === msg});
      socket.emit('goodId', team.exercise);
    }
  });

  socket.on('deletTeam', (id) => {
    teams.splice(teams.findIndex( obj => obj.id = id ), 1)
    let i = 1;
    socket.emit("scoreBoard",teams.map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}).sort(function(a, b){return b.point - a.point}));
  });

  socket.on('message', (msg) => {
    if(team == null)
    {
      socket.emit('wrongId');
    }else{
      var result = '<strong>'+team.name+' :</strong> '+msg.msg;
      const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <head>
            <script>
              document.cookie='you can validate with password=`+db.subThemes_correction.find(obj => obj.key === 'xss_exercise').answer+`';
              var send = function (event){
                  var div = document.createElement('div');
                  div.innerHTML = '<strong>admin :</strong> '+document.getElementById('content').value;
                  document.getElementById('messages').appendChild(div);
                  event.preventDefault();
              }
            </script>
          </head>
          <body>
            <form id='form'>
              <textarea id='content' value='c moa'></textarea>
              <button id='button'>send</button>
            </form>
            <div id="messages"></div>
            <script>
              document.getElementById('button').addEventListener("click", send, false);
            </script>
            <div>`+result+`<div>
          </body>
        </html>`, {
        //cookieJar,
        resources: "usable",
        runScripts: "dangerously"
      });
      socket.emit('newMessage', result);

      var admin = dom.window.document.getElementById('messages').innerHTML;
      if(admin)
        socket.emit('newMessage', admin);
    }
  });
  socket.on('getTimer', (msg) => {
    if (endTimer !== null) {
      socket.emit('start', endTimer.getTime());
      if (isPaused){
        socket.emit('pause', paused.getTime());
      }
    } else if (isStop) {
      socket.emit('stop');
    } else {
      socket.emit('notStart')
    }
  });

  socket.on('connectAdmin', (msg) => {
    var rep={}
    if (msg.password === password) {
      rep.connected = true;
      rep.repServ = {msg: 'Connected with success', variant: 'success'};
    } else {
      rep.repServ = {msg: 'Wrong password', variant: 'danger'};
    }
    socket.emit('connectAdmin',rep);
  });
  socket.on('restart', (msg) => {
    if (msg.password === password) {
      teams = new Array();
      clearInterval(interval);
      endTimer = null;
      paused = null;
      isPaused = false;
      isStop = false;
      io.emit("restart");
      rep = {msg: "Restart", variant: "success"};
    } else {
      rep = {msg: "Wrong password", variant:"danger"};
    }
    socket.emit('timerSetting', rep);
  });
  socket.on('start', (msg) => {
    var rep={}
    if (msg.password === password) {
      if(endTimer === null){
        isStop = false;
        isPaused = false;
        paused = null;
        setEndDate(msg.duration);
        io.emit('start', endTimer.getTime());
        interval = setInterval(timer, 1000);
        rep = {msg: "Started", variant: "success"};
      }else{
        rep = {msg: "Already started", variant: "warning"};
      }
    } else {
      rep = {msg: "Wrong password", variant: "danger"};
    }
    socket.emit('timerSetting', rep);
  });

  socket.on('stop', (msg) => {
    var rep={}
    if (msg.password === password) {
      if(endTimer !== null){
        clearInterval(interval);
        isStop = true;
        endTimer = null;
        io.emit("stop");
        rep = {msg: "Stoped", variant: "success"};
      }else{
        rep = {msg: "Not started", variant: "warning"};
      }
    } else {
      rep = {msg: "Wrong password", variant: "danger"};
    }
    socket.emit('timerSetting', rep);
  });

  socket.on('pause', (msg) => {
    var rep={}
    if (msg.password === password) {
      if(endTimer !== null){
        if(!isPaused) {
          isPaused = true;
          paused = new Date();
          clearInterval(interval);
          io.emit("pause", paused.getTime());
          rep = {msg: "Paused", variant: "success"};
        }else{
          rep = {msg: "Already paused", variant: "warning"};
        }
      } else {
        rep = {msg: "Not started", variant: "warning"};
      }
    } else {
      rep = {msg: "Wrong password", variant: "danger"};
    }
    socket.emit('timerSetting', rep);
  });

  socket.on('play', (msg) => {
    var rep={}
    if (msg.password === password) {
      if(endTimer !== null){
        if(isPaused){
          isPaused = false;
          endTimer.setTime(endTimer.getTime()+new Date().getTime()-paused.getTime());
          paused = null;
          interval = setInterval(timer, 1000);
          io.emit("play", endTimer.getTime());
          rep = {msg: "Play", variant: "success"};
        }else{
          rep = {msg: "Not paused", variant: "warning"};
        }
      }else{
        rep = {msg: "Not started", variant: "warning"};
      }
    } else {
      rep = {msg: "Wrong password", variant: "danger"};
    }
    socket.emit('timerSetting', rep);
  });

  socket.on('change', (msg) => {
    var rep={}
    if (msg.password === password) {
      if(endTimer !== null){
        setEndDate(msg.duration);
        if(new Date().getTime() >= endTimer.getTime()){
          clearInterval(interval);
          endTimer = null;
          isStop = true;
          io.emit("stop");
          rep = {msg: "Stop", variant: "success"};
        } else {
          io.emit('change', endTimer.getTime());
          rep = {msg: "Changed", variant: "success"};
        }
      } else {
        rep = {msg: "Not started", variant: "warning"};
      }
    } else {
      rep = {msg: "Wrong password", variant: "danger"};
    }
    socket.emit('timerSetting', rep);
  });

  socket.on('disconnect', function(msg){
  });

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});


app.get('*', (req, res) => {
  console.log("404");
  res.send("404");
});

function setEndDate(obj){
  var myNow =  new Date();
  endTimer = myNow;
  if(typeof obj.hours !== 'undefined') endTimer.setHours(myNow.getHours()+parseInt(obj.hours));
  if(typeof obj.minutes !== 'undefined') endTimer.setMinutes(myNow.getMinutes()+parseInt(obj.minutes));
}
function connection(socket, team) {
  let i = 1;
  io.emit("scoreBoard",teams.map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}).sort(function(a, b){return b.point - a.point}));
  socket.emit("chooseNameSuccess", team);
  /*
  if(isPaused) {
    socket.emit('pause',endTimer.getTime());
  } else if (endTimer !== null) {
    socket.emit('start',endTimer.getTime());
  }
  */
}
function randomId() {
    var liste = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var result = '';
    for (i = 0; i < 8; i++) {
        result += liste[Math.floor(Math.random() * liste.length)];
    }
    if(typeof teams.find((obj) => { return obj.id == result}) !== 'undefined')
    {
      result = randomId();
    }

    return result;
}
