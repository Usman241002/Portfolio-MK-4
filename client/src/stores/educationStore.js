import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { api } from '../router/fetch'
import useAuthStore from '@/stores/authStore.js'

const useEducationStore = defineStore('education', () => {
  const authStore = useAuthStore()
  const educations = ref([])
  const loading = ref(false)

  async function fetchEducation() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/education`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch education')
      }

      educations.value = data
      console.log(data)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function addEducation() {
    educations.value = [
      ...educations.value,
      {
        id: Date.now(),
        start_date: '',
        end_date: '',
        title: '',
        company: '',
        location: '',
        description: '',
      },
    ]
  }

  async function removeEducation(id) {
    educations.value = educations.value.filter((exp) => exp.id !== id)
  }

  async function updateEducation() {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/education`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educations.value),
      })

      if (!response.ok) {
        throw new Error('Failed to update education')
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
    educations,
    fetchEducation,
    addEducation,
    removeEducation,
    updateEducation,
    loading,
  }
})

export default useEducationStore
