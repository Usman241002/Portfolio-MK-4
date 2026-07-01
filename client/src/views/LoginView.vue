<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Flex, Form, Input, Button } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'

import useAuthStore from '@/stores/authStore.js'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

type formStateObject = { email: string; password: string }

const formState: formStateObject = reactive({
  email: '',
  password: '',
})
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

      <Form :model="formState" layout="vertical" @finish="onSubmit">
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
#login-title {
  font: var(--heading-md);
}

#login-subtitle {
  font: var(--body);
}

.form-input {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 0.5rem 0.75rem;
  font: var(--body);
  color: var(--text-primary);
  transition: border-color 0.15s;
}
</style>
