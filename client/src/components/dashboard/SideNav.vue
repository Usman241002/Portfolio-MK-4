<script lang="ts" setup>
import { Flex } from 'ant-design-vue'
import {
  ArrowRightOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const items = [
  {
    title: 'Content',
    icon: ArrowRightOutlined,
    children: [
      { title: 'Overview', key: 1, icon: AppstoreOutlined, link: '' },
      { title: 'Projects', key: 2, icon: FolderOpenOutlined, link: 'projects' },
      { title: 'Personal Data', key: 3, icon: UserOutlined, link: 'personal' },
    ],
  },
  {
    title: 'Pages',
    icon: ArrowRightOutlined,
    children: [{ title: 'Home', key: 4, icon: HomeOutlined, link: 'home' }],
  },
  {
    title: 'System',
    icon: ArrowRightOutlined,
    children: [{ title: 'Settings', key: 7, icon: SettingOutlined, link: 'settings' }],
  },
]
const selectedKey = ref(1)

const router = useRouter()

function onClick(link: string, key: number) {
  selectedKey.value = key
  router.push(`/dashboard/${link}`)
}
</script>

<template>
  <Flex id="sidenav-container" vertical>
    <Flex v-for="item in items" :key="item.title" class="group" vertical>
      <h3>{{ item.title }}</h3>

      <Flex vertical>
        <button
          v-for="child in item.children"
          :key="child.title"
          @click="onClick(child.link, child.key)"
          :class="['sidenav-button', { active: child.key === selectedKey }]"
        >
          <component :is="child.icon" />
          <p>{{ child.title }}</p>
        </button>
      </Flex>
    </Flex>


  </Flex>
</template>

<style scoped>
#sidenav-container {
  height: 100%;
  display: flex;
}

.group {
  padding: 1rem 0 0.5rem;
}

.group:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

.group h3 {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  text-transform: uppercase;
  margin-bottom: 0.375rem;
  padding: 0 1rem;
}

.sidenav-button {
  display: flex;
  border: none;
  background: none;
  padding: 0.25rem 1rem;
  gap: 0.5rem;
  font: var(--body);
  color: var(--text-secondary);
  align-items: center;
  transition-duration: 0.1s;
}

.sidenav-button:hover {
  cursor: pointer;
  background: var(--hover);
}

.active {
  color: var(--accent);
  background: #2d6be40f;
  font-weight: bold;
}
</style>
