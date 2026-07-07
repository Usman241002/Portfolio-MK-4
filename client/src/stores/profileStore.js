import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { api } from '../router/fetch'
import useAuthStore from '@/stores/authStore.js'

const useProfileStore = defineStore('profile', () => {
  const authStore = useAuthStore()
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
      const response = await fetch(`${API_URL}/profile`, {
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
    }
  }

  async function updateProfile() {
    try {
      const response = await api(`${API_URL}/profile`, {
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
    }
  }

  return {
    profile,
    fetchProfile,
    updateProfile,
  }
})

export default useProfileStore
