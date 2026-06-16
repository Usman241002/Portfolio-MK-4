<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Layout :style="{ minHeight: '100vh' }">
    <Layout.Header class="nav-container">
      <Navbar />
    </Layout.Header>
    <Layout.Content>
      <RouterView />
    </Layout.Content>
    <Layout.Footer
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg)',
        height: '3.25rem',
      }"
    >
      <p class="footer">
        Usman Khalid. All rights reserved. | Designed and developed by Usman Khalid
      </p>
    </Layout.Footer>
  </Layout>
</template>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  height: 3.25rem;
  border-bottom: 1px solid var(--border);
}

.footer {
  font: var(--label);
  text-align: center;
  text-transform: uppercase;
  color: var(--text-secondary);
}
</style>
