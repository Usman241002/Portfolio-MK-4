import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_URL } from '@/config.js'
import { api } from '../router/fetch'
import useAuthStore from '@/stores/authStore.js'

export const useProjectsStore = defineStore('projects', () => {
  const authStore = useAuthStore()
  const projects = ref([])

  const getEmptyProject = () => ({
    id: null,
    title: '',
    subtitle: '',
    client: '',
    role: '',
    year: '',
    description: '',
    status: '',
    repository_url: '',
    live_demo_url: '',
    skill_ids: [],
    cases: [],
  })

  const currentProject = ref(getEmptyProject())

  function resetCurrentProject() {
    currentProject.value = getEmptyProject()
  }

  function setCurrentProject(project) {
    currentProject.value = JSON.parse(JSON.stringify(project))
  }

  async function getAllProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch projects')
      projects.value = data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  async function getProjectById(projectId) {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch project')
      return data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  async function addProject() {
    try {
      const response = await api(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(currentProject.value),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to add project')

      projects.value.push(data.project)
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  async function updateProject() {
    try {
      const response = await api(`${API_URL}/projects/${currentProject.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(currentProject.value),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to update project')

      const index = projects.value.findIndex((p) => p.id === currentProject.value.id)
      if (index !== -1) {
        projects.value[index] = data.project
      }
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  async function deleteProject(id) {
    try {
      const response = await api(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to update project')

      projects.value = projects.value.filter((project) => project.id !== id)
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  async function saveProject() {
    if (currentProject.value.id) {
      await updateProject()
    } else {
      await addProject()
    }
    resetCurrentProject()
  }

  return {
    projects,
    currentProject,
    resetCurrentProject,
    setCurrentProject,
    getAllProjects,
    getProjectById,
    saveProject,
    deleteProject,
  }
})

export default useProjectsStore
