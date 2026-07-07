<template>
  <h1 class="subtitle">
    <span class="accent">// </span>
    <slot />
  </h1>
</template>

<style scoped>
.subtitle {
  font: var(--label);

  letter-spacing: var(--label-tracking);
  text-transform: uppercase;
  color: var(--text-secondary);
}

.accent {
  color: var(--accent);
}
</style>
