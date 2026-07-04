import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { API_URL } from '@/config.js'
import useAuthStore from '@/stores/authStore.js'

const useProjectsStore = defineStore('projects', () => {
  const authStore = useAuthStore()
  const projects = ref([])

  async function getAllProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch projects')
      }

      projects.value = data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  return {
    getAllProjects,
    projects,
  }
})

export default useProjectsStore
