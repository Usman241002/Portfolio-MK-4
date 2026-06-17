<script setup lang="ts">
import { Flex } from 'ant-design-vue'

const props = defineProps({
  title: String,
  desc: String,
})
</script>

<template>
  <Flex gap="small" class="stat-card" vertical>
    <h2>{{ props.title }}</h2>
    <p>{{ props.desc }}</p>
  </Flex>
</template>

<style>
.stat-card {
  background-color: var(--surface);
  border: 1px solid var(--text-primary);
  padding: 1.25rem;
  width: 20rem;
}

.stat-card h2 {
  font: var(--heading-lg);
}

.stat-card p {
  font: var(--label);
  color: var(--text-secondary);
  text-transform: uppercase;
}
</style>
