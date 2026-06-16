<script setup lang="ts">
import { Flex } from 'ant-design-vue'

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'Projects', href: '/projects' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
]
</script>

<template>
  <Flex id="logo">
    <h1 id="logo">ukhalid<span>_dev</span></h1>
  </Flex>
  <Flex class="nav-links">
    <a v-for="link in navLinks" :href="link.href"><span>./</span>{{ link.text }}</a>
  </Flex>
</template>

<style scoped>
#logo {
  font: var(--heading-md);
  font-weight: 700;
  text-transform: uppercase;
}

#logo span {
  color: var(--accent);
}

.nav-links {
  gap: 2rem;
}

.nav-links a {
  font: var(--body);
  text-transform: lowercase;
  text-decoration: none;
  color: var(--text-secondary);
}

.nav-links a span {
  color: var(--accent);
}
</style>
