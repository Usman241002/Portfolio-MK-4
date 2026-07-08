<script setup>
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'
import Navbar from '@/components/portfolio/Navbar.vue'
</script>

<template>
  <Layout :style="{ minHeight: '100vh' }">
    <Layout.Header class="nav-container">
      <Navbar />
    </Layout.Header>
    <Layout.Content
      class="container"
      :style="{ backgroundColor: 'var(--bg)', marginTop: '3.25rem' }"
    >
      <RouterView />
    </Layout.Content>
    <Layout.Footer
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg)',
        height: '3.25rem',
        borderTop: '1px solid var(--border)',
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
  width: 100%;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  height: 3.25rem;
  border-bottom: 1px solid var(--border);
  z-index: 1000;
}

.footer {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  text-align: center;
  text-transform: uppercase;
  color: var(--text-secondary);
}
</style>
