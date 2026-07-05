import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_URL } from '@/config.js'

const useContactStore = defineStore('contact', () => {
  async function sendContactForm(formState) {
    try {
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
    }
  }

  return { sendContactForm }
})

export default useContactStore
