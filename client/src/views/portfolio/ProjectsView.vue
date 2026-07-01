<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Flex, Row, Col, Divider } from 'ant-design-vue'
import Title from '@/components/portfolio/Title.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'

import useProjectsStore from '@/stores/projectsStore.js'

const projectsStore = useProjectsStore()

onMounted(async () => {
  await projectsStore.getAllProjects()
})

const projects = projectsStore.projects

const projectCount = ref(0)
const target = projects.length

onMounted(() => {
  const duration = 1200
  const start = performance.now()

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  function animate(time: number) {
    const progress = Math.min((time - start) / duration, 1)
    const eased = easeOutCubic(progress)

    projectCount.value = Math.floor(eased * target)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      projectCount.value = target
    }
  }

  requestAnimationFrame(animate)
})
</script>

<template>
  <Flex class="container" gap="24" vertical>
    <Row>
      <Col :span="10"
        ><Flex gap="16" vertical>
          <Title>Selected work []</Title>

          <h2>
            <span>{{ projectCount }}</span
            >+ projects
          </h2>
          <h4>
            Experience working across web applications and business systems, building zero-to-one
            products, backend services, and automation tools for personal and commercial use.
          </h4>
        </Flex>
      </Col>
    </Row>
    <Divider :style="{ border: '1px solid var(--border)' }" />
    <Row :gutter="[24, 24]">
      <Col v-for="project in projects" :key="project.id" :xs="24" :sm="12" :lg="8">
        <ProjectCard type="cover" :project="project" />
      </Col>
    </Row>
  </Flex>
</template>

<style scoped>
h2 {
  color: var(--text-primary);
  font: var(--heading-lg);
}

h4 {
  color: var(--text-secondary);
  font: var(--body);
}

span {
  color: var(--accent);
}
</style>
