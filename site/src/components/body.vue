<template>
  <div>
    <contract-info/>
    <lottery/>
    <application-info/>
  </div>
</template>

<script>
import ApplicationInfo from "./application-info";
import Lottery from "./lottery";
import ContractInfo from "./contract-info";
export default {
  name: "Body",
  components: { ApplicationInfo, Lottery, ContractInfo }
};
</script>
<style lang="scss" scoped>
.slider {
  margin-top: -150px;
}
</style>