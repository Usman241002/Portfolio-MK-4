<script setup lang="ts">
import { defineProps } from 'vue'
import { Card } from 'ant-design-vue'
import { Flex } from 'ant-design-vue'
import Badge from '@/components/Badge.vue'

const props = defineProps({
  type: String,
  project: Object,
})
</script>

<template>
  <Card
    :style="{
      borderRadius: '0',
      border: '1px solid var(--text-primary)',
    }"
  >
    <Flex gap="8" vertical
      ><p class="project-id">project_{{ project.id }}.tsx</p>
      <h6 class="project-title">{{ project.title }}</h6>
      <p class="project-description">{{ project.description }}</p>

      <Flex gap="12">
        <Badge v-for="tag in project.tags" :key="tag">{{ tag }}</Badge>
      </Flex></Flex
    >
  </Card>
</template>

<style>
.project-id {
  font: var(--micro);
  text-transform: lowercase;
  color: var(--accent);
}

.project-title {
  font: var(--body);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.project-description {
  font: var(--body);
  color: var(--text-secondary);
}
</style>
