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

const route = useRoute()
const projectsStore = useProjectsStore()

let project = ref(null)

const projectId = route.params.id

onMounted(async () => {
  project.value = await projectsStore.getProjectById(projectId)
  console.log(project.value)
})

const properties = computed(() => [
  { name: 'client', value: project.value.client },
  { name: 'role', value: project.value.role },
  { name: 'year', value: dayjs(project.value.year).format('YYYY') },
  {
    name: 'stack',
    value: project.value.skills?.map((skill) => skill.name).join(' • ') ?? '',
  },
])
</script>

<template>
  <Flex v-if="project" gap="24" vertical>
    <Row>
      <Col :span="16">
        <Flex gap="16" class="hero container" vertical>
          <p class="project-id">project_{{ project.id }}.tsx</p>
          <h2>{{ project.title }}</h2>
          <h5>{{ project.description }}</h5>

          <Flex gap="12">
            <Badge v-for="skill in project.skills" :key="skill.id">
              {{ skill.name }}
            </Badge>
          </Flex>
        </Flex>
      </Col>
      <Col :span="8">
        <Flex justify="end" class="container">
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

    <Flex v-if="project.thumbnail">
      <Divider :style="{ border: '1px solid var(--border)' }" />
      <img :src="`http://localhost:3000${project.thumbnail}`" />
    </Flex>

    <Row v-for="caseItem in project.cases" :key="caseItem.id">
      <Divider :style="{ border: '1px solid var(--border)' }" />
      <Flex class="case container" :style="{ width: '100%' }">
        <Col class="case-heading" :span="6">
          <Subtitle>{{ caseItem.heading }}</Subtitle>
        </Col>
        <Col :span="18">
          <Flex gap="24" vertical>
            <h5>{{ caseItem.heading }}</h5>
            <p>
              {{ caseItem.description }}
            </p>
            <CaseStat :stat="caseItem.stat" :desc="caseItem.stat_description" />
          </Flex>
        </Col>
      </Flex>
    </Row>
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
</style>
