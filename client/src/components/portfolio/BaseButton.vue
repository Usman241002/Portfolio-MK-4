<script setup>
import { computed, useAttrs } from 'vue'

defineEmits(['click'])

const attrs = useAttrs()

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
})

const btnClass = computed(() =>
  props.variant === 'secondary' ? 'btn btn-secondary' : 'btn btn-primary',
)
</script>

<template>
  <button v-bind="attrs" :class="btnClass" @click="$emit('click')">
    <slot />
  </button>
</template>
