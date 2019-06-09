<template>
  <div class="container-fluid h-100 ">
    <div class="row h-100">
        <div class="offset-1 col-10 p-0 h-100" >
          <div class="row col-12 p-0 m-0 justify-content-between">
            <div class="d-flex col align-items-center">
              <h1>Admin</h1>
            </div>
            <div class="col-6 m-0 p-0">
              <Timer class="m-0 p-0" v-bind:myTimer="myTimer" style="height: 150px"/>
            </div>
          </div>
          <div class="row col-12 p-0 m-0" v-if="connected" >
            <div class="col-12 col-xl-6 mb-5 p-0 pr-xl-5">
              <h3>Clock</h3>
              <b-form @submit.prevent='chooseDuration' class="w-100">
                <div class="form-group row align-items-center m-0 p-0 w-100 d-flex justify-content-between">
                  <label class="col-form-label m-0 p-0 w-auto" for="appt-time" style="font-size: 24px">{{ myTimer.isStarted ? 'Change Duration :' : 'Duration of the exercise :' }}</label>
                  <Timepicker id="appt-time" v-bind:newTime="newTime" v-on:update_time="update_time" style="width: 150px;"/>
                  <b-button variant="primary" type="submit" name="start" style="width: 100px">{{ myTimer.isStarted ? 'Change' : 'Start' }}</b-button>
                </div>
              </b-form>
              <div class="mt-5 mb-3 d-flex flex-inline justify-content-left">
                  <b-button class="mr-4" v-if="myTimer.isStarted && myTimer.isPaused" variant="success" name="play" @click="play" style="width: 100px">Play</b-button>
                  <b-button class="mr-4" v-if="myTimer.isStarted && !myTimer.isPaused" variant="warning" name="pause" @click="pause" style="width: 100px">Pause</b-button>
                  <b-button class="mr-4" v-if="myTimer.isStarted" variant="warning" name="stop" @click="stop" style="width: 100px">Stop</b-button>
                  <b-button class="mr-4" variant="danger" name="restart" @click="restart" style="width: 100px">Restart</b-button>
              </div>
              <b-alert class="text-center" v-if="repServTimer.msg" show v-bind:variant="repServTimer.variant">{{ repServTimer.msg }}</b-alert>
            </div>
            <b-col cols="12" xl="6" class="mb-5 p-0 pl-xl-5 d-flex flex-column">
              <h3>Teams</h3>
              <!--<b-list-group-item
                v-for="team in teams"
                v-bind:key="team.id"
                class="w-100 p-0 m-0 d-flex justify-content-between"
                >-->
                <b-button-group
                v-for="team in teams"
                v-bind:key="team.id"
                class="p-0 m-0"
                >
                  <b-button variant="outline-success" class="d-flex justify-content-between p-3 col-11 rounded-0" @click="chosenName(team.id)">
                    <b>{{ team.name }}</b> <span>{{team.point}}</span>
                  </b-button>
                  <b-button @click="deletTeam(team.id)" variant="outline-danger" aria-label="Close" style="font-size: 25px"><span aria-hidden="true">&times;</span></b-button>
                </b-button-group>
              <!--</b-list-group-item>-->
              <!--<b-list-group-item
                href="#"
                v-for="team in teams"
                v-bind:key="team.id"
                @click="chosenName(team.id)"
                class="w-100 h-100 p-0 m-0"
                >
                <b-alert show dismissible fade class="d-flex justify-content-between m-0" variant="light"><b>{{ team.name }}</b> <span class="ml-auto">{{team.point}}</span></b-alert>
              </b-list-group-item>-->
              <b-alert v-if="repServListName" show v-bind:variant="danger">{{ repServListName }}</b-alert>
            </b-col>
          </div>
          <b-form v-else class="mb-2" @submit.prevent="connectAdmin" inline>
            <label class="mr-2 col-form-label col-form-label-lg" for="password">Password</label>
            <b-input class="mr-2 col-7 col-md-5 col-lg-3" type="password" id="password" v-model="password" required></b-input>
            <b-button variant="primary" type="submit" name="connect" style="width: 100px">Connect</b-button>
          </b-form>
          <b-link v-bind:to="'/'">Return</b-link>
        </div>
      </div>
    </div>
</template>
<script>
import Timer from '@/components/timer'
import Timepicker from '@/components/timepicker'

export default {
  props: ['myTimer'],
  data () {
    return {
      password: '',
      connected: false,
      teams: [],
      newTime: new Date(0, 0, 0, 3, 0, 0, 0),
      repServ: {msg: '', variant: ''},
      repServTimer: {msg: '', variant: ''},
      repServListName: ''
    }
  },
  sockets: {
    scoreBoard (msg) {
      this.teams = msg
    },
    connectAdmin (msg) {
      this.connected = msg.connected
      this.repServ = msg.repServ
    },
    timerSetting (msg) {
      this.repServTimer = msg
    },
    listName (msg) {
      this.teams = msg.teams
      this.repServListName = msg.rep
    }
  },
  methods: {
    deletTeam (id) {
      this.$socket.emit('deletTeam', id)
    },
    update_time (data) {
      this.newTime = data
    },
    connectAdmin () {
      this.$socket.emit('connectAdmin', { password: this.password })
    },
    chosenName (id) {
      this.$socket.emit('chosenName', { password: this.password, id })
    },
    chooseDuration () {
      try {
        var duration = {
          hours: this.newTime.getHours(),
          minutes: this.newTime.getMinutes()
        }
        if (!this.myTimer.isStarted) {
          this.$socket.emit('start', { password: this.password, duration })
        } else {
          this.$socket.emit('change', { password: this.password, duration })
        }
      } catch (e) {
        console.log('Wrong Date type')
      }
    },
    play () {
      this.$socket.emit('play', { password: this.password })
    },
    pause () {
      this.$socket.emit('pause', { password: this.password })
    },
    stop () {
      this.$socket.emit('stop', { password: this.password })
    },
    restart () {
      this.$socket.emit('restart', { password: this.password })
      this.$socket.emit('scoreBoard')
    }
  },
  components: {
    Timer,
    Timepicker
  },
  mounted () {
    // this.$socket.emit('getTimer')
    this.$socket.emit('scoreBoard')
  }
}
</script>
<style media="screen">
.chooseName {
  width: 200px;
  list-style-position: inside;
}
.name:hover {
  background-color: #ddd;
}
</style>
