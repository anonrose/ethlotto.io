<template>
  <div>
    <li v-for="(item, index) in tickets"  :key="item" >
      {{ item }} - {{index}}
   </li>
  </div>
</template>
<script>
export default {
  props: ["tickets"]
};
</script>

<style lang="scss" scoped>
.slider {
  margin-top: -150px;
}
</style>