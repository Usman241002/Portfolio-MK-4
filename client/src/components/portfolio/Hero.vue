<script setup>
import { computed, onMounted } from 'vue'
import { Flex, Row, Col, Divider } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import Title from '@/components/portfolio/Title.vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import StatCard from '@/components/portfolio/StatCard.vue'
import PropertiesCard from '@/components/portfolio/PropertiesCard.vue'
import Cursor from '@/components/portfolio/Cursor.vue'

import useProfileStore from '@/stores/profileStore'
import useProjectsStore from '@/stores/projectsStore'

import { useRouter } from 'vue-router'

const profileStore = useProfileStore()
const projectsStore = useProjectsStore()

const router = useRouter()

onMounted(async () => {
  await profileStore.fetchProfile()
  await projectsStore.getAllProjects()
})

const properties = computed(() => [
  { name: 'Name', value: profileStore.profile.name },
  { name: 'Role', value: profileStore.profile.role },
  { name: 'Location', value: profileStore.profile.location },
])

const phrases = [
  'Frontend Builder.',
  'Backend Developer.',
  'The person who reads the docs.',
  'API Designer.',
  'Thats Full Stack, baby.',
  'Figma sucks.',
]
</script>

<template>
  <Row>
    <Col :span="14">
      <Flex class="container" gap="24" vertical>
        <Title>Full stack developer</Title>
        <h1 class="hero">
          Systems<br />
          thinker.<br />
          <span>Pixel</span><br />
          finisher.
        </h1>
        <Cursor :phrases="phrases" />
        <Flex gap="16">
          <BaseButton @click="router.push('/contact')"
            >Get in touch <ArrowRightOutlined
          /></BaseButton>
          <BaseButton variant="secondary">View CV</BaseButton>
        </Flex>
      </Flex>
    </Col>
    <Col :span="4" />
    <Col :span="6"
      ><Flex class="container" align="end" gap="16" vertical>
        <StatCard :title="projectsStore.projects.length" desc="total projects" /><StatCard
          title="4yr"
          desc="programming experience"
        /><PropertiesCard>
          <Subtitle :style="{ color: 'var(--accent)' }">Properties</Subtitle>
          <Flex v-for="property in properties" :key="property.name" vertical>
            <p class="property-name">{{ property.name }}</p>
            <p class="property-value">"{{ property.value }}"</p>
          </Flex>
          <Divider :style="{ borderColor: 'var(--accent)', margin: '0' }" />
          <Flex vertical>
            <p class="property-name">Status</p>
            <p class="property-value" :style="{ color: 'var(--accent)' }">
              "{{ profileStore.profile.status }}"
            </p>
          </Flex>
          <BaseButton @click="router.push('/contact')"
            >Get in touch <ArrowRightOutlined
          /></BaseButton>
        </PropertiesCard> </Flex
    ></Col>
  </Row>
</template>

<style>
.hero {
  font: var(--display-xl);
  letter-spacing: var(--display-xl-tracking);
  color: var(--text-primary);
}

.hero span {
  color: var(--accent);
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
</style>
