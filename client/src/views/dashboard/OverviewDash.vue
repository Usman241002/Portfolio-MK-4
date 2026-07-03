<script setup lang="ts">
import { ref } from 'vue'
import { Flex, Row, Col } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

import Header from '@/components/dashboard/Header.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import ProjectsTable from '@/components/dashboard/ProjectsTable.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import useProjectsStore from '@/stores/projectsStore.js'

const projectsStore = useProjectsStore()

const projects = ref(projectsStore.projects.length)
</script>

<template>
  <Header title="Overview">
    <BaseButton><PlusOutlined />New Project</BaseButton>
  </Header>

  <Flex class="dash-container" gap="24" vertical
    ><Row id="overview-container" :gutter="24">
      <Col :span="6"><StatCard title="Total Projects" :stat="projects" /></Col>
      <Col :span="6"><StatCard title="Total Clients" :stat="5" /></Col>
      <Col :span="6"><StatCard title="Total Tasks" :stat="20" /></Col>
    </Row>

    <Row>
      <Col :span="24"><ProjectsTable /></Col>
    </Row>
  </Flex>
</template>

<style scoped></style>
