<script setup>
import { Flex, Row, Col } from 'ant-design-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'

import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <Row class="container" :gutter="[0, 24]"  >
    <Col :xs="24" :md="4" >
      <Subtitle>About</Subtitle>
    </Col>
    <Col :xs="24" :md="20">
      <Flex gap="24" vertical>
        <p class="about-body">
          I’m a <b>full-stack software developer</b> based in Birmingham focused on closing the gap
          between how software is designed and how it’s actually built. I spend most of my time
          turning ideas into working systems, from early-stage concepts to production-ready
          applications. <br /><br />
          My experience spans web applications and business systems, with a strong focus on building
          reliable backend services, scalable full-stack products, and practical automation tools. I
          bring an engineering mindset to design discussions and a product-focused approach to
          development.
        </p>

        <Flex gap="16">
          <BaseButton @click="router.push('/about')">Read more</BaseButton>
          <BaseButton variant="secondary" @click="router.push('/contact')">Say Hello</BaseButton>
        </Flex></Flex
      >
    </Col>
  </Row>
</template>

<style>
.about-body {
  font: var(--body);
  font-size: 1.125rem;
  color: var(--text-primary);
}

b {
  font-weight: bold;
}
</style>
