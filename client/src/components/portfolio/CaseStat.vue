<script setup lang="ts">
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
  <Row>
    <Flex
      :style="{
        width: '100%',
        height: '8rem',
        backgroundColor: 'var(--hover)',
        borderLeft: '0.25rem solid var(--accent)',
        padding: '1rem',
      }"
    >
      <Col :span="2">
        <h1 class="stat">{{ stat }}</h1>
      </Col>
      <Col :span="4">
        <Flex :style="{ height: '100%' }" align="center">
          <p>
            {{ desc }}
          </p>
        </Flex>
      </Col>
    </Flex>
  </Row>
</template>

<style scoped>
h1 {
  font: var(--heading-lg);
  color: var(--accent);
}

p {
  font: var(--label);
  color: var(--text-primary);
}
</style>
