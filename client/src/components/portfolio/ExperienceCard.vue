<script setup lang="ts">
import { Row, Col, Flex } from 'ant-design-vue'

interface ExperienceItem {
  from: string
  to: string
  title: string
  company: string
  desc: string
}

defineProps<{
  item: ExperienceItem
}>()
</script>

<template>
  <Row class="experience-card">
    <Col :span="4">
      <p class="timeline">{{ item.from }} → {{ item.to }}</p>
    </Col>

    <Col :span="20">
      <Flex vertical class="content">
        <h5 class="title">{{ item.title }}</h5>
        <h6 class="company">{{ item.company }}</h6>
        <p class="description">{{ item.desc }}</p>
      </Flex>
    </Col>
  </Row>
</template>

<style scoped>
.experience-card {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}

.experience-card:last-child {
  border-bottom: none;
}

.timeline {
  font: var(--label);
  color: var(--accent);
  margin-top: 0.2rem;
}

.title {
  font: var(--body);
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.company {
  font: var(--body);
  color: var(--accent);
  font-size: 0.9rem;
}

.description {
  font: var(--body);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.content {
  width: 100%;
}
</style>
