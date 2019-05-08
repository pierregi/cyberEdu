<template>
  <div>
    <component
      v-bind:is="data.component" v-bind:name="name" v-bind:data="data">
    </component>
  </div>
</template>
<script>
import cipher_component from './cipher_component';
import sql_injection_component from './sql_injection_component';

export default {
  props: ['name', 'data'],
  components: {
    cipher_component,
    sql_injection_component,
  },
};
</script>
<style>
</style>
