import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { API_URL } from '@/config'

const apiUrl = import.meta.env.VITE_API_URL

const useAuthStore = defineStore('auth', () => {
  const id = ref(null)
  const email = ref(null)
  const token = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  function setUser(data) {
    id.value = data.user.id
    email.value = data.user.email
    token.value = data.token

    localStorage.setItem(
      'auth',
      JSON.stringify({
        id: id.value,
        email: email.value,
        token: token.value,
      }),
    )
  }

  async function login(formState) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
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

      setUser(data)

      return data
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  function logout() {
    id.value = null
    email.value = null
    token.value = null

    localStorage.removeItem('auth')
  }

  function hydrate() {
    const stored = localStorage.getItem('auth')

    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        id.value = parsed.id
        email.value = parsed.email
        token.value = parsed.token
      } catch (error) {
        console.error('Error hydrating auth state:', error)
        localStorage.removeItem('auth')
      }
    }
  }

  hydrate()

  return { id, email, token, isLoggedIn, setUser, login, logout }
})

export default useAuthStore
