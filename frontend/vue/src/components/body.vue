<template>
  <div>
    <slider/>
    <application-info/>
  </div>
</template>

<script>
import ApplicationInfo from './application-info'
import Slider from './slider.vue'
export default {
  name: 'Body',
  components: { ApplicationInfo, Slider }
}
</script>
