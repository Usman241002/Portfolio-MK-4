<script setup lang="ts">
import { Flex } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

import Header from '@/components/dashboard/Header.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import ProjectsTable from '@/components/dashboard/ProjectsTable.vue'
</script>

<template>
  <Header title="Projects">
    <BaseButton><PlusOutlined />New Project</BaseButton>
  </Header>

  <Flex class="dash-container" vertical>
    <ProjectsTable />
  </Flex>
</template>
