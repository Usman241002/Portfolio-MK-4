import { defineStore } from 'pinia'
import { API_URL } from '@/config.js'
import { ref } from 'vue'

const useContactStore = defineStore('contact', () => {
  const loading = ref(false)
  async function sendContactForm(formState) {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      const data = await response.json()
      if (!response.ok) {
        throw Error(data.message || 'Login failed')
      }

      return data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    } finally {
      loading.value = false
    }
  }

  return { sendContactForm, loading }
})

export default useContactStore
