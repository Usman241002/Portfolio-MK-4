<script setup>
import { ref, onMounted, computed } from 'vue'
import { Flex, Row, Col, Divider } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import { useRoute } from 'vue-router'
import useProjectsStore from '@/stores/projectsStore.js'
import Badge from '@/components/portfolio/Badge.vue'
import PropertiesCard from '@/components/portfolio/PropertiesCard.vue'
import dayjs from 'dayjs'
import CaseStat from '@/components/portfolio/CaseStat.vue'
import { API_URL } from '@/config.js'

const route = useRoute()
const projectsStore = useProjectsStore()

const project = ref(null)

const projectId = route.params.id

onMounted(async () => {
  project.value = await projectsStore.getProjectById(projectId)
})

const properties = computed(() => {
  if (!project.value) return []

  return [
    { name: 'client', value: project.value.client || 'N/A' },
    { name: 'role', value: project.value.role || 'N/A' },
    {
      name: 'year',
      value: project.value.year ? dayjs(project.value.year).format('YYYY') : 'N/A'
    },
    {
      name: 'stack',
      value: Array.isArray(project.value.skills)
        ? project.value.skills.map((skill) => skill.name).join(' • ')
        : '',
    },
  ]
})
</script>

<template>
  <Flex v-if="projectsStore.loading" justify="center" style="padding: 2rem;">
    <p>Loading project...</p>
    </Flex>

  <Flex v-else-if="project" gap="24" vertical>
    <Row :gutter="[24, 24]">
      <Col :xs="24" :md="16">
        <Flex gap="16" class="hero container" vertical>
          <p class="project-id">project_{{ project.id }}.tsx</p>
          <h2>{{ project.title }}</h2>
          <h5>{{ project.description }}</h5>

          <Flex gap="12" wrap="wrap">
            <Badge v-for="skill in project.skills" :key="skill.id">
              {{ skill.name }}
            </Badge>
          </Flex>
        </Flex>
      </Col>
      <Col :xs="24" :md="8">
        <Flex class="container properties-wrapper">
          <PropertiesCard>
            <Subtitle :style="{ color: 'var(--accent)' }">Properties</Subtitle>
            <Flex v-for="property in properties" :key="property.name" vertical>
              <p class="property-name">{{ property.name }}</p>
              <p class="property-value">"{{ property.value }}"</p>
            </Flex>
            <Divider :style="{ borderColor: 'var(--accent)', margin: '0' }" />
            <p class="property-name">status</p>
            <p class="property-value">"{{ project.status }}"</p>
          </PropertiesCard>
        </Flex>
      </Col>
    </Row>

    <Flex v-if="project.thumbnail" vertical>
      <Divider :style="{ border: '1px solid var(--border)' }" />
      <img :src="`${API_URL}${project.thumbnail}`" class="responsive-img" />
    </Flex>

    <div v-for="caseItem in project.cases" :key="caseItem.id">
      <Divider :style="{ border: '1px solid var(--border)' }" />
      <Row class="case container" :gutter="[24, 24]">
        <Col class="case-heading" :xs="24" :md="6">
          <Subtitle>{{ caseItem.heading }}</Subtitle>
        </Col>
        <Col :xs="24" :md="18">
          <Flex gap="24" vertical>
            <h5>{{ caseItem.heading }}</h5>
            <p>
              {{ caseItem.description }}
            </p>
            <CaseStat :stat="caseItem.stat" :desc="caseItem.stat_description" />
          </Flex>
        </Col>
      </Row>
    </div>
  </Flex>

  <Flex v-else justify="center" style="padding: 2rem;">
    <p>Project not found.</p>
  </Flex>
</template>

<style scoped>
.hero h2 {
  font: var(--heading-lg);
  letter-spacing: var(--heading-lg-tracking);
  color: var(--text-primary);
}

.hero h5 {
  font: var(--body);
  color: var(--text-secondary);
}

.property-name {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  color: var(--text-secondary);
  text-transform: lowercase;
}

.property-value {
  font: var(--body);
  color: var(--text-primary);
  font-weight: 700;
}

.case h5 {
  font: var(--heading-md);
  letter-spacing: var(--heading-md-tracking);
  color: var(--text-primary);
}

.case p {
  font: var(--body);
  color: var(--text-secondary);
}

.case-heading {
  position: sticky;
  top: 5rem;
  align-self: flex-start;
  height: fit-content;
  z-index: 2;
  background: var(--background);
  padding-bottom: 0.5rem;
}

/* --- New Responsive Styles --- */

/* Ensures the image scales down correctly without breaking its container */
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Aligns the properties card to the left on mobile, and right on desktop */
.properties-wrapper {
  justify-content: flex-start;
  width: 100%;
}

@media (min-width: 768px) {
  .properties-wrapper {
    justify-content: flex-end;
  }
}
</style>
