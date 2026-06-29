<script setup lang="ts">
import { computed } from 'vue'

defineEmits(['click'])

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
})

const btnClass = computed(() =>
  props.type === 'secondary' ? 'btn btn-secondary' : 'btn btn-primary',
)
</script>

<template>
  <button :class="btnClass" @click="$emit('click')">
    <slot />
  </button>
</template>
