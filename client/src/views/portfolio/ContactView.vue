<script setup lang="ts">
import { Row, Col, Flex, Form, Input, Textarea, Divider } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import Title from '@/components/portfolio/Title.vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import PropertiesCard from '@/components/portfolio/PropertiesCard.vue'

const properties = [
  { name: 'email', value: '"ukhalid428@gmail.com"' },
  { name: 'availability', value: '"open to projects"' },
  { name: 'Location', value: '"Birmingham, UK"' },
  { name: 'response_time', value: '"~24 hours"' },
]
</script>

<template>
  <Row>
    <Col span="16">
      <Flex class="container" gap="24" vertical>
        <Flex gap="16" vertical>
          <Title>Selected work []</Title>

          <h2>Lets build something.</h2>
        </Flex>
        <Form layout="vertical">
          <Form.Item class="form-label" label="Full Name:">
            <Input class="form-input" placeholder="Your name" />
          </Form.Item>
          <Form.Item class="form-label" label="Email:">
            <Input class="form-input" placeholder="hello@you.com" />
          </Form.Item>
          <Form.Item class="form-label" label="Message:">
            <Input.TextArea
              class="form-input"
              :style="{ height: '10rem' }"
              placeholder="Tell me about the project..."
            />
          </Form.Item>

          <BaseButton :style="{ width: '100%' }">Send Message <ArrowRightOutlined /></BaseButton>
        </Form> </Flex
    ></Col>
    <Col :span="8">
      <Flex class="container" align="end" gap="16" vertical>
        <PropertiesCard>
          <Subtitle :style="{ color: 'var(--accent)' }">Properties</Subtitle>
          <Flex v-for="property in properties" :key="property.name" vertical>
            <p class="property-name">{{ property.name }}</p>
            <p class="property-value">{{ property.value }}</p>
          </Flex>
          <Divider :style="{ borderColor: 'var(--accent)', margin: '0' }" />
          <Flex vertical>
            <p class="property-name">Links</p>
            <a href="/" class="property-value" :style="{ color: 'var(--accent)' }">./github</a
            ><a href="/" class="property-value" :style="{ color: 'var(--accent)' }">./linkedin</a
            ><a href="/" class="property-value" :style="{ color: 'var(--accent)' }">./read.cv</a>
          </Flex>
        </PropertiesCard>
      </Flex>
    </Col>
  </Row>
</template>

<style scoped>
h2 {
  color: var(--text-primary);
  font: var(--heading-lg);
}

.property-name {
  font: var(--label);
  color: var(--text-secondary);
  text-transform: lowercase;
}

.property-value {
  font: var(--body);
  color: var(--text-primary);
  font-weight: 700;
}
</style>
