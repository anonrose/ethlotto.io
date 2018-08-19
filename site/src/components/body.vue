<template>
  <div>
    <lottery/>
    <application-info/>
  </div>
</template>

<script>
import ApplicationInfo from "./application-info";
import Lottery from "./lottery.vue";
export default {
  name: "Body",
  components: { ApplicationInfo, Lottery }
};
</script>
