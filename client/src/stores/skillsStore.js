import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'

const skillsStore = defineStore('skills', () => {
  const skills = ref([])

  async function getSkills() {
    try {
      const response = await fetch(`${API_URL}/skills`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch skills')
      }

      skills.value = data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  async function addSkill(skillForm) {
    try {
      const response = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers: {
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
    }
  }

  async function deleteSkill(skillId) {
    try {
      const response = await fetch(`${API_URL}/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
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
    }
  }

  return {
    skills,
    getSkills,
    addSkill,
    deleteSkill,
  }
})

export default skillsStore
