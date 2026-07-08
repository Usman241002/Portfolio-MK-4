<script setup>
import { Flex } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'

const props = defineProps({
  title: String,
  stat: Number,
})
</script>

<template>
  <Flex gap="small" class="stat-card" vertical>
    <Subtitle>{{ props.title }}</Subtitle>
    <p>{{ props.stat }}</p>
  </Flex>
</template>

<style>
.stat-card {
  background-color: var(--surface);
  border: 1px solid var(--text-primary);
  padding: 1.25rem;
  width: 100%;
}

.stat-card p {
  font: var(--heading-lg);
  letter-spacing: var(--heading-lg-tracking);
  color: var(--text-primary);
  text-transform: uppercase;
}
</style>
