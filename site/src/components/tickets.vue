<template>
  <div>
    <li v-for="(item, index) in tickets"  :key="item" >
      {{ item }} - {{index + 1}} 
   </li>
  </div>
</template>
<script>
export default {
  props: ["tickets"]
};
</script>
