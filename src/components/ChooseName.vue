<template>
  <div class="">
    <b-row align-h="center" align-v="end" style="height:40%">
      <img src="@/assets/1200px-University_of_Sunderland_logo.svg.png" class="img-fluid col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3 px-4 px-sm-0"/>
    </b-row>
    <b-row align-h="center" align-v="start">
    <form class="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4 px-4 px-sm-0" @submit.prevent="name">
      <div class="form-group">
        <label class="col-form-label col-form-label-lg" for="name">Team's name</label>
        <input class="form-control" type="text" id="name" aria-describedby="emailHelp" placeholder="Enter Team's name" v-model="teamName">
        <small id="nameHelp" class="form-text text-muted">Choose well your Team name because you will keep it until the end.</small>
      </div>
      <b-alert v-if="teamName.length > 20" variant="danger" class="col-12 my-1 text-center" show>Team's name should contains less than 20 characters</b-alert>
      <div class="d-flex justify-content-between">
        <b-link class="btn btn-outline-primary" v-bind:to="'Admin'" style="width: 100px">Admin</b-link>
        <b-button :disabled="teamName.length > 20" variant="primary" @click="name" style="width: 100px">Validate</b-button>
      </div>
    </form>
  </b-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      teamName: ''
    }
  },
  methods: {
    name () {
      this.$socket.emit('choose name', { name: this.teamName })
    }
  }
}
</script>
<style media="screen">

</style>
