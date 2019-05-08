<template>
  <div class="">
    <div class="selected-post" v-if="!hasChange">
      <subtitle v-bind:subtitle="exercise.subtitle"></subtitle>
      <description v-bind:description="exercise.description"></description>
      <exercise v-bind:name="exercise.key" v-bind:data="exercise.exercise"/>
    </div>
    <div v-else-if="error">
      Error in the loading
    </div>
    <div v-else>
      Loading exercise !
    </div>
  </div>
</template>
<script>
import Vuex from 'vuex';
import subtitle from './subtitle';
import description from './description';
import exercise from './exercise';

export default {
  data() {
    return {
      exercise: {},
      error: false,
    };
  },
  computed: {
    ...Vuex.mapGetters({
      hasChange: 'hasChange',
      selectedSubTheme: 'getSelectedSubTheme',
    }),
  },
  components: {
    subtitle,
    description,
    exercise,
  },
  mounted() {
    if (this.hasChange) {
      this.$resource('exercise').get({ key: this.selectedSubTheme }).then(
        (response) => {
          this.exercise = response.data;
          this.$store.dispatch('hasChange', false);
        },
        (response) => {
          console.error('error', response);
          this.error = true;
        },
      );
    }
  },
  updated() {
    if (this.hasChange) {
      this.$resource('exercise').get({ key: this.selectedSubTheme }).then(
        (response) => {
          this.exercise = response.data;
          this.$store.dispatch('hasChange', false);
        },
        (response) => {
          console.error('error', response);
          this.error = true;
        },
      );
    }
  },
};
</script>
<style media="screen">
.wrong {
  color: red;
}
.validate {
  color: green;
}
</style>
