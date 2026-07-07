import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { API_URL } from '@/config'

const apiUrl = import.meta.env.VITE_API_URL

const useAuthStore = defineStore('auth', () => {
  const token = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  function setUser(data) {
    token.value = data.token

    localStorage.setItem(
      'auth',
      JSON.stringify({
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

  async function verifyToken() {
    try {
      console.log('TRIGGER')
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (!response.ok) {
        throw new Error('Invalid token')
      }
    } catch (error) {
      console.error(error)
      throw Error(error.message)
    }
  }

  function logout() {
    token.value = null

    localStorage.removeItem('auth')
  }

  function hydrate() {
    const stored = localStorage.getItem('auth')

    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        token.value = parsed.token
      } catch (error) {
        console.error('Error hydrating auth state:', error)
        localStorage.removeItem('auth')
      }
    }
  }

  hydrate()

  return { token, isLoggedIn, setUser, login, verifyToken, logout }
})

export default useAuthStore
