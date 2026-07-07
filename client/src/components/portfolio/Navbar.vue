<script setup lang="ts">
import { Flex } from 'ant-design-vue'

interface NavLink {
  text: string
  href: string
}

const navLinks: NavLink[] = [
  { text: 'Home', href: '/' },
  { text: 'Projects', href: '/projects' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
]
</script>

<template>
  <Flex id="logo">
    <RouterLink to="/" id="logo">
      <h1>ukhalid<span>_dev</span></h1>
    </RouterLink>
  </Flex>

  <Flex class="nav-links">
    <RouterLink
      v-for="link in navLinks"
      :key="link.href"
      :to="link.href"
      class="nav-link"
      exact-active-class="active"
    >
      <span>./</span>{{ link.text }}
    </RouterLink>
  </Flex>
</template>

<style scoped>
#logo {
  text-decoration: none;
}

#logo h1 {
  font: var(--heading-md);
  letter-spacing: var(--heading-md-tracking);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-primary);
}

#logo span {
  color: var(--accent);
}

.nav-links {
  gap: 2rem;
}

.nav-link {
  font: var(--body);
  text-transform: lowercase;
  text-decoration: none;
  color: var(--text-secondary);
}

.nav-link span {
  color: var(--accent);
}

.nav-link.active {
  color: var(--text-primary);
  font-weight: 700;
}
</style>
