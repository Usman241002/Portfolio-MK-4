<script setup lang="ts">
import { Flex } from 'ant-design-vue'
</script>

<template>
  <Flex id="logo-container" align="center" gap="8">
    <RouterLink to="/" id="logo">
      <h1>ukhalid<span>_dev</span></h1>
    </RouterLink>
    <p id="page-id">| Admin board</p>
  </Flex>
</template>

<style scoped>
#logo-container {
  text-decoration: none;
}

#page-id {
  font: var(--body);
  color: var(--bg);
}

#logo h1 {
  font: var(--heading-md);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--bg);
}

#logo span {
  color: var(--text-secondary);
}
</style>
