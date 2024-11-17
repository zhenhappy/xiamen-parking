<script lang="ts" setup>
let statusBarHeight = $ref(0)

onLoad(() => {
  statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
})
</script>

<template>
  <div :style="{ height: `${statusBarHeight}px` }"></div>
</template>

<style lang="scss" scoped></style>
