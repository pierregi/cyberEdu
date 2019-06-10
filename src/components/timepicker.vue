<template id="">
  <div class="row" style="height: 75px" >
    <div class="col-2 mr-2 p-0 text-center h-100">
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-up" @click="add('h1')" @mousedown="mouseDownHandler(add,'h1')" @mouseup="mouseUpHandler"/>
      <input id="input1" class="h-50 m-0 p-0 col-12 text-center" type="text" v-model="h1" @click="nextInput(1)"/>
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-down" @click="sub('h1')" @mousedown="mouseDownHandler(sub,'h1')" @mouseup="mouseUpHandler"/>
    </div>
    <div class="col-2 m-0 p-0 text-center h-100">
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-up" @click="add('h2')" @mousedown="mouseDownHandler(add,'h2')" @mouseup="mouseUpHandler"/>
      <input id="input2" class="h-50 m-0 p-0 col-12 text-center" type="text" v-model="h2" @click="nextInput(2)"/>
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-down" @click="sub('h2')" @mousedown="mouseDownHandler(sub,'h2')" @mouseup="mouseUpHandler"/>
    </div>
    <div class="m-0 p-0 col-2 h-100 d-flex align-items-center justify-content-center">
      <h1 class="m-0 p-0 align-middle">:</h1>
    </div>
    <div class="col-2 mr-2 p-0 text-center h-100">
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-up" @click="add('m1')" @mousedown="mouseDownHandler(add,'m1')" @mouseup="mouseUpHandler"/>
      <input id="input3" class="h-50 m-0 p-0 col-12 text-center" type="text" v-model="m1" @click="nextInput(3)"/>
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-down" @click="sub('m1')" @mousedown="mouseDownHandler(sub,'m1')" @mouseup="mouseUpHandler"/>
    </div>
    <div class="col-2 m-0 p-0 text-center h-100">
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-up" @click="add('m2')" @mousedown="mouseDownHandler(add,'m2')" @mouseup="mouseUpHandler"/>
      <input id="input4" class="h-50 m-0 p-0 col-12 text-center" type="text" v-model="m2" @click="nextInput(4)"/>
      <font-awesome-icon class="h-25 m-0 p-0" icon="angle-down" @click="sub('m2')" @mousedown="mouseDownHandler(sub,'m2')" @mouseup="mouseUpHandler"/>
    </div>
  </div>
</template>
<script>
export default {
  props: ['newTime'],
  data () {
    return {
      h1: 0,
      h2: 0,
      m1: 0,
      m2: 0,
      isArrow: false,
      mouseHold: null
    }
  },
  watch: {
    h1 () {
      if (isNaN(this.h1)) {
        this.h1 = 0
      }
      var parse = parseInt(this.h1)
      if (parse >= 2 && this.h2 > 3) {
        this.h2 = 3
      }
      this.h1 = parse < 0 ? 2 : parse % 3
      if (this.isArrow) {
        this.nextInput(1)
        this.isArrow = false
      } else {
        this.nextInput(2)
      }
      this.$emit('update_time', new Date(0, 0, 0, this.h1 * 10 + this.h2, this.m1 * 10 + this.m2, 0, 0))
    },
    h2 () {
      if (isNaN(this.h2)) {
        this.h2 = 0
      }
      var parse = parseInt(this.h2)
      if (this.h1 >= 2 && parse > 3) {
        this.h1++
        parse %= 4
      } else if (this.h1 <= 0 && parse < 0) {
        this.h1--
        parse = 4
      } else if (parse > 9) {
        this.h1++
        parse %= 10
      } else if (parse < 0) {
        this.h1--
        parse = 9
      }
      this.h2 = parse
      if (this.isArrow) {
        this.nextInput(2)
        this.isArrow = false
      } else {
        this.nextInput(3)
      }
      this.$emit('update_time', new Date(0, 0, 0, this.h1 * 10 + this.h2, this.m1 * 10 + this.m2, 0, 0))
    },
    m1 () {
      if (isNaN(this.m1)) {
        this.m1 = 0
      }
      var parse = parseInt(this.m1)
      if (parse > 5) {
        this.h2++
        parse %= 6
      } else if (parse < 0) {
        this.h2--
        parse = 5
      }
      this.m1 = parse
      if (this.isArrow) {
        this.nextInput(3)
        this.isArrow = false
      } else {
        this.nextInput(4)
      }
      this.$emit('update_time', new Date(0, 0, 0, this.h1 * 10 + this.h2, this.m1 * 10 + this.m2, 0, 0))
    },
    m2 () {
      var parse = parseInt(this.m2)
      if (isNaN(this.m2)) {
        parse = 0
      }
      if (parse > 9) {
        this.m1++
        parse %= 10
      } else if (parse < 0) {
        this.m1--
        parse = 9
      }
      this.m2 = parse
      if (this.isArrow) {
        this.nextInput(4)
        this.isArrow = false
      } else {
        this.nextInput(1)
      }
      this.$emit('update_time', new Date(0, 0, 0, this.h1 * 10 + this.h2, this.m1 * 10 + this.m2, 0, 0))
    }
  },
  mounted () {
    var h1Temp = Math.floor(this.newTime.getHours() / 10)
    this.h1 = h1Temp > 0 ? h1Temp : 0
    this.h2 = Math.floor(this.newTime.getHours() % 10)
    var m1Temp = Math.floor(this.newTime.getMinutes() / 10)
    this.m1 = m1Temp > 0 ? m1Temp : 0
    this.m2 = Math.floor(this.newTime.getHours % 10)
  },
  methods: {
    add (i) {
      this.isArrow = true
      this[i] = parseInt(this[i]) + 1
    },
    sub (i) {
      this.isArrow = true
      this[i] = parseInt(this[i]) - 1
    },
    nextInput (i) {
      document.getElementById('input' + i).focus()
      document.getElementById('input' + i).selectionStart = 0
      document.getElementById('input' + i).selectionEnd = 2
    },
    mouseDownHandler (func, i) {
      this.mouseHold = setInterval(func, 200, i)
    },
    mouseUpHandler () {
      clearInterval(this.mouseHold)
    }

  }
}
</script>
<!--
<style media="screen">
.bigContainer {
  width: 150px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
}
.timepickerDigit {
  display: flex;
  height: 70px;
  flex-direction: column;
  width: 30px;
  justify-content:space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
}
.timepickerDigit span {
  width: auto;
}
.timepickerDigit input {
  text-align: center;
  width: 20px;
}
.bigContainer h1 {
  border: none;
  margin: 0;
  padding: 0;
}
</style>-->
