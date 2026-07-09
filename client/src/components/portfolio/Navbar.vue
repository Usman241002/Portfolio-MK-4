<script setup>
import { ref } from 'vue'
import { Flex } from 'ant-design-vue'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons-vue'

// Track if the mobile menu is open
const isMenuOpen = ref(false)

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'Projects', href: '/projects' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
]

// Optional: Close menu when a link is clicked
const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <Flex tag="header" class="navbar" justify="space-between" align="center">

    <Flex class="logo-wrapper">
      <RouterLink to="/" id="logo">
        <h1>ukhalid<span>_dev</span></h1>
      </RouterLink>
    </Flex>

    <button class="mobile-menu-btn" @click="isMenuOpen = !isMenuOpen">
      <MenuOutlined v-if="!isMenuOpen" />
      <CloseOutlined v-else />
    </button>

    <Flex
      class="nav-links"
      :class="{ 'is-open': isMenuOpen }"
      justify="center"
    >
      <RouterLink
        v-for="link in navLinks"
        :key="link.href"
        :to="link.href"
        class="nav-link"
        exact-active-class="active"
        @click="closeMenu"
      >
        <span>./</span>{{ link.text }}
      </RouterLink>
    </Flex>

  </Flex>
</template>

<style scoped>
.navbar {
  /* Added position relative so the dropdown menu stays attached to the header */
  position: relative;
  padding: 1rem 0;
  gap: 1rem;
  width: 100%;
}

#logo {
  text-decoration: none;
}

#logo h1 {
  font: var(--heading-md);
  letter-spacing: var(--heading-md-tracking);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-primary);
  margin: 0;
}

#logo span {
  color: var(--accent);
}

/* Hide the hamburger button by default on desktop */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
}

.nav-links {
  gap: 2rem;
  /* Ensure it defaults to a row on desktop */
  flex-direction: row;
}

.nav-link {
  font: var(--body);
  text-transform: lowercase;
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.nav-link span {
  color: var(--accent);
}

.nav-link.active,
.nav-link:hover {
  color: var(--text-primary);
  font-weight: 700;
}

/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .mobile-menu-btn {
    /* Show the button on mobile */
    display: block;
  }

  .nav-links {
    /* Hide the links by default on mobile */
    display: none;

    /* Dropdown styling */
    position: absolute;
    top: 100%; /* Pushes it just below the header */
    left: 0;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff; /* IMPORTANT: Change this to your theme's background variable! */
    padding: 2rem 0;
    gap: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow */
    z-index: 50; /* Ensures it stays on top of page content */
  }

  /* When isMenuOpen is true, this class is applied to reveal the menu */
  .nav-links.is-open {
    display: flex;
  }
}
</style>
