<template>
  <div id="ticket-notification">
    <div>{{ notification }}</div>
  </div>
</template>

<script>
export default {
  props: ["notification"]
};
</script>
<style lang="scss" scoped>
#ticket-notification {
  width: 100%;
  font-style: italic;
  font-size: 30px;
}
</style>

