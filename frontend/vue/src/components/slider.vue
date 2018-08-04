<template>
  <div class="slider">
    <vue-slider v-bind="slider" v-model="slider.value"></vue-slider>
    <button @click="purchaseTicket(slider.value)">Purchase Ticket</button>
    <li v-for="(item, index) in tickets"  :key="item" >
      {{ item }} - {{index}}
   </li>
  </div>
</template>
<script>
  import vueSlider from 'vue-slider-component'

  export default {
    components: {
      vueSlider
    },
    data () {
      return {
        slider: {
          value: 50,
          height: 20,
          min: 0,
          dotSize: 20,
          disabled: false,
          show: true,
          speed: 0.3,
          reverse: false,
          lazy: true,
          piecewise: false,
          bgStyle: {
            "backgroundColor": "#fff",
            "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
          },
          sliderStyle: {
            "backgroundColor": "#47678D"
          },
          tooltipStyle: {
            "backgroundColor": "#f05b72",
            "borderColor": "#f05b72"
          },
          processStyle: {
            "backgroundImage": "-webkit-linear-gradient(left, #BD7579, #47678D)"
          }
        }
      }
    },
    methods: {
      purchaseTicket(ticket) {
        console.log('purchase ticket', ticket);
      }
    },
    computed: {
      tickets: async function() {
        console.log(this.slider.value, 'tickets');
        return [];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slider{
    margin-top: -150px;
  }
</style>