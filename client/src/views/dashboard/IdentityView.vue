<script setup>
import { Flex, Row, Col, Button } from 'ant-design-vue'
import ProfileForm from '@/components/dashboard/ProfileForm.vue'
</script>

<template>
  <Flex class="dash-container" vertical>
    <Row :gutter="24">
      <Col class=".column" :span="2">
        <Flex vertical gap="8">
          <Flex
            align="center"
            justify="center"
            :style="{ width: '100%', height: '6rem', backgroundColor: 'var(--accent)' }"
          >
            UK
          </Flex>
          <Button>Upload </Button>
          <Button danger>Remove</Button>
        </Flex>
      </Col>
      <Col :span="1"> </Col>
      <Col :span="21">
        <ProfileForm />
      </Col>
    </Row>
  </Flex>
</template>

<style scoped>
:deep(.ant-form-item-label > label) {
  font: var(--micro);
  letter-spacing: var(--micro-tracking);
  color: var(--text-secondary);
  text-transform: uppercase;
}

.form-input {
  background: var(--bg);
}

:deep(.form-select .ant-select-selector) {
  height: 2rem !important;
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 0.75rem !important;
}

:deep(.form-select .ant-select-selection-item) {
  line-height: 2rem !important;
}

:deep(.form-select .ant-select-selection-placeholder) {
  line-height: 2rem !important;
}

:deep(.ant-form-item) {
  margin-bottom: 0.25rem;
}
</style>
