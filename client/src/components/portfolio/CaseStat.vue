<script setup>
import { Flex, Row, Col } from 'ant-design-vue'

const { stat, desc } = defineProps({
  stat: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Flex
    gap="16"
    :style="{
      width: '100%',
      height: '8rem',
      backgroundColor: 'var(--hover)',
      borderLeft: '0.25rem solid var(--accent)',
      padding: '1rem',
    }"
  >
    <h1 class="stat">{{ stat }}</h1>

    <Flex :style="{ height: '100%', width: '15rem' }" align="end">
      <p>
        {{ desc }}
      </p>
    </Flex>
  </Flex>
</template>

<style scoped>
h1 {
  font: var(--heading-lg);
  letter-spacing: var(--heading-lg-tracking);
  color: var(--accent);
}

p {
  font: var(--body);
  color: var(--text-primary);
}
</style>
