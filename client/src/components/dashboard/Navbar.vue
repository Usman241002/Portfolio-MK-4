<script setup>
import { ref } from 'vue'
import { Flex, Button } from 'ant-design-vue'
import { LogoutOutlined, FileOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons-vue'

import useAuthStore from '@/stores/authStore.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Track if the mobile menu is open
const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}

const goToPortfolio = () => {
  closeMenu()
  router.push('/')
}

async function onLogout() {
  try {
    closeMenu()
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <Flex tag="header" class="navbar" justify="space-between" align="center">

    <Flex id="logo-container" align="center" gap="8">
      <RouterLink to="/" id="logo">
        <h1>ukhalid<span>_dev</span></h1>
      </RouterLink>
      <p id="page-id">| Admin board</p>
    </Flex>

    <!-- Mobile menu toggle button -->
    <button class="mobile-menu-btn" @click="isMenuOpen = !isMenuOpen">
      <MenuOutlined v-if="!isMenuOpen" />
      <CloseOutlined v-else />
    </button>

    <Flex
      class="nav-links"
      :class="{ 'is-open': isMenuOpen }"
      gap="8"
      align="center"
    >
      <Button type="text" class="dash-nav-btn" @click="goToPortfolio">
        <FileOutlined />Portfolio
      </Button>
      <Button type="text" class="dash-nav-btn" @click="onLogout">
        <LogoutOutlined />Logout
      </Button>
    </Flex>

  </Flex>
</template>

<style scoped>
.navbar {
  /* Added position relative so the dropdown menu stays attached */
  position: relative;
  padding: 1rem 0;
  gap: 1rem;
  width: 100%;
}

#logo-container {
  text-decoration: none;
}

#page-id {
  font: var(--body);
  color: var(--bg);
  margin: 0;
}

#logo {
  text-decoration: none;
}

#logo h1 {
  font: var(--heading-md);
  letter-spacing: var(--heading-md-tracking);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--bg);
  margin: 0;
}

#logo span {
  color: var(--text-secondary);
}

.dash-nav-btn {
  color: var(--surface);
}

.dash-nav-btn:hover {
  color: var(--accent);
}

/* Hide the hamburger button by default on desktop */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  /* Matching the inverted text color of the admin header */
  color: var(--bg);
  cursor: pointer;
  padding: 0.5rem;
}

.nav-links {
  /* Flex row by default on desktop */
  flex-direction: row;
}

/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    align-items: center;
    /* IMPORTANT: Change this background to whatever dark color your admin header sits on */
    background-color: var(--text-primary);
    padding: 2rem 0;
    gap: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    z-index: 50;
  }

  .nav-links.is-open {
    display: flex;
  }
}
</style>
