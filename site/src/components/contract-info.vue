<template>
  <div>
    {{lotteryEnd}} \\ {{balance}}
  </div>
</template>

<script>
import Contract from "../../static/contract";
export default {
  data() {
    return {
      lotteryEnd: "",
      balance: ""
    };
  },
  created() {
    Contract.lotteryEnd().then(t => (this.lotteryEnd = t));
    Contract.balance().then(b => (this.balance = b));
  }
};
</script>
