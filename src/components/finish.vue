<template>
  <b-container class="d-flex flex-column justify-content-around">
    <b-row class="h-auto d-flex align-items-end">
      <b-col cols="4" class="m-0 p-0 h-auto d-flex flex-column align-items-center justify-content-end ">
        <h1 class="mw-100 text-break text-center">{{ typeof teams[1] !== 'undefined' ? teams[1].name : '' }}</h1>
        <div class="m-0 p-0 w-100 d-flex flex-column align-items-center justify-content-between" style="background-color: #cd6532; height: 255px">
          <span style="font-size: 100px">🥈</span>
          <h1>{{ typeof teams[1] !== 'undefined' ? teams[1].point + ' points' : '' }}</h1>
        </div>
      </b-col>
      <b-col cols="4" class="m-0 p-0 h-auto d-flex flex-column align-items-center justify-content-end">
        <span class="p-0 m-0" style="font-size: 100px">👑</span>
        <h1 class="mw-100 text-break text-center">{{ typeof teams[0] !== 'undefined' ? teams[0].name : '' }}</h1>
        <div class="m-0 p-0 w-100 d-flex flex-column align-items-center justify-content-between" style="background-color: #cd6532;  height: 300px">
          <span style="font-size: 100px">🥇</span>
          <h1>{{ typeof teams[0] !== 'undefined' ? teams[0].point + ' points' : '' }}</h1>
        </div>
      </b-col>
      <b-col cols="4" class="m-0 p-0 h-auto d-flex flex-column align-items-center justify-content-end">
        <h1 class="mw-100 text-break text-center">{{ typeof teams[2] !== 'undefined' ? teams[2].name : '' }}</h1>
        <div class="m-0 p-0 w-100 d-flex flex-column align-items-center justify-content-between" style="background-color: #cd6532; height: 210px">
          <span style="font-size: 100px">🥉</span>
          <h1>{{ typeof teams[2] !== 'undefined' ? teams[2].point + ' points' : '' }}</h1>
        </div>
      </b-col>
    </b-row>
    <myTables :teams="teams"/>
    <!--<b-row class="h-auto">

      <b-col :cols="col">
        <b-table :items="teams.slice(3,8)" :fields="fields" head-variant="dark"></b-table>
      </b-col>
      <b-col v-if="teams.length > 8" cols="6">
        <b-table :items="teams.slice(8,13)" :fields="fields"></b-table>
      </b-col>-->
      <!--<table>
        <tr>
          <th></th>
          <th>Teams</th>
          <th>Points</th>
        </tr>
        <tr
          v-for="team in teams"
          v-bind:key="team.id">
          <td>{{ teams.indexOf(team)+1 }}</td>
          <td>{{ team.name }}</td>
          <td>{{ team.point }}</td>
        </tr>
      </table>
    </b-row>
-->
  </b-container>
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
  computed: {
    col () {
      return this.teams.length > 8 ? 6 : 12
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

</style>
