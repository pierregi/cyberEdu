<template>
  <div class="m-0 p-0 h-50 overflow-auto">
    <table class="h-100 m-0 p-0 table table-striped text-center table-hover table-sm">
      <thead class="m-0 p-0 position-sticky sticky-top thead-dark" style="height: 10%">
        <th scope="col">#</th>
        <th scope="col">Teams</th>
        <th scope="col">Points</th>
      </thead>
      <tbody class="m-0 p-0" style="height: 89%">
        <tr
          v-for="team in teams"
          v-bind:key="team.id"
          class="m-0 text-center" v-bind:style="{ height: height + '%' }">
          <th scope="row" class="align-middle">{{ team.placement }}</th>
          <td class="align-middle text-break">{{ team.name }}</td>
          <td class="align-middle">{{ team.point }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      teams: []
    }
  },
  computed: {
    height () {
      return 100.0 / this.teams.length
    }
  },
  sockets: {
    scoreBoard (data) {
      this.teams = data
    }
  },
  mounted () {
    this.$socket.emit('scoreBoard')
  }
}
</script>

<style>
</style>
