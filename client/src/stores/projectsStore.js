import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_URL } from '@/config.js'
import { api } from '../router/fetch'
import useAuthStore from '@/stores/authStore.js'

export const useProjectsStore = defineStore('projects', () => {
  const authStore = useAuthStore()
  const projects = ref([])
  const favouriteProjects = ref([])
  const loading = ref(false)

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
    thumbnail: null,
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
      loading.value = true
      const response = await fetch(`${API_URL}/api/projects`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch projects')
      projects.value = data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  async function getFavouriteProjects() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/projects/favourite`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch favourite projects')
      favouriteProjects.value = data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  async function getProjectById(projectId) {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/projects/${projectId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to fetch project')
      return data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  async function addProject() {
    try {
      loading.value = true

      const payload = { ...currentProject.value }
      delete payload.thumbnail

      const response = await api(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to add project')

      if (currentProject.value.thumbnail) {
        await uploadImage(data.project.id, currentProject.value.thumbnail, 'POST')
      }

      projects.value.push(data.project)
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  async function updateProject() {
    try {
      loading.value = true
      const payload = { ...currentProject.value }
      delete payload.thumbnail

      const response = await api(`${API_URL}/api/projects/${currentProject.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(payload), // FIXED: Send cleaned payload
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to update project')

      if (currentProject.value.thumbnail instanceof File) {
        await uploadImage(currentProject.value.id, currentProject.value.thumbnail, 'PUT')
      }

      const index = projects.value.findIndex((p) => p.id === currentProject.value.id)
      if (index !== -1) {
        projects.value[index] = data.project
      }
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  async function deleteProject(id) {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to delete project')

      projects.value = projects.value.filter((project) => project.id !== id)
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
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

  async function toggleFavourite(project) {
      try {
        loading.value = true

        const newFavouriteStatus = !project.favourite

        if (newFavouriteStatus) {
          const currentFavouriteCount = projects.value.filter((p) => p.favourite).length
          if (currentFavouriteCount >= 3) {
            throw new Error('You cannot feature more than 3 projects at a time.')
          }
        }

        const response = await api(`${API_URL}/api/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`,
          },
          body: JSON.stringify({ favourite: newFavouriteStatus })
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Failed to update favourite status')

        const index = projects.value.findIndex((p) => p.id === project.id)
        if (index !== -1) {
          projects.value[index].favourite = newFavouriteStatus
        }

        if (newFavouriteStatus) {
          favouriteProjects.value.push(projects.value[index])
        } else {
          favouriteProjects.value = favouriteProjects.value.filter(p => p.id !== project.id)
        }

      } catch (error) {
        console.error(error)
        throw Error(error.message)
      } finally {
        loading.value = false
      }
    }

  async function uploadImage(projectId, image, httpMethod = 'POST') {
    try {
      const formData = new FormData()

      formData.append('thumbnail', image)

      const response = await api(`${API_URL}/api/projects/${projectId}/thumbnail`, {
        method: httpMethod,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload thumbnail')
      }

      return data
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
      throw Error(error.message)
    }
  }

  return {
    projects,
    favouriteProjects,
    currentProject,
    resetCurrentProject,
    setCurrentProject,
    getAllProjects,
    getProjectById,
    saveProject,
    deleteProject,
    toggleFavourite,
    getFavouriteProjects,
    loading,
  }
})

export default useProjectsStore
