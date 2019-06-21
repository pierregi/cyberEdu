var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require("path");
var io = require('socket.io')(http);
var exercisesFile = require('./exercisesFile');

var jsdom = require("jsdom");
var { JSDOM } = jsdom;

const JlSqlApi = require('jl-sql-api');
const api = new JlSqlApi;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.use(express.static(path.join(__dirname, './dist')));

app.get('/api/themes', (req, res) => {
  let response = exercisesFile.themes;
  res.send(response);
});

app.get('/api/selectedTheme', (req, res) => {
  let param = Object.entries(req.query);
  let response = exercisesFile.themes.find(obj => obj[param[0][0]]===param[0][1]);
  res.send(response);
});

app.get('/api/subThemes', (req, res) => {
  let response = exercisesFile.subThemes.filter(obj => {
    let res = true;
    for(key in req.query){
      res = res && req.query[key] === obj[key];
    }
    return res;
  });
  res.send(response.map(obj => ({key: obj.key, title: obj.title, point: obj.point})));
});
app.get('/api/exercise', (req, res) => {
  let param = Object.entries(req.query);
  let response = exercisesFile.subThemes.find(obj => obj[param[0][0]]===param[0][1]);
  res.send(response);
});

app.get('/api/sql_injection', (req, res) => {
  var result={};
  try {
    var myQuery = "SELECT * WHERE login ='"+req.query.login+"' and password = '"+req.query.password+"'";

    myQuery = myQuery.split(';--')[0]
console.log(myQuery);
    api.query(myQuery)
    .fromArrayOfObjects([
      {"login": 'user1', "password": 'GjdyOnvpa'},
      {"login": 'user2', "password": 'qvua884wx'},
      {"login": 'user3', "password": 'svhCsqdi9'},
      {"login": 'admin', "password": '87Dqd7qd6'},
    ])
    .toArrayOfObjects((recordset) => {
      if(Object.keys(recordset).length>0){
        // send records as a response
        result.msg= "You successfully connected as "+recordset[0].login;
        result.password= "P45SW0RD";
        result.validate= true
        res.send(result);
      }else{
        result.validate=false;
        result.msg="Wrong login or password !";
        res.send(result);
      }
    })

  }
  catch(error) {
    result.validate=false;
    result.msg="Error on the database";
    res.send(result);
  }


})

app.use(function(req, res, next) {
    res.status(404).send("Sorry, this page does not exist.");
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});


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

io.on('connection', function(socket){
  var team = null;

  socket.on("exercise", function(msg){
    var result = {};
    if(team == null)
    {
      socket.emit('wrongId');
    }
    else if (endTimer === null) {
      result.variant='warning';
      result.validate=false;
      result.msg="The game is not started";
    }
    else if (isPaused) {
      result.variant='warning';
      result.validate=false;
      result.msg="The game is paused";
    }
    else if (isStop) {
      result.variant='warning';
      result.validate=false;
      result.msg="The game is finished";
    }
    else if(team.exercise.indexOf(msg.exercise)!=-1){
      result.variant='warning';
      result.validate=false;
      result.msg="You have already done this exercise and you can't earn points twice with it.";
    }
    else if (exercisesFile.subThemes_correction.find(obj => obj.key === msg.exercise).recursiveCorrection) {
      let answer = msg.answer.toUpperCase().replace(/\W/g,"")
      let correction = exercisesFile.subThemes_correction.find(obj => obj.key === msg.exercise).answer;
      let errorCount = answer.length > correction.length ? answer.length - correction.length : correction.length - answer.length
      for(let i = 0; i < Math.min(answer.length, correction.length); i++) {
        errorCount = answer[i] !== correction[i] ? errorCount + 1 : errorCount
      }
      if (errorCount === 0) {
        result.validate = true
      } else {
        result.validate = false
        result.msg=`There were ${errorCount} mismatch between your answer and the correction so try again, you will do better.`;
        result.variant='danger';
      }
    }else {
      if(msg.answer.toUpperCase().replace(/\W/g,"")===exercisesFile.subThemes_correction.find(obj => obj.key === msg.exercise).answer) {
        result.validate = true
      } else {
        result.validate = false
        result.msg="Try again.";
        result.variant='danger';
      }
    }
    if(result.validate){
      team.exercise.push(msg.exercise);
      result.variant='success';
      result.validate=true;
      result.msg="Good job, you earn "+exercisesFile.subThemes.find(obj => obj.key === msg.exercise).point+" points.";
      team.point+=exercisesFile.subThemes.find(obj => obj.key === msg.exercise).point;
      let i=1;
      io.emit("scoreBoard",teams.sort(function(a, b){return b.point - a.point}).map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}));
    }
    socket.emit("exercise",result);
  });


  socket.on('choose name', (msg) => {
    var id=randomId();
    teams.push({id, name: msg.name, point: 0, exercise: [], socketId: socket.id});
    team=teams.find(obj => {return obj.id === id});
    connection(socket, team);
  });

  socket.on('chosenName', (msg) => {
    if(msg.password===password){
      team=teams.find(obj => {return obj.id === msg.id});
      if(team!=null)
        connection(socket, team);
      else
        socket.emit('listName', {rep: "This team don't exist"});
    }else{
      socket.emit('listName', {rep: "Wrong password !"});
    }
  });

  socket.on('scoreBoard', (msg) => {
    let i = 1;
    socket.emit("scoreBoard",teams.sort(function(a, b){return b.point - a.point}).map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}));
  });

  socket.on('testId', (msg) => {
    if(typeof teams.find((obj) => { return obj.id == msg}) === 'undefined')
    {
      socket.emit('wrongId');
    }else{
      team = teams.find(obj => {return obj.id === msg});
      team.socketId = socket.id
      socket.emit('goodId', team.exercise);
    }
  });

  socket.on('deletTeam', (id) => {
    const deletedTeamIndex = teams.findIndex( obj => obj.id = id )
    const deletedTeam = teams[deletedTeamIndex]
    const socketId = deletedTeam.socketId
    io.sockets.sockets[socketId].emit('wrongId')
    teams.splice(deletedTeamIndex, 1)
    let i = 1;
    io.emit("scoreBoard",teams.sort(function(a, b){return b.point - a.point}).map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}));
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
              document.cookie='you can validate with password=`+exercisesFile.subThemes_correction.find(obj => obj.key === 'xss_exercise').answer+`';
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
      rep = {msg: "The game has been restarted with success and all data have been deleted", variant: "success"};
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
        rep = {msg: "The game has started", variant: "success"};
      }else{
        rep = {msg: "The timer has already been started", variant: "warning"};
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
        rep = {msg: "The game has been stoped with success", variant: "success"};
      }else{
        rep = {msg: "The timer is not started and so you can not stop it", variant: "warning"};
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
          rep = {msg: "The game has been paused with success", variant: "success"};
        }else{
          rep = {msg: "Already paused", variant: "warning"};
        }
      } else {
        rep = {msg: "The timer is not started and so can not be paused", variant: "warning"};
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
          rep = {msg: "The game in now running back", variant: "success"};
        }else{
          rep = {msg: "The timer is not in pause and so you can not unpaused it", variant: "warning"};
        }
      }else{
        rep = {msg: "The timer is not started and so you can not unpaused it", variant: "warning"};
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
          rep = {msg: "The game have been stop as you send ", variant: "success"};
        } else {
          io.emit('change', endTimer.getTime());
          rep = {msg: "Timer has been changed", variant: "success"};
        }
      } else {
        rep = {msg: "The timer is not started", variant: "warning"};
      }
    } else {
      rep = {msg: "Wrong password", variant: "danger"};
    }
    socket.emit('timerSetting', rep);
  });

  socket.on('disconnect', function(msg){
  });

});



/*
app.get('*', (req, res) => {
  res.send("404");
});
*/

function setEndDate(obj){
  var myNow =  new Date();
  endTimer = myNow;
  if(typeof obj.hours !== 'undefined') endTimer.setHours(myNow.getHours()+parseInt(obj.hours));
  if(typeof obj.minutes !== 'undefined') endTimer.setMinutes(myNow.getMinutes()+parseInt(obj.minutes));
}
function connection(socket, team) {
  let i = 1;
  io.emit("scoreBoard",teams.sort(function(a, b){return b.point - a.point}).map((obj) => {return {placement: i++, name: obj.name, id: obj.id, point: obj.point}}));
  team.socketId = socket.id
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
