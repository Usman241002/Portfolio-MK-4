<script setup lang="ts">
import { computed } from 'vue'

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
  <button :class="btnClass"><slot /></button>
</template>
