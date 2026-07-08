<script setup>
import { ref, onMounted } from 'vue'
import { Flex, Button } from 'ant-design-vue'
import { EditOutlined, CloseOutlined } from '@ant-design/icons-vue'
import useProjectsStore from '@/stores/projectsStore.js'
import dayjs from 'dayjs'

import ProjectModal from './ProjectModal.vue'

const projectsStore = useProjectsStore()

const isModalVisible = ref(false)
const selectedProject = ref(null)

onMounted(async () => {
  await projectsStore.getAllProjects()
})

const openEditModal = (project) => {
  projectsStore.setCurrentProject(project)
  isModalVisible.value = true
}

async function onDelete(id) {
  await projectsStore.deleteProject(id)
}
</script>

<template>
  <Flex vertical>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Project</th>
          <th>Year</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projectsStore.projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>{{ dayjs(project.year).format('YYYY') }}</td>
          <td>{{ project.status }}</td>
          <td>
            <Flex gap="8">
              <Button
                @click="openEditModal(project)"
                :style="{ borderRadius: '0' }"
                type="primary"
                ghost
              >
                <EditOutlined />
              </Button>
              <Button
                @click="onDelete(project.id)"
                :style="{ borderRadius: '0' }"
                type="primary"
                ghost
                danger
              >
                <CloseOutlined />
              </Button>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <ProjectModal v-model:modalVisible="isModalVisible" :project="selectedProject" />
  </Flex>
</template>

<style scoped>
table {
  width: 100%;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

th {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  text-transform: uppercase;
}

td {
  font: var(--body);
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: var(--hover);
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>
