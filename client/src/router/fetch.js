import router from '@/router'
import useAuthStore from '@/stores/authStore'
import { pinia } from '@/main'

export async function api(url, options = {}) {
  const response = await fetch(url, options)

  if (response.status === 401) {
    const auth = useAuthStore(pinia)

    auth.logout()
    router.push('/login')

    return
  }

  return response
}
