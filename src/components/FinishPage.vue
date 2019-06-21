<template>
  <div class="h-100 w-100" > <!-- style="background-color: #ffdf89" -->
    <b-container class="d-flex flex-column justify-content-around h-100 color" >
      <b-row class=" d-flex align-items-end" style="border: 10px solid #ffbe14; border-radius: 25px; height: 60vmin" >
        <b-col cols="4" class="m-0 p-0 h-100 d-flex flex-column align-items-center justify-content-end" style="background-color: #e6e6e6; border-radius: 10px 0 0 10px;">
          <!--<div class="bg-light p-3 my-5 d-flex align-items-center justify-content-center" :style="{backgroundImage: 'url('+bgImages[1]+')'}">
            <h1 class="mw-100 m-0 text-break text-center font-weight-bold " >{{ typeof teams[1] !== 'undefined' ? teams[1].name : '' }}</h1>
          </div>-->
          <div class="p-0 my-auto d-flex align-items-center justify-content-center" style=" width: 90%; position: relative;  text-align: center;">
            <img src="@/assets/couroneArgent.svg" alt="" class="img-fluid LaurelWreath">
            <h1 class="m-0 text-break text-center font-weight-bold centered text-light" style="max-width: 70%">{{ typeof teams[1] !== 'undefined' ? teams[1].name : '' }}</h1>
          </div>
          <div class="p-0 m-0 w-100" style="background-color: #cd6532; height:10px">
            <div class="m-0 p-0 w-100" style="background-color: #e6e6e6; height: 10px; border-radius: 0 0 10px 0;">
            </div>
          </div>
          <div class="m-0 p-0 w-100 d-flex flex-column align-items-center justify-content-between" style="background-color: #cd6532; height: 22vmin; color: #e6e6e6; border-radius: 25px 0 0 10px;">
            <span class="icon">🥈</span>
            <h1 class="font-weight-bold points">{{ typeof teams[1] !== 'undefined' ? teams[1].point + ' points' : '' }}</h1>
          </div>
        </b-col>

        <b-col cols="4" class="m-0 p-0 h-100 d-flex flex-column align-items-center justify-content-end" style="background-color: #ffce4d; ">
          <span class="p-0 m-0 crowned icon position-absolute" style="top: 5%">👑</span>
          <div class="p-0 my-auto d-flex align-items-center justify-content-center" style=" width: 90%; position: relative;  text-align: center;">
            <img src="@/assets/couroneGold.svg" alt="" class="img-fluid LaurelWreath">
            <h1 class="m-0 text-break text-center font-weight-bold text-light centered" style="width: 70%">{{ typeof teams[0] !== 'undefined' ? teams[0].name : '' }}</h1>
          </div>
          <div class="w-100 m-0 p-0" style="height:10px"></div>
          <div class="m-0 p-0 w-100 d-flex flex-column align-items-center justify-content-between" style="background-color: #cd6532;  height: 26vmin; color: #ffce4d; border-radius: 25px 25px 0 0;" >
            <span class="icon">🥇</span>
            <h1 class="font-weight-bold points">{{ typeof teams[0] !== 'undefined' ? teams[0].point + ' points' : '' }}</h1>
          </div>
        </b-col>

        <b-col cols="4" class="m-0 p-0 h-100 d-flex flex-column align-items-center justify-content-end" style="background-color: #fab993; border-radius: 0 10px 10px 0;">
          <div class="p-0 my-auto d-flex align-items-center justify-content-center" style=" width: 90%; position: relative;  text-align: center;">
           <img src="@/assets/couroneBronze.svg" alt="" class="img-fluid LaurelWreath">
           <h1 class="m-0 text-break text-center font-weight-bold centered text-light" style="max-width: 50%">{{ typeof teams[2] !== 'undefined' ? teams[2].name : '' }}</h1>
         </div>
          <div class="p-0 m-0 w-100" style="background-color: #cd6532; height:10px">
            <div class="m-0 p-0 w-100" style="background-color: #fab993; height: 10px; border-radius: 0 0 0 10px;">
            </div>
          </div>
          <div class="m-0 p-0 w-100 d-flex flex-column align-items-center justify-content-between" style="background-color: #cd6532; height: 18vmin; color: #fab993; border-radius: 0 25px 10px 0;">
            <span class="icon">🥉</span>
            <h1 class="font-weight-bold points">{{ typeof teams[2] !== 'undefined' ? teams[2].point + ' points' : '' }}</h1>
          </div>
        </b-col>
      </b-row>
      <myTables v-if="teams.length>3" class="font-weight-bold" :teams="teams.slice(3)" style="background-color: #f0d0c0; border: 10px solid; border-radius: 25px"/>
    </b-container>
  </div>

</template>
<script>
import MyTables from '@/components/myTables'

export default {
  data () {
    return {
      fields: [
        {
          key: 'placement',
          label: '#'
        },
        'name',
        'point'
      ],
      teams: []
    }
  },
  sockets: {
    scoreBoard (data) {
      this.teams = data
    }
  },
  mounted () {
    this.$socket.emit('scoreBoard')
  },
  components: {
    MyTables
  }
}
</script>
<style media="screen">
  .color {
    color: #904823;
  }
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    font-size: 3vmin;
  }
  .crowned {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .icon {
    font-size: 7vmin;
  }
  .LaurelWreath {

    max-height: 25vmin;
  }
  .points {
    font-size: 4vmin;
  }
</style>
