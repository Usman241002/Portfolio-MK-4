<script setup lang="ts">
import { Flex, Row, Col } from 'ant-design-vue'
import Subtitle from '@/components/Subtitle.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <Row class="container">
    <Col :span="6">
      <Subtitle>About</Subtitle>
    </Col>
    <Col :span="18">
      <Flex gap="24" vertical>
        <p class="about-body">
          I'm a product designer and front-end developer based in Birmingham. I care about the gap
          between how software gets designed and how it actually gets built — and I spend most of my
          time closing it. <br /><br />My background spans early-stage startups to enterprise
          products. I bring engineering literacy to design conversations and design thinking to
          engineering ones. The work I'm most proud of is the work that nobody notices, because it
          just works.
        </p>

        <Flex gap="16">
          <BaseButton>Read more</BaseButton>
          <BaseButton type="secondary">Say Hello</BaseButton>
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
</style>
