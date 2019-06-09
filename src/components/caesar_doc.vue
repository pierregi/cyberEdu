<template>
  <div class="">
    <h2>Documentation</h2>
    <p class="indent">Caesar Cipher is one of the simplest and most widely known encryption techniques. It consists of an offset of a fixed number of every letters.</p>
    <div class="my-4">
      <h3>Encipher step</h3>
      <p class="indent">In the first one, you choose a key number between 0 to 25 that represent the offset.<br/>
        In second, you take one letter by one and replace it with the one that is key number after.
      </p>
    </div>
    <div class="my-4">
      <h3>Example</h3>
      <p>Message : 'You are on cyber-edu'</p>
      <div class="ml-3">
        <div class="mb-4">
          <h5>1) We choose a key of 3</h5>
          <div class="card mx-5 my-3 p-2 w-auto text-monospace border bg-white border-secondary">
            <table v-if="sideDoc" class="w-100" v-once>
              <tr class="border-bottom border-secondary">
                <th class="">Letters</th>
                <th v-for="letter in offset[0][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{letter}}</th>
              </tr>
              <tr>
                <th class="">Offsets</th>
                <td v-for="letter in offset[1][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{ letter }}</td>
              </tr>
              <br/>
              <tr class="border-bottom border-secondary">
                <th class="">Letters</th>
                <th v-for="letter in offset[0][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{letter}}</th>
              </tr>
              <tr>
                <th class="">Offsets</th>
                <td v-for="letter in offset[1][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{ letter }}</td>
              </tr>
            </table>
            <table v-else class="w-100" v-once>
              <tr class="border-bottom border-secondary">
                <th class="">Letters</th>
                <th v-for="letter in offset[0][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{letter}}</th>
                <th v-for="letter in offset[0][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{letter}}</th>
              </tr>
              <tr>
                <th  class="">Offsets</th>
                <td v-for="letter in offset[1][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{ letter }}</td>
                <td v-for="letter in offset[1][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary">{{ letter }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <h5>2) Now We can encrypt each letters one by one.</h5>
          <p class="mx-5 my-3  p-2 w-auto text-monospace border bg-white border-secondary text-center rounded font-weight-bold" style="font-size: 23px">
            You are on cyber-edu<br/>
            ↓↓↓ ↓↓↓ ↓↓ ↓↓↓↓↓ ↓↓↓<br/>
            Brx duh rq fbehu-hgx
          </p>
          <p class="mx-5 my-0">The cipher is "Brx duh rq fbehu-hgx"</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['sideDoc'],
  data () {
    return {
      offset: [['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'], ['DEFGHIJKLMNOP', 'QRSTUVWXYZABC']]
    }
  }
}
</script>
<style>
</style>
