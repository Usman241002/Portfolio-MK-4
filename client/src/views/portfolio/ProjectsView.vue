<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Flex, Row, Col, Divider } from 'ant-design-vue'
import Title from '@/components/portfolio/Title.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'

import { storeToRefs } from 'pinia'
import useProjectsStore from '@/stores/projectsStore.js'

const projectsStore = useProjectsStore()

onMounted(async () => {
  await projectsStore.getAllProjects()
})

const { projects } = storeToRefs(projectsStore)

const projectCount = ref(0)
const target = computed(() => projects.value.length)

watch(
  target,
  (newTarget) => {
    if (newTarget === 0) return

    const duration = 1200
    const start = performance.now()

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    function animate(time: number) {
      const progress = Math.min((time - start) / duration, 1)

      projectCount.value = Math.floor(easeOutCubic(progress) * newTarget)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        projectCount.value = newTarget
      }
    }

    requestAnimationFrame(animate)
  },
  { immediate: true },
)
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
      <Col
        v-for="project in projects"
        :key="project.id"
        :xs="24"
        :sm="12"
        :lg="8"
        style="display: flex"
      >
        <ProjectCard :project="project" type="cover" style="flex: 1; width: 100%" />
      </Col>
    </Row>
  </Flex>
</template>

<style scoped>
h2 {
  font: var(--heading-lg);
  letter-spacing: var(--heading-lg-tracking);
  color: var(--text-primary);
}

h4 {
  color: var(--text-secondary);
  font: var(--body);
}

span {
  color: var(--accent);
}
</style>
