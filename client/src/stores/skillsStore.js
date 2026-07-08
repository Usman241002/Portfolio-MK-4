import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import useAuthStore from '@/stores/authStore.js'
import { api } from '../router/fetch'

const skillsStore = defineStore('skills', () => {
  const authStore = useAuthStore()

  const skills = ref([])
  const loading = ref(false)

  async function getSkills() {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/api/skills`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch skills')
      }

      skills.value = data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  async function addSkill(skillForm) {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/skills`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add skill')
      }

      console.log(data.skill)
      skills.value.push(data.skill)
      return data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  async function deleteSkill(skillId) {
    try {
      loading.value = true
      const response = await api(`${API_URL}/api/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete skill')
      }

      skills.value = skills.value.filter((skill) => skill.id !== skillId)
      return data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    skills,
    getSkills,
    addSkill,
    deleteSkill,
    loading,
  }
})

export default skillsStore
