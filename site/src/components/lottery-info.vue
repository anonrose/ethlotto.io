<template>
  <div id="lottery-end">
    <div id="winning-amount">Amount to win: {{balanceInUSD}}$</div>
    <div id="time-remaining">{{timeRemaining}}
      <div v-if="lotteryComplete">
        <a href="#" @click="startNewLottery()"></a>
      </div>
    </div>
  </div>
</template>

<script>
import Lottery from "../../static/lottery";
import jetch from "jetch";

export default {
  created() {
    this.updateCountdown();
    this.updateBalance();
  },
  data() {
    let lottery = new Lottery();
    return {
      timeRemaining: "",
      lottery,
      balanceInWei: "",
      balanceInUSD: null,
      lotteryComplete: false
    };
  },
  methods: {
    startNewLottery() {
      this.lottery.complete();
    },
    updateBalance() {
      let cb = () => {
        this.lottery.getBalance().then(bal => (this.balanceInWei = bal));
      };
      cb();
      setInterval(cb, 5000);
    },
    updateCountdown() {
      this.lottery.getStart().then(() => {
        let cb = () => {
          if (this.lottery.isLotteryComplete) {
            clearInterval(intvl);
            this.timeRemaining = "lottery complete";
            this.lotteryComplete = true;
          } else {
            let {
              days: d,
              hours: h,
              minutes: m,
              seconds: s
            } = this.lottery.timeRemaining;
            this.timeRemaining = `${d} days ${h} hours ${m} ${s} remaining`;
          }
        };
        cb();
        let intvl = setInterval(cb, 1000);
      });
    }
  },
  watch: {
    balanceInWei: async function(newBal) {
      let { data: { amount: ethPrice } } = await jetch("/api/price.json");
      let ethAmount = web3.fromWei(newBal, "ether");
      this.balanceInUSD = parseFloat(ethPrice) * parseFloat(ethAmount);
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
