<script setup lang="ts">
import { Form, Input, Row, Col, Select, DatePicker } from 'ant-design-vue'

defineProps({
  experience: Object,
})
</script>

<template>
  <Form layout="vertical">
    <Row :gutter="12">
      <Col :span="6">
        <Form.Item class="form-label" label="Start Date">
          <DatePicker
            class="form-input"
            format="MM-YYYY"
            value-format="YYYY-MM-DD"
            v-model:value="experience.start_date"
          />
        </Form.Item>
      </Col>

      <Col :span="6">
        <Form.Item class="form-label" label="End Date">
          <DatePicker
            class="form-input"
            format="MM-YYYY"
            value-format="YYYY-MM-DD"
            v-model:value="experience.end_date"
            placeholder="Present"
          />
        </Form.Item>
      </Col>

      <Col :span="12" />

      <Col :span="12">
        <Form.Item class="form-label" label="Title">
          <Input class="form-input" v-model:value="experience.title" />
        </Form.Item>
      </Col>

      <Col :span="12">
        <Form.Item class="form-label" label="Employment Type">
          <Select
            v-model:value="experience.employment_type"
            class="form-select"
            :options="[
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'internship', label: 'Internship' },
              { value: 'contract', label: 'Contract' },
              { value: 'freelance', label: 'Freelance' },
            ]"
          />
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item class="form-label" label="Company">
          <Input class="form-input" v-model:value="experience.company" />
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item class="form-label" label="Location">
          <Input class="form-input" v-model:value="experience.location" />
        </Form.Item>
      </Col>
      <Col :span="24">
        <Form.Item class="form-label" label="Description">
          <Input.TextArea
            class="form-input"
            v-model:value="experience.description"
            :style="{ height: '5rem' }"
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</template>

<style scoped></style>
