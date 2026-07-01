<script setup lang="ts">
import { Flex, Typography } from 'ant-design-vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import Title from '@/components/portfolio/Title.vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import Badge from '@/components/portfolio/Badge.vue'
import Navbar from '@/components/portfolio/Navbar.vue'
import StatCard from '@/components/portfolio/StatCard.vue'
</script>

<template>
  <Typography.Title>Components</Typography.Title>

  <Navbar />

  <Flex gap="large" vertical>
    <Flex>
      <Title>Full Stack Developer</Title>
      <Subtitle>About us</Subtitle>
    </Flex>

    <Flex
      ><BaseButton variant="primary">Get in touch <ArrowRightOutlined /></BaseButton>
      <BaseButton variant="secondary">View Cv </BaseButton></Flex
    >
    <Flex gap="large">
      <Badge>React</Badge>
      <Badge>Vue.Js</Badge>
    </Flex>

    <Flex>
      <StatCard title="6yr" desc="Usman " />
    </Flex>
  </Flex>
</template>

<style></style>
