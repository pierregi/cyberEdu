<template>
  <div>
    <component
      v-bind:is="data.component" v-bind:name="name" v-bind:data="data">
    </component>
    <p v-bind:class="{'wrong': isWrong, 'validate': !isWrong}">{{ server_response }}</p>
  </div>
</template>
<script>
import cipher_component from '@/components/cipher_component';
import sql_injection_component from '@/components/sql_injection_component';

export default {
  props: ['name', 'data'],
  data() {
    return {
      server_response: '',
      isWrong: false,
    };
  },
  sockets: {
    exercise(data) {
      this.server_response = data.msg;
      this.isWrong = data.class;
      if (data.validate) this.$store.dispatch('addDoneExercise', this.name);
    },
  },
  components: {
    cipher_component,
    sql_injection_component,
  },
};
</script>
<style>
</style>
