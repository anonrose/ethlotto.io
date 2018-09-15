<template>
  <div id="lottery-end">
    <div id="winning-amount">{{balance}}</div>
    <div id="time-remaining">{{timeRemaining}}</div>
  </div>
</template>

<script>
import Lottery from "../../static/lottery";

export default {
  created() {
    this.lottery = new Lottery();
    this.updateCountdown();
    this.updateBalance();
  },
  data() {
    return {
      timeRemaining: "",
      balance: ""
    };
  },
  methods: {
    updateBalance() {
      setInterval(() => {
        this.balance = this.lottery.balance || "";
      }, 50000);
    },
    updateCountdown() {
      this.lottery.getStart().then(() => {
        let intvl = setInterval(() => {
          if (this.lottery.isLotteryComplete) {
            clearInterval(intvl);
            this.timeRemaining = "lottery complete";
          } else {
            let {
              days: d,
              hours: h,
              minutes: m,
              seconds: s
            } = this.lottery.timeRemaining;
            this.timeRemaining = `${d} days ${h} hours ${m} ${s} remaining`;
          }
        }, 1000);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#lottery-end {
  font-size: 30px;
  margin-bottom: 30px;
  margin-top: -120px;
}
</style>
