<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu } from 'ant-design-vue'

import Header from '@/components/dashboard/Header.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'

import SkillsView from './SkillsView.vue'
import IdentityView from './IdentityView.vue'
import TimelineView from './TimelineView.vue'

import useProfileStore from '@/stores/profileStore.js'

const profileStore = useProfileStore()

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
    label: 'Timeline',
    key: '3',
  },
]

const views = {
  '1': IdentityView,
  '2': SkillsView,
  '3': TimelineView,
}

const activeComponent = computed(() => views[current.value[0]])

async function onSave() {
  await profileStore.updateProfile()
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
      font: 'var(--body)',
      lineHeight: '2.5rem',
    }"
  />

  <component :is="activeComponent" />
</template>

<style scoped></style>
