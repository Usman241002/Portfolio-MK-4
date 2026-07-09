<script setup>
import { ref, onMounted } from 'vue'
import { Flex, Button } from 'ant-design-vue'
import { EditOutlined, CloseOutlined, StarOutlined, StarFilled } from '@ant-design/icons-vue'
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
  selectedProject.value = project // Fix: Assign the selected project to the ref
  isModalVisible.value = true
}

async function onDelete(id) {
  await projectsStore.deleteProject(id)
}

async function onFavourite(project) {
  await projectsStore.toggleFavourite(project)
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
                type="text"
                shape="circle"
                ghost
              >
                <EditOutlined />
              </Button>
              <Button
                @click="onDelete(project.id)"
                type="text"
                shape="circle"
                ghost
                danger
              >
                <CloseOutlined />
              </Button>
              <Button
                @click="onFavourite(project)"
                type="text"
                shape="circle"
                :style="{color: '#F5A623'}"
                ghost
              >
                <!-- Fix: Use v-if/v-else instead of JSX interpolation -->
                <StarFilled v-if="project.favourite" />
                <StarOutlined v-else />
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
