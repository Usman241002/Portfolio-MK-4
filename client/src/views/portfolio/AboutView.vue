<script setup>
import { onMounted } from 'vue'

import { Flex, Row, Col, Divider, Skeleton } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import AboutMe from '@/components/portfolio/AboutMe.vue'
import SkillsTable from '@/components/portfolio/SkillsTable.vue'
import ExperienceCard from '@/components/portfolio/ExperienceCard.vue'

import useExperienceStore from '@/stores/experienceStore.js'
import useSkillsStore from '@/stores/skillsStore.js'

const experienceStore = useExperienceStore()
const skillsStore = useSkillsStore()

onMounted(async () => {
  await experienceStore.fetchExperience()
})
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
        <Skeleton v-if="skillsStore.loading" active style="width: 100%" />
        <SkillsTable />
      </Col>
    </Row>

    <Divider />

    <Row>
      <Col :span="4">
        <Subtitle>Experience</Subtitle>
      </Col>

      <Col :span="20">
        <Skeleton v-if="experienceStore.loading" active style="width: 100%" />
        <ExperienceCard
          v-else
          v-for="item in experienceStore.experiences"
          :key="item.id"
          :item="item"
        />
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
