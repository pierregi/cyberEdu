<template>
  <b-row>
    <h5 class="text-success col-12"><u>English frequency analysis : </u></h5>
    <div
      class="px-2"
      v-bind:class="{'col-12 col-lg-6': true, 'col-xl-3': !sideDoc}"
      v-for="subTab in frequencyEN.items">
      <b-table
        small
        striped bordered hover :fields="frequencyEN.fields" :items="subTab">
      </b-table>
    </div>
  </b-row>
</template>
<script>
export default {
  props: ['sideDoc'],
  data () {
    return {
      frequencyEN: {
        fields: [
          {
            key: 'letter',
            variant: 'col-4'
          },
          {
            key: 'fequency_(%)',
            variant: 'col-8'
          }
        ],
        items: [
          [
            {letter: 'e', 'fequency_(%)': 12.702},
            {letter: 't', 'fequency_(%)': 9.056},
            {letter: 'a', 'fequency_(%)': 8.167},
            {letter: 'o', 'fequency_(%)': 7.507},
            {letter: 'i', 'fequency_(%)': 6.966},
            {letter: 'n', 'fequency_(%)': 6.749},
            {letter: 's', 'fequency_(%)': 6.327}
          ],
          [
            {letter: 'h', 'fequency_(%)': 6.094},
            {letter: 'r', 'fequency_(%)': 5.987},
            {letter: 'd', 'fequency_(%)': 4.253},
            {letter: 'l', 'fequency_(%)': 4.025},
            {letter: 'c', 'fequency_(%)': 2.782},
            {letter: 'u', 'fequency_(%)': 2.758},
            {letter: 'm', 'fequency_(%)': 2.406}
          ],
          [
            {letter: 'w', 'fequency_(%)': 2.36},
            {letter: 'f', 'fequency_(%)': 2.228},
            {letter: 'g', 'fequency_(%)': 2.015},
            {letter: 'y', 'fequency_(%)': 1.974},
            {letter: 'p', 'fequency_(%)': 1.929},
            {letter: 'b', 'fequency_(%)': 1.492},
            {letter: 'v', 'fequency_(%)': 0.978}
          ],
          [
            {letter: 'k', 'fequency_(%)': 0.772},
            {letter: 'j', 'fequency_(%)': 0.153},
            {letter: 'x', 'fequency_(%)': 0.15},
            {letter: 'q', 'fequency_(%)': 0.095},
            {letter: 'z', 'fequency_(%)': 0.074}
          ]
        ]
      }
    }
  }
}
</script>
<style media="screen">

</style>
