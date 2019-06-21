<template>
  <div class="">
    <h2 class="text-danger">Documentation</h2>
    <p class="indent">Caesar Cipher is one of the simplest and most widely known encryption techniques. It consists of an offset of a fixed number of every letters.</p>
    <div class="my-4">
      <h3 class="text-danger">Encipher step</h3>
      <p class="indent">In the first one, you choose a key number between 0 to 25 that represent the offset.<br/>
        In second, you take one letter by one and replace it with the one that is key number after.
      </p>
    </div>
    <div class="my-4">
      <h3 class="text-info">Example :</h3>
      <p>Message : <span class="text-success">"You are on cyber-edu"</span></p>
      <div class="ml-3">
        <div class="mb-4">
          <h5>1) We choose a <span class="text-warning">key of 3</span></h5>
          <div class="card mx-5 my-3 p-2 w-auto text-monospace border bg-white border-secondary">
            <table v-if="sideDoc || windowWidth < 1300" class="w-100">
              <tr class="border-bottom border-secondary">
                <th class="">Letters</th>
                <th v-for="letter in offset[0][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-success">{{letter}}</th>
              </tr>
              <tr>
                <th class="">Offsets</th>
                <td v-for="letter in offset[1][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-primary">{{ letter }}</td>
              </tr>
              <br/>
              <tr class="border-bottom border-secondary">
                <th class="">Letters</th>
                <th v-for="letter in offset[0][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-success">{{letter}}</th>
              </tr>
              <tr>
                <th class="">Offsets</th>
                <td v-for="letter in offset[1][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-primary">{{ letter }}</td>
              </tr>
            </table>
            <table v-else class="w-100">
              <tr class="border-bottom border-secondary">
                <th class="">Letters</th>
                <th v-for="letter in offset[0][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-success">{{letter}}</th>
                <th v-for="letter in offset[0][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-success">{{letter}}</th>
              </tr>
              <tr>
                <th  class="">Offsets</th>
                <td v-for="letter in offset[1][0]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-primary">{{ letter }}</td>
                <td v-for="letter in offset[1][1]"
                  v-bind:key="letter"
                  class="text-center border-left border-secondary text-primary">{{ letter }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <h5>2) Now We can encrypt each letters one by one.</h5>
          <p class="mx-5 my-3  p-2 w-auto text-monospace border bg-white border-secondary text-center rounded font-weight-bold" style="font-size: 23px">
            <span class="text-success">You are on cyber-edu</span><br/>
            ↓↓↓ ↓↓↓ ↓↓ ↓↓↓↓↓ ↓↓↓<br/>
            <span class="text-primary">Brx duh rq fbehu-hgx</span>
          </p>
          <p class="mx-5 my-0">The cipher is <span class="text-primary">"Brx duh rq fbehu-hgx"</span></p>
        </div>
      </div>
    </div>
    <div class="my-4">
      <h3 class="text-danger">Decryption step</h3>
      <p class="indent">As their is only 26 possibility, you can brut force (try every possibility one by one to find the good one) on the first line to find what is the key and decipher all the rest with the key.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['sideDoc', 'windowWidth'],
  data () {
    return {
      offset: [['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'], ['DEFGHIJKLMNOP', 'QRSTUVWXYZABC']]
    }
  }
}
</script>
<style>
</style>
