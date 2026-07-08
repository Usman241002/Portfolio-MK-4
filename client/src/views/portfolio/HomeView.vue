<script setup>
import { Flex, Divider } from 'ant-design-vue'

import Hero from '@/components/portfolio/Hero.vue'
import SelectedWork from '@/components/portfolio/SelectedWork.vue'
import AboutMini from '@/components/portfolio/AboutMini.vue'
</script>

<template>
  <Flex vertical>
    <Hero />
    <Divider :style="{ border: '1px solid var(--border)' }" />
    <SelectedWork />
    <Divider :style="{ border: '1px solid var(--border)' }" />
    <AboutMini />
  </Flex>
</template>
