<template>
  <div>
    <lottery-info :lotteryEnd="lotteryEnd" :balance="balance"/>
    <vue-slider v-bind="slider" v-model="slider.value"></vue-slider>
    <tickets :tickets="tickets" :visibleTicketRange="visibleTicketRange" v-on:purchase-ticket="purchaseTicket"></tickets>
  </div>
</template>

<script>
import vueSlider from "vue-slider-component";
import Lottery from "../../static/lottery";
import tickets from "./tickets";
import lotteryInfo from "./lottery-info";

export default {
  components: {
    vueSlider,
    tickets,
    lotteryInfo
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
    this.lottery = new Lottery();
    this.lottery.syncWithDeployedContract().then(() => {
      this.tickets = this.lottery.tickets;
      this.lotteryEnd = this.lottery.lotteryEnd;
      this.balance = this.lottery.balance;
    });
  },
  watch: {
    "slider.value": function(middleTicketIndex) {
      this.showTicket(middleTicketIndex);
    },
    tickets(tickets) {
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
    purchaseTicket(ticket) {
      this.lottery.purchaseTicket(ticket);
    }
  }
};
</script>