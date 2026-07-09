<script setup>
import { Form, Input, Row, Col, Select, DatePicker } from 'ant-design-vue'

defineProps({
  education: Object,
})

const rules = {
  start_date: [
    {
      required: true,
      message: 'Please select a start date',
    },
    {
      type: 'date',
      message: 'Please select a valid start date',
    },
  ],

  end_date: [
    {
      type: 'date',
      message: 'Please select a valid end date',
    },
  ],

  title: [
    {
      required: true,
      message: 'Please enter a job title',
    },
    {
      max: 255,
      message: 'Title cannot exceed 255 characters',
    },
  ],

  company: [
    {
      required: true,
      message: 'Please enter a company name',
    },
    {
      max: 255,
      message: 'Company name cannot exceed 255 characters',
    },
  ],

  location: [
    {
      required: true,
      message: 'Please enter a location',
    },
    {
      max: 255,
      message: 'Location cannot exceed 255 characters',
    },
  ],

  description: [
    {
      max: 1000,
      message: 'Description cannot exceed 1000 characters',
    },
  ],
}
</script>

<template>
  <Form layout="vertical" :model="education" :rules="rules">
    <Row :gutter="12">
      <Col :span="6">
        <Form.Item class="form-label" name="start_date" label="Start Date">
          <DatePicker
            class="form-input"
            format="MM-YYYY"
            value-format="YYYY-MM-DD"
            v-model:value="education.start_date"
          />
        </Form.Item>
      </Col>

      <Col :span="6">
        <Form.Item class="form-label" name="end_date" label="End Date">
          <DatePicker
            class="form-input"
            format="MM-YYYY"
            value-format="YYYY-MM-DD"
            v-model:value="education.end_date"
            placeholder="Present"
          />
        </Form.Item>
      </Col>

      <Col :span="12" />

      <Col :span="12">
        <Form.Item class="form-label" name="title" label="Title">
          <Input class="form-input" v-model:value="education.title" />
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item class="form-label" name="company" label="Company">
          <Input class="form-input" v-model:value="education.company" />
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item class="form-label" name="location" label="Location">
          <Input class="form-input" v-model:value="education.location" />
        </Form.Item>
      </Col>
      <Col :span="24">
        <Form.Item class="form-label" name="description" label="Description">
          <Input.TextArea
            class="form-input"
            v-model:value="education.description"
            :style="{ height: '5rem', resize: 'none' }"
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
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
