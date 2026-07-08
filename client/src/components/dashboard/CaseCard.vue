<script setup>
import { Form, Input, Row, Col, Button } from 'ant-design-vue'

defineProps({
  caseItem: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <Row :gutter="12">
    <Col :span="24">
      <Form.Item class="form-label" label="Heading">
        <Input class="form-input" v-model:value="caseItem.heading" />
      </Form.Item>
    </Col>

    <Col :span="24">
      <Form.Item class="form-label" label="Subheading">
        <Input class="form-input" v-model:value="caseItem.subheading" />
      </Form.Item>
    </Col>

    <Col :span="24">
      <Form.Item class="form-label" label="Body Paragraph(s)">
        <Input.TextArea
          class="form-input"
          :style="{ height: '5rem', resize: 'none' }"
          v-model:value="caseItem.description"
        />
      </Form.Item>
    </Col>
    <Col :span="12">
      <Form.Item class="form-label" label="Stat">
        <Input class="form-input" v-model:value="caseItem.stat" />
      </Form.Item>
    </Col>
    <Col :span="12">
      <Form.Item class="form-label" label="Stat Description">
        <Input class="form-input" v-model:value="caseItem.stat_description" />
      </Form.Item>
    </Col>
  </Row>
</template>

<style scoped>
:deep(.ant-form-item-label > label) {
  font: var(--micro);
  letter-spacing: var(--micro-tracking);
  color: var(--text-secondary);
  text-transform: uppercase;
}

.form-input {
  background: var(--surface);
}

:deep(.form-select .ant-select-selector) {
  height: 2rem !important;
  background: var(--bg) !important;
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
