<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'

import Header from '@/components/dashboard/Header.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
</script>

<template>
  <Header title="Overview">
    <BaseButton><PlusOutlined />New Project</BaseButton>
  </Header>
</template>

<style scoped></style>
