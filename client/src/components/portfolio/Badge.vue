<template>
  <Flex class="badge">
    <span class="badge-text">
      <slot />
    </span>
  </Flex>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--hover);
  color: var(--accent);
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border);
}

.badge-text {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  font-weight: 300;
  text-transform: uppercase;
  color: var(--accent);
}
</style>
