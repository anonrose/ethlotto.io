<template>
  <div class="slider">
    <vue-slider v-bind="slider" v-model="slider.value"></vue-slider>
    <button @click="purchaseTicket(slider.value)"><h3>Purchase Ticket</h3></button>
    <tickets :tickets="tickets"></tickets>
  </div>
</template>
<script>
import vueSlider from "vue-slider-component";
import Contract from "../../static/contract";
import tickets from "./tickets";

export default {
  components: {
    vueSlider,
    tickets
  },
  data() {
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
          backgroundColor: "#fff",
          boxShadow: "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
        },
        sliderStyle: {
          backgroundColor: "#47678D"
        },
        tooltipStyle: {
          backgroundColor: "#f05b72",
          borderColor: "#f05b72"
        },
        processStyle: {
          backgroundImage: "-webkit-linear-gradient(left, #BD7579, #47678D)"
        }
      },
      tickets: []
    };
  },
  created() {
    this.fetchTickets();
  },
  methods: {
    purchaseTicket(ticket) {
      console.log("purchase ticket", ticket);
    },
    fetchTickets() {
      new Contract().tickets.then(ticks => (this.tickets = ticks));
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  margin-top: -150px;
}
</style>