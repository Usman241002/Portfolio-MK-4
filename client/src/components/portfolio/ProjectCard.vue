<script setup lang="ts">
import { Card, Flex } from 'ant-design-vue'
import Badge from '@/components/portfolio/Badge.vue'

const { project, type = 'standard' } = defineProps({
  type: String,
  project: Object,
})
</script>

<template>
  <Card class="project-card">
    <template v-if="type === 'cover'" #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </template>
    <Flex gap="8" vertical
      ><p class="project-id">project_{{ project.id }}.tsx</p>
      <h6 class="project-title">{{ project.title }}</h6>
      <p class="project-description">{{ project.short_description }}</p>

      <Flex gap="12">
        <Badge v-for="tag in project.tags" :key="tag">{{ tag }}</Badge>
      </Flex></Flex
    >
  </Card>
</template>

<style>
.project-card {
  border-radius: 0;
  border: 1px solid var(--text-primary);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  overflow: hidden;
}

.project-card:hover {
  cursor: pointer;
  transform: translateY(-0.25rem);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

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
