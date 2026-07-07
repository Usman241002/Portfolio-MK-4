<script setup lang="ts">
import { Row, Col, Flex } from 'ant-design-vue'
import dayjs from 'dayjs'

interface ExperienceItem {
  start_date: string
  end_date: string
  title: string
  company: string
  description: string
}

defineProps<{
  item: ExperienceItem
}>()
</script>

<template>
  <Row class="experience-card">
    <Col :span="4">
      <p class="timeline">
        {{ dayjs(item.start_date).format('MM-YYYY') }} →
        {{ item.end_date == null ? 'Present' : dayjs(item.end_date).format('MM-YYYY') }}
      </p>
    </Col>

    <Col :span="20">
      <Flex vertical class="content">
        <h5 class="title">{{ item.title }}</h5>
        <h6 class="company">{{ item.company }}</h6>
        <p class="description">{{ item.description }}</p>
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
  letter-spacing: var(--label-tracking);
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
