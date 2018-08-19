<template>
  <div class="ticket-container">
    {{index}}
  </div>
</template>
<script>
import ticket from "./ticket";

export default {
  props: ["address", "index"],
  computed: {}
};
</script>

<style lang="scss" scoped>
.ticket-container {
  border-radius: 16px;
  background-position: center center;
  cursor: pointer;
  margin-bottom: 6px;
  margin-right: 5px;
  margin-left: 5px;
  width: 90px;
  height: 32px;
}
</style>

