<script setup>
import { ref, computed } from 'vue'
import { Menu } from 'ant-design-vue'

import Header from '@/components/dashboard/Header.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'

import SkillsView from './SkillsView.vue'
import IdentityView from './IdentityView.vue'
import ExperienceView from './ExperienceView.vue'
import EducationView from './EducationView.vue'


import useProfileStore from '@/stores/profileStore.js'
import useExperienceStore from '@/stores/experienceStore.js'
import useEducationStore from '@/stores/educationStore.js'


const profileStore = useProfileStore()
const experienceStore = useExperienceStore()
const educationStore = useEducationStore()

const current = ref(['1'])

const items = [
  {
    label: 'Identity',
    key: '1',
  },
  {
    label: 'Skills',
    key: '2',
  },
  {
    label: 'Experience',
    key: '3',
  },
  {
    label: 'Education',
    key: '4',
  },
]

const views = {
  '1': IdentityView,
  '2': SkillsView,
  '3': ExperienceView,
  '4': EducationView,
}

const activeComponent = computed(() => views[current.value[0]])

async function onSave() {
  await profileStore.updateProfile()
  await experienceStore.updateExperience()
  await educationStore.updateEducation()
}
</script>

<template>
  <Header title="Personal Data">
    <BaseButton @click="onSave">Save Changes</BaseButton>
  </Header>

  <Menu
    v-model:selectedKeys="current"
    mode="horizontal"
    :items="items"
    :style="{
      width: '100%',
      padding: '0  var(--space-md)',
      border: '1px solid var(--border)',
      textTransform: 'uppercase',
      font: 'var(--label)',
      letterSpacing: 'var(--label-tracking)',
      lineHeight: '2.5rem',
    }"
  />

  <component :is="activeComponent" />
</template>

<style scoped></style>
