<script setup>
import { Flex } from 'ant-design-vue'

const { title } = defineProps({ title :{ type: String }})
</script>

<template>
  <Flex
    id="header"
    class="dash-container"
    width="100%"
    justify="space-between"
    align="center"
    :style="{
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      padding: 'var(--space-md) var(--space-xl)',
    }"
  >
    <h3 class="header-title">{{ title }}</h3>
    <Flex gap="8"><slot /></Flex>
  </Flex>
</template>

<style scoped>
.header-title {
  font: var(--heading-md);
  letter-spacing: var(--heading-md-tracking);
}
</style>
