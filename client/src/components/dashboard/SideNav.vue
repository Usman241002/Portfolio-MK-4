<script lang="ts" setup>
import { ref } from 'vue'

import { Flex } from 'ant-design-vue'
import {
  ArrowRightOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
  UserOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'

const items = [
  {
    title: 'Content',
    icon: ArrowRightOutlined,
    children: [
      { title: 'Overview', key: 1, icon: AppstoreOutlined },
      { title: 'Projects', key: 2, icon: FolderOpenOutlined },
      { title: 'Personal Data', key: 3, icon: UserOutlined },
    ],
  },
  {
    title: 'Pages',
    icon: ArrowRightOutlined,
    children: [
      { title: 'Home', key: 4, icon: HomeOutlined },
      { title: 'About', key: 5, icon: InfoCircleOutlined },
      { title: 'Contact', key: 6, icon: MailOutlined },
    ],
  },
  {
    title: 'System',
    icon: ArrowRightOutlined,
    children: [{ title: 'Settings', key: 7, icon: SettingOutlined }],
  },
]
const selectedKey = ref(1)

function onClick(key: number) {
  selectedKey.value = key
  console.log('Changing Key into ', key)
}
</script>

<template>
  <Flex id="sidenav-container " vertical>
    <Flex v-for="item in items" :key="item.title" class="group" vertical>
      <h3>{{ item.title }}</h3>

      <Flex vertical>
        <btn
          v-for="child in item.children"
          :key="child.title"
          @click="onClick(child.key)"
          :class="['sidenav-button', { active: child.key === selectedKey }]"
        >
          <component :is="child.icon" />
          <p>{{ child.title }}</p>
        </btn>
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
