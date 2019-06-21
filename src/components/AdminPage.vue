<template>
  <div class="container-fluid h-100 ">
    <div class="row h-100">
        <div class="offset-1 col-10 p-0 h-100" >
          <div class="row col-12 p-0 m-0 justify-content-between" style="">
            <div class="p-0 d-flex col justify-content-center d-flex flex-column">
              <h1 class="m-0">Admin</h1>
              <b-link class="" v-bind:to="'/'">Return to Home</b-link>
            </div>
            <div class="col-6 m-0 p-0">
              <Timer class="m-0 p-0" v-bind:timerSetting="timerSetting"/>
            </div>
          </div>
          <div class="row col-12 p-0 m-0" v-if="connected" >
            <div class="col-12 col-xl-6 mb-5 p-0 pr-xl-5">
              <h3>Clock</h3>
              <b-form @submit.prevent='chooseDuration' class="w-100">
                <div class="form-group row align-items-center m-0 p-0 w-100 d-flex justify-content-between">
                  <label class="col-form-label m-0 p-0 w-auto" for="appt-time" style="font-size: 24px">{{ timerSetting.isStarted ? 'Change Duration :' : 'Duration of the exercise :' }}</label>
                  <Timepicker id="appt-time" v-bind:newTime="newTime" v-on:update_time="update_time"  class="ml-auto my-2 w-auto" />
                  <b-button variant="primary" type="submit" name="start" class="ml-auto" style="width: 100px">{{ timerSetting.isStarted ? 'Change' : 'Start' }}</b-button>
                </div>
              </b-form>
              <div class="mt-5 mb-3 d-flex flex-inline justify-content-left">
                  <b-button class="mr-4" v-if="timerSetting.isStarted && timerSetting.isPaused" variant="success" name="play" @click="play" style="width: 100px">Play</b-button>
                  <b-button class="mr-4" v-if="timerSetting.isStarted && !timerSetting.isPaused" variant="warning" name="pause" @click="pause" style="width: 100px">Pause</b-button>
                  <b-button class="mr-4" v-if="timerSetting.isStarted" variant="warning" id="buttonStop" name="stop" @click="stop" style="width: 100px">Stop</b-button>
                  <b-tooltip v-if="timerSetting.isStarted" target="buttonStop" placement="bottom">
                      <strong>If you stop the game, players will be redirected to the score page and the timer will be stoped.</strong>
                  </b-tooltip>
                  <b-button class="mr-4" variant="danger" id="buttonRestart" name="restart" v-b-modal.modal-restart style="width: 100px">Restart</b-button>
                  <b-modal id="modal-restart" title="Restart" @ok="restart">
                    <p class="my-4">Are you sure you want to restart the game ?</p>
                  </b-modal>
                  <b-tooltip target="buttonRestart" placement="bottom">
                      <strong>If you restart the game, every data (teams and timer) on the current game will be delete.</strong>
                  </b-tooltip>
              </div>
              <b-alert class="text-center" v-if="repServTimer.msg" show v-bind:variant="repServTimer.variant">{{ repServTimer.msg }}</b-alert>
            </div>
            <b-col cols="12" xl="6" class="m-0 p-0 pl-xl-5 d-flex flex-column">
              <h3>Teams</h3>
              <b-button-group
                v-for="team in teams"
                v-bind:key="team.id"
                class="p-0 m-0"
                style="height: 40px"
              >
                <b-button variant="outline-dark" class="d-flex justify-content-between col-11 rounded-0" @click="chosenName(team.id)">
                  <b>{{ team.placement }}. {{ team.name }}</b> <span>{{team.point}}</span>
                </b-button>
                <b-button @click="deleteTeam = team" variant="outline-danger" aria-label="Close" v-b-modal.modal-delete-team class="p-0" style="font-size: 25px"><span aria-hidden="true" class="m-0 p-0">&times;</span></b-button>
                <b-modal id="modal-delete-team" title="Delete Team" @ok="deletTeam()">
                  <p class="my-4">Do you really want to delete the <b>{{ deleteTeam.name }}</b> team ?</p>
                </b-modal>
              </b-button-group>
              <b-alert v-if="repServListName" show v-bind:variant="danger">{{ repServListName }}</b-alert>
            </b-col>
          </div>
          <div v-else class="d-flex flex-column">
            <b-form class="mb-2" @submit.prevent="connectAdmin" inline>
              <label class="mr-2 col-form-label col-form-label-lg" for="password">Password</label>
              <b-input class="mr-2 col-7 col-md-5 col-lg-3" type="password" id="password" v-model="password" required></b-input>
              <b-button variant="primary" type="submit" name="connect" style="width: 100px">Connect</b-button>

            </b-form>
            <b-alert class="col-5 text-center" :variant="repServ.variant" show>{{repServ.msg}}</b-alert>
          </div>

        </div>
      </div>

    </div>
</template>
<script>
import Timer from '@/components/timer'
import Timepicker from '@/components/timepicker'

export default {
  props: ['timerSetting'],
  data () {
    return {
      password: '',
      connected: false,
      teams: [],
      newTime: new Date(0, 0, 0, 3, 0, 0, 0),
      repServ: {msg: '', variant: ''},
      repServTimer: {msg: '', variant: ''},
      repServListName: '',
      deleteTeam: {},
      myTimeOut: null
    }
  },
  sockets: {
    scoreBoard (msg) {
      this.teams = msg
    },
    connectAdmin (msg) {
      this.connected = msg.connected
      this.repServ = msg.repServ
      clearTimeout(this.myTimeOut)
    },
    timerSetting (msg) {
      this.repServTimer = msg
    },
    listName (msg) {
      this.repServListName = msg.rep
    }
  },
  methods: {
    deletTeam () {
      this.$socket.emit('deletTeam', this.deleteTeam.id)
    },
    update_time (data) {
      this.newTime = data
    },
    connectAdmin () {
      this.$socket.emit('connectAdmin', { password: this.password })
      this.myTimeOut = setTimeout(() => {
        this.repServ = {msg: 'Could not join server', variant: 'danger'}
      }, 5000)
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
        if (!this.timerSetting.isStarted) {
          this.$socket.emit('start', { password: this.password, duration })
        } else {
          this.$socket.emit('change', { password: this.password, duration })
        }
      } catch (e) {
        this.repServTimer.msg = 'Wrong Date type'
        this.repServTimer.variant = 'danger'
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
    document.getElementById('password').focus()
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
