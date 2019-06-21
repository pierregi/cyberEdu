<template>
    <div id="clock" class="light">
      <div class="display" style="min-width: 242px;">
        <div class="digits">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['timerSetting'],
  data () {
    return {
      digit_holder: '',
      digits: {},
      digit_to_name: '',
      positions: [],
      interval: null
    }
  },
  watch: {
    timerSetting: {
      handler () {
        if (this.timerSetting.isStarted) {
          if (this.timerSetting.isPaused) {
            this.update_time(this.timerSetting.datePause)
            clearInterval(this.interval)
          } else {
            this.interval = setInterval(this.myInterval, 1000)
          }
        } else if (this.timerSetting.isStop) {
          clearInterval(this.interval)
        } else {
          clearInterval(this.interval)
        }
        this.timerSetting.load = false
      },
      deep: true
    }
  },
  methods: {
    myInterval () {
      // Get todays date and time
      const now = new Date().getTime()
      this.update_time(now)
      // Find the distance between now and the count down date
    },
    update_time (date) {
      const distance = this.timerSetting.countDownDate - date
      // Time calculations for days, hours, minutes and seconds
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      // If the count down is finished, write some text
      this.digits.h1.attr('class', this.digit_to_name[Math.floor(hours / 10)])
      this.digits.h2.attr('class', this.digit_to_name[hours % 10])
      this.digits.m1.attr('class', this.digit_to_name[Math.floor(minutes / 10)])
      this.digits.m2.attr('class', this.digit_to_name[minutes % 10])
      this.digits.s1.attr('class', this.digit_to_name[Math.floor(seconds / 10)])
      this.digits.s2.attr('class', this.digit_to_name[seconds % 10])
      if (distance < 0) {
        clearInterval(this.interval)
      }
    },
    createClock () {
      this.digit_holder = $('div#clock').find('.digits')
      this.digits = {}
      this.digit_to_name = 'zero one two three four five six seven eight nine'.split(' ')
      this.positions = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2']
      var self = this
      $.each(this.positions, function () {
        if (this === ':') {
          self.digit_holder.append($('<div class="dots">'))
        } else {
          var pos = $('<div>')
          for (let i = 1; i < 8; i++) {
            pos.append('<span class="d' + i + '">')
          }
          // Set the digits as key:value pairs in the digits object
          self.digits[this] = pos
          // Add the digit elements to the page
          self.digit_holder.append(pos)
        }
      })
    }
  },
  mounted () {
    this.$socket.emit('getTimer')
    this.timerSetting.load = true
    this.createClock()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style>
.timerContainer {
  margin: 0px;
  height:100px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}
.timer {
  width: auto;
}

/*-------------------------
  Light color theme
--------------------------*/

#clock.light:after{
  box-shadow:0 4px 10px rgba(0,0,0,0.15);
}

#clock.light .digits div span{
  background-color:#272e38;
  border-color:#272e38;
}

#clock.light .digits div.dots:before,
#clock.light .digits div.dots:after{
  background-color:#272e38;
}

/*-------------------------
  The Digits
--------------------------*/

#clock .digits div{
  text-align:left;
  position:relative;
  width: 28px;
  height:50px;
  display:inline-block;
  margin:0 4px;
}

#clock .digits div span{
  opacity:0;
  position:absolute;

  -webkit-transition:0.25s;
  -moz-transition:0.25s;
  transition:0.25s;
}

#clock .digits div span:before,
#clock .digits div span:after{
  content:'';
  position:absolute;
  width:0;
  height:0;
  border:5px solid transparent;
}

#clock .digits .d1{height:5px;width:16px;top:0;left:6px;}
#clock .digits .d1:before{border-width:0 5px 5px 0;border-right-color:inherit;left:-5px;}
#clock .digits .d1:after{border-width:0 0 5px 5px;border-left-color:inherit;right:-5px;}

#clock .digits .d2{height:5px;width:16px;top:24px;left:6px;}
#clock .digits .d2:before{border-width:3px 4px 2px;border-right-color:inherit;left:-8px;}
#clock .digits .d2:after{border-width:3px 4px 2px;border-left-color:inherit;right:-8px;}

#clock .digits .d3{height:5px;width:16px;top:48px;left:6px;}
#clock .digits .d3:before{border-width:5px 5px 0 0;border-right-color:inherit;left:-5px;}
#clock .digits .d3:after{border-width:5px 0 0 5px;border-left-color:inherit;right:-5px;}

#clock .digits .d4{width:5px;height:14px;top:7px;left:0;}
#clock .digits .d4:before{border-width:0 5px 5px 0;border-bottom-color:inherit;top:-5px;}
#clock .digits .d4:after{border-width:0 0 5px 5px;border-left-color:inherit;bottom:-5px;}

#clock .digits .d5{width:5px;height:14px;top:7px;right:0;}
#clock .digits .d5:before{border-width:0 0 5px 5px;border-bottom-color:inherit;top:-5px;}
#clock .digits .d5:after{border-width:5px 0 0 5px;border-top-color:inherit;bottom:-5px;}

#clock .digits .d6{width:5px;height:14px;top:32px;left:0;}
#clock .digits .d6:before{border-width:0 5px 5px 0;border-bottom-color:inherit;top:-5px;}
#clock .digits .d6:after{border-width:0 0 5px 5px;border-left-color:inherit;bottom:-5px;}

#clock .digits .d7{width:5px;height:14px;top:32px;right:0;}
#clock .digits .d7:before{border-width:0 0 5px 5px;border-bottom-color:inherit;top:-5px;}
#clock .digits .d7:after{border-width:5px 0 0 5px;border-top-color:inherit;bottom:-5px;}

/* 1 */

#clock .digits div.one .d5,
#clock .digits div.one .d7{
  opacity:1;
}

/* 2 */

#clock .digits div.two .d1,
#clock .digits div.two .d5,
#clock .digits div.two .d2,
#clock .digits div.two .d6,
#clock .digits div.two .d3{
  opacity:1;
}

/* 3 */

#clock .digits div.three .d1,
#clock .digits div.three .d5,
#clock .digits div.three .d2,
#clock .digits div.three .d7,
#clock .digits div.three .d3{
  opacity:1;
}

/* 4 */

#clock .digits div.four .d5,
#clock .digits div.four .d2,
#clock .digits div.four .d4,
#clock .digits div.four .d7{
  opacity:1;
}

/* 5 */

#clock .digits div.five .d1,
#clock .digits div.five .d2,
#clock .digits div.five .d4,
#clock .digits div.five .d3,
#clock .digits div.five .d7{
  opacity:1;
}

/* 6 */

#clock .digits div.six .d1,
#clock .digits div.six .d2,
#clock .digits div.six .d4,
#clock .digits div.six .d3,
#clock .digits div.six .d6,
#clock .digits div.six .d7{
  opacity:1;
}

/* 7 */

#clock .digits div.seven .d1,
#clock .digits div.seven .d5,
#clock .digits div.seven .d7{
  opacity:1;
}

/* 8 */

#clock .digits div.eight .d1,
#clock .digits div.eight .d2,
#clock .digits div.eight .d3,
#clock .digits div.eight .d4,
#clock .digits div.eight .d5,
#clock .digits div.eight .d6,
#clock .digits div.eight .d7{
  opacity:1;
}

/* 9 */

#clock .digits div.nine .d1,
#clock .digits div.nine .d2,
#clock .digits div.nine .d3,
#clock .digits div.nine .d4,
#clock .digits div.nine .d5,
#clock .digits div.nine .d7{
  opacity:1;
}

/* 0 */

#clock .digits div.zero .d1,
#clock .digits div.zero .d3,
#clock .digits div.zero .d4,
#clock .digits div.zero .d5,
#clock .digits div.zero .d6,
#clock .digits div.zero .d7{
  opacity:1;
}

/* The dots */

#clock .digits div.dots{
  width:5px;
}

#clock .digits div.dots:before,
#clock .digits div.dots:after{
  width:5px;
  height:5px;
  content:'';
  position:absolute;
  left:0;
  top:14px;
}

#clock .digits div.dots:after{
  top:34px;
}
</style>
