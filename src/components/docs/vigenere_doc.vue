<template id="">
  <div class="text-justify">
    <h2 class="text-danger">Documentation</h2>
    <p class="indent">The Vigenère cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword.</p>
    <div class="my-4">
      <h3 class="text-danger">Encipher step</h3>
      <p class="indent">
        In the first one, you choose a keyword or a sentence that will be your key.<br/>
        In second, you take your key and repeat it so it will be the same longer as the message.<br/>
        In last, you take each letter of the message and add the corresponding one in the key where an offset of 'A' correspond to an offset of 0, 'B' correspond to 1 ...
      </p>
    </div>
    <div class="my-4">
      <h3 class="text-info">Example :</h3>
      <p>Message : <span class="text-success">"You are on cyber-edu"</span></p>
      <div class="ml-3">
        <h5 class="mb-4">1) We choose <span class="text-warning">"MYMESSAGE"</span> as key</h5>
        <div class="mb-4">
          <h5>2) We repeat it until it has the same length as the message.</h5>
            <div class="card mx-5 my-3 p-2 w-auto text-monospace border bg-white border-secondary">
              <table class="w-100 m-0 bg-white text-center text-break" style="letter-spacing: 2px; font-size: 20px;">
                <tr class="border-bottom border-secondary">
                  <th class="p-2 border-right border-secondary">Message</th>
                  <td class="p-2 border-right border-secondary text-monospace text-success">Youareonc</td>
                  <td class="p-2 border-right border-secondary text-monospace text-success">yberedu</td>
                  <td></td>
                </tr>
                <tr>
                  <th class="p-2 border-right border-secondary">Key</th>
                  <td class="p-2 border-right border-secondary text-monospace text-warning">MYMESSAGE</td>
                  <td class="p-2 border-right border-secondary text-monospace text-warning">MYMESSA</td>
                  <td class="p-2 text-monospace ">GE</td>
                </tr>
              </table>
          </div>
        </div>
        <div class="mb-4">
          <h5 class="mb-3">3) We add the message and the repeated key together to create the cipher.</h5>
          <p class="mx-5 my-3  p-2 w-auto text-monospace border bg-white border-secondary text-center rounded font-weight-bold" style="font-size: 23px">
            &nbsp; <span class="text-success">You are on cyber-edu</span><br/>
                 + <span class="text-warning">MYM ESS AG EMYME SSA</span><br/>
            &nbsp; ↓↓↓ ↓↓↓ ↓↓ ↓↓↓↓↓ ↓↓↓<br/>
            &nbsp; <span class="text-primary">Kmg ejw ot gkzqv-wvu</span>
          </p>
          <p  class="mx-5">The cipher is <span class="text-primary">"Kmg ejw ot gkzqv-wvu"</span></p>
        </div>
      </div>
    </div>
    <div class="my-4">
      <h3 class="text-danger">Decryption step</h3>
      <div class="ml-3">
        <h5 class="text-info">1) First step : Kasiski examination</h5>
        <p class="my-3 indent">In the first one, you have to find the key length. For that you can use the "Kasiski examination" which use the fact that repeated word can be encrypted with the same key letters and leading the cipher to be repeated.</p>
        <div class="mx-5 my-3  p-2 border bg-white border-secondary rounded">
          <div class="row m-0 p-0 h-auto justify-content-between">
            <b class="m-0 p-0">Key :</b>
            <p class="m-0 p-0 text-monospace text-break" v-bind:style="{ width: box + 'px', 'letter-spacing': '1px'}"><b class="text-success">KEY</b>KEYKEY<b class="text-danger">KEYK</b>EYKEYKEYKEYKEYKEYKEYKEYKEY<b class="text-success">KEY</b><b class="text-danger">KEYK</b>EYKEYKEYKEYK</p>
          </div>
          <div class="row m-0 p-0 h-auto justify-content-between">
            <b class="m-0 p-0">Plaintext :</b>
            <p class="m-0 p-0 text-monospace text-break" v-bind:style="{ width: box + 'px', 'letter-spacing': '1px'}"><b class="text-success">YOU</b>HAVETO<b class="text-danger">FIND</b>REPETITIONSANDTHATWILLHELP<b class="text-success">YOU</b><b class="text-danger">FIND</b>THEKEYLENGHT</p>
          </div>
          <div class="row m-0 p-0 wh-100 justify-content-between" id="cipherTextParent">
            <b class="m-0 pr-1 w-auto" id="cipherText">Ciphertext :</b>
            <p class="m-0 p-0 text-monospace text-break" v-bind:style="{ width: box + 'px', 'letter-spacing': '1px'}"><b class="text-success">ISS</b>RETOXM<b class="text-danger">PMLN</b>VCZIRSXGYRQKRBDLYDAGVPFOPN<b class="text-success">ISS</b><b class="text-danger">PMLN</b>XFOOCIPCXKFD</p>
          </div>
        </div>
        <p class="my-3 indent">
          The distance between the repetitions of <b class="text-success">ISS</b> is 39 so if we assume that the repeated segments represent the same plaintext segment, the key length should be a divider of 39 that implies the key is 39, 13, 3 or 1 long.<br/>
          For <b class="text-danger">PMLN</b> the repetitions is 33 so the key length should be 33, 11, 3 or 1.
        </p>
        <p class="my-3 indent">
          We can now take the intersection and deduce that the key should be 3 long because with a key of 1 long it would be a simple caesar cipher.
        </p>
        <h5 class="text-info">2) Second step</h5>
        <p class="my-3 indent">In second step, you have to do a frequency analysis. Before that we have to separate letters of the text on group where they have been encrypt with the same key letter.</p>
        <div class="mx-5 my-3 p-2 border bg-white border-secondary rounded">
          <b-row
            class="m-0 p-0 mw-100"
            v-once tag="p">
            <b>Cipher<span class="mx-2">:</span></b><span v-for="letter in cipherHTML" v-html="letter" class="text-monospace text-break" style="letter-spacing:3px;"></span>
          </b-row>
          <b-row
            class="m-0 p-0 mw-100"
            v-once tag="p">
            <b>Key length<span class="mx-2">:</span></b><span>3</span>
          </b-row>
          <b-row
            v-for="row in cipher"
            class="m-0 p-0 mw-100"
            tag="p"
            v-once>
            <b>{{ row.title }}<span class="ml-2">:</span></b><b class="text-monospace text-break ml-3" v-bind:class="row.color" style="letter-spacing:3px;">{{ row.text }}</b>
          </b-row>
        </div>
        <p class="my-3 indent">Now, you can analyze the frequency of letter distribution for each group. You will count how many time each letters are present in each group to compare it with the english one and try to find the offset off each group.</p>
        <h5 class="text-info">3) Last step</h5>
        <p class="my-3 indent">In the previous step, you have find the offset for each group. Now, you can decipher using the the good offset for each group.</p>
        <Frequency :sideDoc="sideDoc"/>
      </div>
    </div>
  </div>
</template>
<script>
import Frequency from '@/components/docs/frequency'

export default {
  props: ['sideDoc'],
  data () {
    return {
      cipher: [
        {
          title: 'Encipher with 1st letter',
          text: 'IROPNZSYKDDVOIPNOIXD',
          color: 'text-success',
          i: 2
        },
        {
          title: '2nd letter',
          text: 'SEXMVIXRRLAPPSMXOPK',
          color: 'text-danger',
          i: 3
        },
        {
          title: '3rd letter',
          text: 'STMLCRGQBYGFNSLFCCF',
          color: 'text-info',
          i: 4
        }
      ],
      cipherWidth: 0,
      box: 0
    }
  },
  computed: {
    cipherHTML () {
      let html = new Array(this.cipher[0].text.length).fill('')
      for (let j = 0; j < this.cipher.length; j++) {
        for (let i = 0; i < this.cipher[j].text.length; i++) {
          html[i] += '<b class="' + this.cipher[j].color + '">' + this.cipher[j].text[i] + '</b>'
        }
      }
      return html
    }
  },
  methods: {
    getAttribute (i, tag, attribute) {
      return this.step2[i][tag][this.sideDoc ? 'sideDoc' : 'fullDoc'][attribute]
    },
    size () {
      this.cipherWidth = document.getElementById('cipherText').clientWidth
      this.box = document.getElementById('cipherTextParent').clientWidth - this.cipherWidth - 1
    }
  },
  mounted () {
    this.cipherWidth = document.getElementById('cipherText').clientWidth
    this.box = document.getElementById('cipherTextParent').clientWidth - this.cipherWidth - 1
    window.addEventListener('resize', this.size)
  },
  beforeDestroy () {
    window.addEventListener('resize', this.size)
  },
  components: {
    Frequency
  }

}
</script>
<style>
</style>
