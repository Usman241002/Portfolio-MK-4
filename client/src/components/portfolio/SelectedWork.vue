<script setup lang="ts">
import { Flex, Row, Col } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'

const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description for Project 1',
    tags: ['Vue', 'TypeScript'],
  },
  { id: 2, title: 'Project 2', description: 'Description for Project 2', tags: ['React'] },
  { id: 3, title: 'Project 3', description: 'Description for Project 3', tags: ['JS'] },
]
</script>

<template>
  <Flex class="container" vertical gap="24">
    <Subtitle>selected_work []</Subtitle>

    <Row :gutter="[24, 24]">
      <Col v-for="project in projects" :key="project.id" :xs="24" :sm="12" :lg="8">
        <ProjectCard :project="project" />
      </Col>
    </Row>

    <Flex justify="flex-end">
      <BaseButton variant="secondary">
        View all projects
        <ArrowRightOutlined />
      </BaseButton>
    </Flex>
  </Flex>
</template>
