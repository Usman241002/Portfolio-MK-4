<script setup lang="ts">
import { ref } from 'vue'
import { Flex } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

import Header from '@/components/dashboard/Header.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import ProjectsTable from '@/components/dashboard/ProjectsTable.vue'
import ProjectModal from '@/components/dashboard/ProjectModal.vue'

import useProjectsStore from '@/stores/projectsStore.js'

const projectsStore = useProjectsStore()

const isModalVisible = ref(false)
const openCreateModal = () => {
  projectsStore.resetCurrentProject() // Ensure form is empty
  isModalVisible.value = true // Show the modal
}
</script>

<template>
  <Header title="Projects">
    <BaseButton @click="openCreateModal"><PlusOutlined />New Project</BaseButton>
  </Header>

  <Flex class="dash-container" vertical>
    <ProjectsTable />
  </Flex>

  <ProjectModal v-model:modalVisible="isModalVisible" />
</template>
