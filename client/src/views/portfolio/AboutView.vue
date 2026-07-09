<script setup>
import { onMounted } from 'vue'

import { Flex, Row, Col, Divider, Skeleton } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import AboutMe from '@/components/portfolio/AboutMe.vue'
import SkillsTable from '@/components/portfolio/SkillsTable.vue'
import ExperienceCard from '@/components/portfolio/ExperienceCard.vue'
import EducationCard from '@/components/portfolio/EducationCard.vue'

import useExperienceStore from '@/stores/experienceStore.js'
import useSkillsStore from '@/stores/skillsStore.js'
import useEducationStore from '@/stores/educationStore.js'

const experienceStore = useExperienceStore()
const skillsStore = useSkillsStore()
const educationStore = useEducationStore()


onMounted(async () => {
  await experienceStore.fetchExperience()
  await educationStore.fetchEducation()
})
</script>

<template>
  <Flex class="container" gap="24" vertical>
    <Row :gutter="[0, 24]">
      <Col :xs="24" :lg="12">
        <Flex class="temp-rect" />
      </Col>
      <Col :xs="24" :lg="12">
        <AboutMe />
      </Col>
    </Row>

    <Divider :style="{ border: '1px solid var(--border)' }" />

    <Row :gutter="[0, 24]">
      <Col :xs="24" :md="4">
        <Subtitle>Skills</Subtitle>
      </Col>
      <Col :xs="24" :md="20">
        <Skeleton v-if="skillsStore.loading" active style="width: 100%" />
        <SkillsTable />
      </Col>
    </Row>

    <Divider :style="{ border: '1px solid var(--border)' }" />

    <Row :gutter="[0, 24]">
      <Col :xs="24" :md="4">
        <Subtitle>Experience</Subtitle>
      </Col>

      <Col :xs="24" :md="20">
        <Skeleton v-if="experienceStore.loading" active style="width: 100%" />
        <ExperienceCard
          v-else
          v-for="item in experienceStore.experiences"
          :key="item.id"
          :item="item"
        />
      </Col>
    </Row>

    <Divider :style="{ border: '1px solid var(--border)' }" />

    <Row>
      <Col :xs="24" :md="4">
        <Subtitle>Education</Subtitle>
      </Col>

      <Col :xs="24" :md="20">
        <Skeleton v-if="educationStore.loading" active style="width: 100%" />
        <EducationCard
          v-else
          v-for="item in educationStore.educations"
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
