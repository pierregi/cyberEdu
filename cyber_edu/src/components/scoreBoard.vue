<template>
  <div class="scoreBoard">
    <table>
      <tr>
        <th></th>
        <th>Teams</th>
        <th>Points</th>
      </tr>
      <tr
        v-for="team in teams"
        v-bind:key="team.id"
        v-bind:style="{ height: taille + '%' }">
        <td>{{ teams.indexOf(team)+1 }}</td>
        <td>{{ team.name }}</td>
        <td>{{ team.point }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [],
    };
  },
  computed: {
    taille() {
      return 85.0 / this.teams.length;
    }
  },
  sockets: {
    scoreBoard(data) {
      this.teams = data;
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}
th,td {
  padding: 5px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: center;
}
tr {
  height: 10%;
}

</style>
