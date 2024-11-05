<template>
  <div class="test">
    <h2>App Root Vue</h2>
  </div>
</template>
<script setup lang="ts" name="Name">
import {ref,reactive} from "vue"

let sum = ref(12)

console.log(sum.value);

</script>
<style lang="css" scoped>

</style>
