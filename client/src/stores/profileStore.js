import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { api } from '../router/fetch'
import useAuthStore from '@/stores/authStore.js'

const useProfileStore = defineStore('profile', () => {
  const authStore = useAuthStore()
  const loading = ref(false)
  const profile = reactive({
    name: '',
    role: '',
    location: '',
    status: 'open to work',
    email: '',
    github_url: '',
    linkedin_url: '',
  })

  async function fetchProfile() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile')
      }

      Object.assign(profile, data)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateProfile() {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    fetchProfile,
    updateProfile,
    loading,
  }
})

export default useProfileStore
