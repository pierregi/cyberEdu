<template>
  <div style="width: 100%; height: 100%">
    <div id="app" v-if="named">
      <Menu class="menu" />
      <scoreBoard class="scoreBoard" />
      <Main class="main" />
      <timer class="timer" />
    </div>

    <div v-else-if="chooseName">
      <p>Password</p>
      <input v-model="password" type="password"/>
      <p>{{repServ}}</p>
      <ul>
        <li
          v-for="team in teams"
          v-bind:key="team.id"
          @click="chosenName(team.id)">
            {{ team.name }}
          </li>
      </ul>
      <button @click="returnName">Return</button>
    </div>
    <div v-else class="">
      <form @submit.prevent="name">
        <input type="text" name="" v-model="teamName">
        <button type="submit">Named</button>
      </form>
      <a @click="chooseExistingName">Choose Existing Name</a>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu';
import Main from '@/components/Mainpage';
import scoreBoard from '@/components/scoreBoard';
import timer from '@/components/timer';

export default {
  name: 'App',
  data() {
    return {
      named: false,
      chooseName: false,
      repServ: '',
      password: '',
      teamName: '',
      teams: [],
    };
  },
  components: {
    Menu,
    Main,
    timer,
    scoreBoard,
  },
  sockets: {
    listName(msg) {
      this.teams = msg.teams;
      this.repServ = msg.rep;
      this.chooseName = true;
    },
    chooseNameSuccess() {
      this.chooseName = false;
      this.named = true;
    },
  },
  methods: {
    name() {
      this.named = true;
      this.$socket.emit('choose name', { name: this.teamName });
    },
    chooseExistingName() {
      this.$socket.emit('chooseExistingName');
      this.chooseName = true;
      this.named = false;
    },
    chosenName(id) {
      this.$socket.emit('chosenName', { password: this.password, id });
    },
    returnName() {
      this.named = false;
      this.chooseName = false;
    },
  },
};
</script>

<style>
.menu {
  width: 20%;
  height: 50%;
  position: fixed;
  top: 0px;
  left: 0px;
  border-bottom: 1px solid black;
}

.scoreBoard {
  width: 20%;
  height: 50%;
  position: fixed;
  bottom: 0px;
  left: 0px;
}

.main {
  width: 46%;
  height:96%;
  padding: 2%;
  position: fixed;
  top:0px;
  left: 20%;
  border-left: 1px solid black;
}

.timer {
  width: 30%;
  height:15%;
  position: fixed;
  top: 0px;
  right: 0;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
