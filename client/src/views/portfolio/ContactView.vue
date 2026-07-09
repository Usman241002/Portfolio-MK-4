<script setup>
import { computed, onMounted, reactive } from 'vue'
import { Row, Col, Flex, Form, Input, Divider } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import Title from '@/components/portfolio/Title.vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import PropertiesCard from '@/components/portfolio/PropertiesCard.vue'

import useProfileStore from '@/stores/profileStore.js'
import useContactStore from '@/stores/contactStore.js'

const profileStore = useProfileStore()
const contactStore = useContactStore()

onMounted(async () => {
  await profileStore.fetchProfile()
})

const contactFormState = reactive({
  name: '',
  email: '',
  message: '',
})

const rules = {
  name: [
    { required: true, message: 'Please enter your full name' },
    { min: 4, message: 'Name must be more than 4 characters' },
    { max: 20, message: 'Too many characters!' },
  ],
  email: [
    { required: true, message: 'Please enter your email' },
    {
      type: 'email',
      message: 'Please enter a valid email',
    },
    { max: 100, message: 'Too many characters!' },
  ],
  message: [
    { required: true, message: 'Please enter your message' },
    {
      max: 1000,
      message: 'Too many characters!',
    },
  ],
}

const properties = computed(() => [
  { name: 'email', value: profileStore.profile.email },
  { name: 'availability', value: profileStore.profile.status },
  { name: 'location', value: profileStore.profile.location },
  { name: 'response_time', value: '~24 hours' },
])

async function onSubmit() {
  await contactStore.sendContactForm(contactFormState)
  contactFormState.name = ''
  contactFormState.email = ''
  contactFormState.message = ''
}
</script>

<template>
  <Row>
    <Col :xs="24"  :lg="16">
      <Flex class="container" gap="24" vertical>
        <Flex gap="16" vertical>
          <Title>Selected work []</Title>

          <h2>Lets build something.</h2>
        </Flex>
        <Form :model="contactFormState" :rules="rules" @finish="onSubmit" layout="vertical">
          <Form.Item class="form-label" name="name" label="Full Name:">
            <Input
              class="form-input"
              placeholder="Your name"
              v-model:value="contactFormState.name"
            />
          </Form.Item>
          <Form.Item class="form-label" name="email" label="Email:">
            <Input
              class="form-input"
              placeholder="hello@you.com"
              v-model:value="contactFormState.email"
            />
          </Form.Item>
          <Form.Item class="form-label" name="message" label="Message:">
            <Input.TextArea
              class="form-input"
              :style="{ height: '10rem', resize: 'none' }"
              placeholder="Tell me about the project..."
              v-model:value="contactFormState.message"
            />
          </Form.Item>

          <BaseButton :style="{ width: '100%' }" @click="onSubmit"
            >Send Message <ArrowRightOutlined
          /></BaseButton>
        </Form> </Flex
    ></Col>
    <Col :xs="24"  :lg="8">
      <Flex class="container" align="end" gap="16" vertical>
        <PropertiesCard>
          <Subtitle :style="{ color: 'var(--accent)' }">Properties</Subtitle>
          <Flex v-for="property in properties" :key="property.name" vertical>
            <p class="property-name">{{ property.name }}</p>
            <p class="property-value">"{{ property.value }}"</p>
          </Flex>
          <Divider :style="{ borderColor: 'var(--accent)', margin: '0' }" />
          <Flex vertical>
            <p class="property-name">Links</p>
            <a
              :href="profileStore.profile.github_url"
              class="property-value"
              :style="{ color: 'var(--accent)' }"
              >./github</a
            ><a
              :href="profileStore.profile.linkedin_url"
              class="property-value"
              :style="{ color: 'var(--accent)' }"
              >./linkedin</a
            ><a href="/" class="property-value" :style="{ color: 'var(--accent)' }">./read.cv</a>
          </Flex>
        </PropertiesCard>
      </Flex>
    </Col>
  </Row>
</template>

<style scoped>
h2 {
  font: var(--heading-lg);
  letter-spacing: var(--heading-lg-tracking);
  color: var(--text-primary);
}

.property-name {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  letter-spacing: var(--label-tracking);
  color: var(--text-secondary);
  text-transform: lowercase;
}

.property-value {
  font: var(--body);
  color: var(--text-primary);
  font-weight: 700;
}
</style>
