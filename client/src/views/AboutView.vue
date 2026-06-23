<script setup lang="ts">
import { Flex, Row, Col, Divider } from 'ant-design-vue'
import Subtitle from '@/components/Subtitle.vue'
import AboutMe from '@/components/AboutMe.vue'
import SkillsTable from '@/components/SkillsTable.vue'
import ExperienceCard from '@/components/ExperienceCard.vue'

const experience = [
  {
    id: 1,
    from: '2023',
    to: '2026',
    title: 'Software Engineering Student',
    company: 'Coventry University',
    desc: 'Relevant coursework: Web Development, Web Api Development, Web Security',
  },
  {
    id: 2,
    from: '2024',
    to: 'Present',
    title: 'Freelance Software Developer',
    company: 'Freelance',
    desc: 'Built and optimized web apps for small businesses. Developed database-driven tools to enhance operations.',
  },
  {
    id: 3,
    from: '2022',
    to: '2025',
    title: 'Automotive Business Operations',
    company: 'Yardley Motor Trade',
    desc: 'Oversaw car sales, third-party dealership operations, and team coordination. Streamlined business processes using technical problem-solving.',
  },
]
</script>

<template>
  <Flex class="container" gap="24" vertical>
    <Row :gutter="24">
      <Col :span="12">
        <Flex class="temp-rect" />
      </Col>
      <Col :span="12">
        <AboutMe />
      </Col>
    </Row>

    <Divider />

    <Row>
      <Col :span="4">
        <Subtitle>Skills</Subtitle>
      </Col>
      <Col :span="20">
        <SkillsTable />
      </Col>
    </Row>

    <Divider />

    <Row>
      <Col :span="4">
        <Subtitle>Experience</Subtitle>
      </Col>

      <Col :span="20">
        <ExperienceCard v-for="item in experience" :key="item.id" :item="item" />
      </Col>
    </Row>
  </Flex>
</template>

<style scoped>
.temp-rect {
  width: 100%;
  height: 600px;
  min-height: 200px;
  background: var(--surface);
}
</style>
