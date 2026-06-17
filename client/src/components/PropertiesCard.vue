<script setup lang="ts">
import { Flex } from 'ant-design-vue'

const props = defineProps({
  title: String,
  desc: String,
})
</script>

<template>
  <Flex gap="small" class="properties-card" vertical>
    <slot />
  </Flex>
</template>

<style scoped>
.properties-card {
  background-color: var(--surface);
  border: 1px solid var(--text-primary);
  padding: 1.25rem;
  width: 20rem;
}

.properties-card h2 {
  font: var(--heading-lg);
}

.properties-card p {
  font: var(--label);
  color: var(--text-secondary);
  text-transform: uppercase;
}
</style>
