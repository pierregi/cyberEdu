<template>
  <div class="">
    <h1>{{ timer }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: 'Waiting for start',
      countDownDate: '',
      interval: '',
    };
  },
  sockets: {
    timer(date) {
      this.countDownDate = date;
      console.log(this.countDownDate);
      this.interval = setInterval(this.myInterval, 1000);
    }
  },
  methods: {
    myInterval() {
        // Get todays date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = this.countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        this.timer = hours + "h "+ minutes + "m " + seconds + "s ";
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          this.timer = 'finished';
        }
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
};
</script>

<style>

</style>
