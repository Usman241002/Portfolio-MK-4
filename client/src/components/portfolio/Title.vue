<template>
  <h1 class="title">
    <span class="accent">/* </span>
    <slot />
    <span class="accent"> */</span>
  </h1>
</template>

<style scoped>
.title {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  text-transform: uppercase;
  color: var(--text-secondary);
}

.accent {
  color: var(--accent);
}
</style>
