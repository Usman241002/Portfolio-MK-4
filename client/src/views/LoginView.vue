<script setup>
import { ref, reactive } from 'vue'
import { Flex, Form, Input, Button, message } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'

import useAuthStore from '@/stores/authStore.js'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const formState = reactive({
  email: '',
  password: '',
})

const rules = {
  email: [
    { required: true, message: 'Please enter your email address' },
    { min: 10, message: 'Email must be at least 10 characters' },
    { type: 'email', message: 'Please enter a valid email' },
  ],
  password: [
    { required: true, message: 'Please enter your password' },
    { min: 8, message: 'Password must be at least 8 characters' },
  ],
}
const passwordVisible = ref(false)

async function onSubmit(formState) {
  try {
    await auth.login(formState)
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <Flex justify="center" align="center" :style="{ minHeight: '100vh' }" vertical>
    <Flex
      class="container"
      :style="{ minWidth: '25rem', backgroundColor: 'var(--surface)' }"
      vertical
    >
      <Flex justify="center" align="center" vertical>
        <h1 id="login-title">Welcome Back</h1>
        <h3 id="login-subtitle">Sign in to continue</h3>
      </Flex>

      <Form id="login-form" :model="formState" :rules="rules" layout="vertical" @finish="onSubmit">
        <Form.Item name="email" class="form-label" label="Email:">
          <Input
            class="form-input"
            placeholder="Enter your email"
            v-model:value="formState.email"
          />
        </Form.Item>

        <Form.Item name="password" class="form-label" label="Password:">
          <Input.Password
            class="form-input"
            placeholder="Type your password"
            v-model:value="formState.password"
            v-model:visible="passwordVisible"
          />
        </Form.Item>

        <Button type="primary" :style="{ width: '100%' }" html-type="submit">
          Login <ArrowRightOutlined />
        </Button>
      </Form>
    </Flex>
  </Flex>
</template>

<style scoped>
#login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#login-title {
  font: var(--heading-md);
  letter-spacing: var(--heading-md-tracking);
}

#login-subtitle {
  font: var(--body);
}

:deep(.ant-form-item-label > label) {
  font: var(--micro);
  letter-spacing: var(--micro-tracking);
  color: var(--text-secondary);
  text-transform: uppercase;
}

.form-input {
  width: 100%;
  height: 2rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 0.5rem 0.75rem;
  font: var(--body);
  color: var(--text-primary);
  transition: border-color 0.15s;
}

:deep(.ant-form-item) {
  margin-bottom: 0.25rem;
}
</style>
