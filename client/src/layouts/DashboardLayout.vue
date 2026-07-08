<script setup>
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'
import Navbar from '@/components/dashboard/Navbar.vue'
import SideNav from '@/components/dashboard/SideNav.vue'
</script>

<template>
  <Layout :style="{ minHeight: '100vh' }">
    <Layout.Header class="nav-container">
      <Navbar />
    </Layout.Header>
    <Layout.Sider
      :style="{
        marginTop: '3.25rem',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
      }"
    >
      <SideNav />
    </Layout.Sider>
    <Layout.Content :style="{ backgroundColor: 'var(--bg)', marginTop: '3.25rem' }">
      <RouterView />
    </Layout.Content>
  </Layout>
</template>

<style scoped>
.nav-container {
  display: flex;
  width: 100%;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  background-color: var(--text-primary);
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
