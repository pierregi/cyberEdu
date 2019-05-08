<template>
  <div>
    <ol>
      <li
        v-for="subTheme in subThemes"
        v-bind:key="subTheme.key"
        @click="selectSubTheme(subTheme.key)"
        >
        {{ subTheme.subtitle }} {{ subTheme.point }}
      </li>
    </ol>
  </div>
</template>
<script type='text/javascript'>
import Vuex from 'vuex';

export default {
  props: ['theme'],
  data() {
    return {
      subThemes: [],
      error: false,
    };
  },
  computed: {
    ...Vuex.mapGetters({
      selectedTheme: 'getSelectedTheme',
    }),
  },
  methods: {
    selectSubTheme(subTheme) {
      if (typeof this.theme !== 'undefined') {
        this.$store.dispatch('selectTheme', this.theme);
      }
      this.$store.dispatch('selectSubTheme', subTheme);
    },
  },
  mounted() {
    let realTheme;
    if (typeof this.theme !== 'undefined') {
      realTheme = this.theme.key;
    } else {
      realTheme = this.selectedTheme.key;
    }
    this.$resource('subThemes').get({ refer: realTheme }).then(
      (response) => { this.subThemes = response.data; },
      (response) => {
        console.error('error', response);
        this.error = true;
      },
    );
  },
};
</script>

<style>

</style>
