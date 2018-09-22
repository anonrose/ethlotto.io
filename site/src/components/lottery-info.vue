<template>
  <div id="lottery-end">
    <div id="winning-amount">
      Amount to <span v-if="lotteryComplete">distribute</span><span v-else>win</span>: {{balanceInUSD}}$
    </div>
    <div class="text-xs-center d-flex align-center" v-if="lotteryComplete">
      <v-tooltip absolute >
        <v-btn slot="activator" depressed small color="green" id="start-new-contract" @click="startNewLottery()">
          <h1>Start New Lottery</h1><v-icon scale="2" name="rocket"/>
        </v-btn>
        <span>Starting a new lottery both distributes funds from the previous lottery and starts a new round.</span>
      </v-tooltip>
    </div>
    <div v-else>
      {{timeRemaining}}
    </div>
  </div>
</template>

<script>
import Lottery from "../../static/lottery";
import jetch from "jetch";
import Icon from "vue-awesome/components/Icon";
import Web3 from "web3";

export default {
  created() {
    this.updateCountdown();
    this.updateBalance();
  },
  components: {
    "v-icon": Icon
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
            this.timeRemaining = `${d} day${d < 2 ? "" : "s"} ${h} hour${
              h < 2 ? "" : "s"
            } ${m} minute${m < 2 ? "" : "s"} ${s} second${
              s < 2 ? "" : "s"
            } remaining`;
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
      let ethAmount = Web3.utils.fromWei(newBal, "ether");
      this.balanceInUSD = (
        parseFloat(ethPrice) * parseFloat(ethAmount)
      ).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-tooltip__content {
  left: 33% !important;
  top: 0px !important;
}
#start-new-contract {
  height: 45px;
}
#lottery-end {
  font-size: 30px;
  margin-bottom: 30px;
  margin-top: -120px;
}
</style>
