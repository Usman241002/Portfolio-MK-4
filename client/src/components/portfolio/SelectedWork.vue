<script setup>
import { Flex, Row, Col } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import useProjectsStore from "@/stores/projectsStore.js"
import { onMounted } from 'vue'

import { useRouter } from 'vue-router'

const projectsStore = useProjectsStore()
const router = useRouter()

onMounted(async () => {
  await projectsStore.getFavouriteProjects()
})
</script>

<template>
  <Flex class="container" vertical gap="24">
    <Subtitle>selected_work []</Subtitle>

    <Row :gutter="[24, 24]">
      <Col v-for="project in projectsStore.favouriteProjects" :key="project.id" :xs="24" :sm="12" :lg="8">
        <ProjectCard :project="project" />
      </Col>
    </Row>

    <Flex justify="flex-end">
      <BaseButton variant="secondary" @click="router.push('/projects')">
        View all projects
        <ArrowRightOutlined />
      </BaseButton>
    </Flex>
  </Flex>
</template>
