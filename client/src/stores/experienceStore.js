import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { api } from '../router/fetch'
import useAuthStore from '@/stores/authStore.js'

const useExperienceStore = defineStore('experience', () => {
  const authStore = useAuthStore()
  const experiences = ref([])
  const loading = ref(false)

  async function fetchExperience() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/experience`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch experience')
      }

      experiences.value = data
      console.log(data)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function addExperience() {
    experiences.value = [
      ...experiences.value,
      {
        id: Date.now(),
        start_date: '',
        end_date: '',
        title: '',
        employment_type: '',
        company: '',
        location: '',
        description: '',
      },
    ]
  }

  async function removeExperience(id) {
    experiences.value = experiences.value.filter((exp) => exp.id !== id)
  }

  async function updateExperience() {
    try {
      loading.value = true
      const response = await api(`${API_URL}/experience`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experiences.value),
      })

      if (!response.ok) {
        throw new Error('Failed to update experience')
      }

      const data = await response.json()
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    experiences,
    fetchExperience,
    addExperience,
    removeExperience,
    updateExperience,
    loading,
  }
})

export default useExperienceStore
