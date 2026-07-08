<script setup>
import { Flex } from 'ant-design-vue'
import Title from '@/components/portfolio/Title.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'

import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <Flex gap="24" vertical>
    <Title>About me</Title>
    <h4 class="heading">I turn complex ideas into reliable and organised software.</h4>
    <p class="about-me-body">
      I’m a full-stack software developer with a solid foundation in mathematics, blending
      organisation and precision with creative problem-solving to craft impactful web applications.
      I specialize in building intuitive, scalable apis that turn complex challenges into seamless
      user experiences on both the frontend and backend.

      <br />
      <br />
      My background spans working with companies to efficiently cut workload, as well as creating
      home solutions that make my personal life easier. In both, the solution is usually the same:
      finding a way to make life easier.
      <br />
      <br />

      I'm based in Birmingham, work remotely, and care deeply about the quality of the things I
      ship. If it's worth building, it's worth building well.
    </p>
    <Flex gap="16"
      ><BaseButton @click="router.push('/contact')">Get in touch <ArrowRightOutlined /></BaseButton>
      <BaseButton variant="secondary">View CV</BaseButton></Flex
    >
  </Flex>
</template>

<style scoped>
.heading {
  font: var(--heading-lg);
  letter-spacing: var(--heading-lg-tracking);
}

.about-me-body {
  font: var(--body);
  color: var(--text-secondary);
}
</style>
