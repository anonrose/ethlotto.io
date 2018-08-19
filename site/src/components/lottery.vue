<template>
  <div class="slider">
    <vue-slider v-bind="slider" v-model="slider.value"></vue-slider>
    <tickets :tickets="tickets" :visibleTicketRange="visibleTicketRange"></tickets>
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
  watch: {
    "slider.value": function(middleTicketIndex) {
      this.showTicket(middleTicketIndex);
    },
    tickets: function(tickets) {
      this.showTicket(tickets.length / 2);
    }
  },
  methods: {
    showTicket(middleTicketIndex) {
      let beginningTicketIndex =
        middleTicketIndex - 10 < 0 ? 0 : middleTicketIndex - 10;

      let lastTicketIndex =
        middleTicketIndex + 10 > this.tickets.length
          ? this.tickets.length
          : middleTicketIndex + 10;

      this.visibleTicketRange = [beginningTicketIndex, lastTicketIndex];
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