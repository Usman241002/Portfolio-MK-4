<script setup lang="ts">
import { Flex, Divider } from 'ant-design-vue'

import Hero from '@/components/Hero.vue'
import SelectedWork from '@/components/SelectedWork.vue'
import AboutMini from '@/components/AboutMini.vue'
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
