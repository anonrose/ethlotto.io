<template>
  <div id="lottery-end">
    {{lotteryEnd}} \\ {{balance}}
  </div>
</template>

<script>
import Contract from "../../static/contract";
export default {
  props: ["lotteryEnd", "balance"]
};
</script>

<style lang="scss" scoped>
#lottery-end {
  font-size: 30px;
  margin-bottom: 30px;
  margin-top: -120px;
}
</style>
