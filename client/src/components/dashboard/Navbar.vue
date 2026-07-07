<script setup lang="ts">
import { Flex, Button } from 'ant-design-vue'
import { LogoutOutlined, FileOutlined } from '@ant-design/icons-vue'

import useAuthStore from '@/stores/authStore.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function onLogout() {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <Flex id="logo-container" align="center" gap="8">
    <RouterLink to="/" id="logo">
      <h1>ukhalid<span>_dev</span></h1>
    </RouterLink>
    <p id="page-id">| Admin board</p>
  </Flex>

  <Flex gap="8">
    <Button type="text" class="dash-nav-btn" @click="router.push('/')"
      ><FileOutlined />Portfolio</Button
    >
    <Button type="text" class="dash-nav-btn" @click="onLogout"><LogoutOutlined />Logout</Button>
  </Flex>
</template>

<style scoped>
#logo-container {
  text-decoration: none;
}

#page-id {
  font: var(--body);
  color: var(--bg);
}

#logo h1 {
  font: var(--heading-md);
  letter-spacing: var(--heading-md-tracking);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--bg);
}

#logo span {
  color: var(--text-secondary);
}

.dash-nav-btn {
  color: var(--surface);
}

.dash-nav-btn:hover {
  color: var(--accent);
}
</style>
