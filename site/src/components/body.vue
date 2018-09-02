<template>
  <div>
    <lottery/>
    <application-info/>
  </div>
</template>

<script>
import ApplicationInfo from "./application-info";
import Lottery from "./lottery";

export default {
  name: "Body",
  components: { ApplicationInfo, Lottery }
};
</script>
<style lang="scss" scoped>
.slider {
  margin-top: -150px;
}
</style>