<script setup lang="ts">
import { Flex, Row, Col, Button } from 'ant-design-vue'
import ProfileForm from '@/components/dashboard/ProfileForm.vue'
</script>

<template>
  <Flex class="dash-container" vertical>
    <Row :gutter="24">
      <Col :span="2">
        <Flex vertical gap="8">
          <Flex
            align="center"
            justify="center"
            :style="{ width: '100%', height: '6rem', backgroundColor: 'var(--accent)' }"
          >
            UK
          </Flex>
          <Button>Upload </Button>
          <Button danger>Remove</Button>
        </Flex>
      </Col>
      <Col :span="1"> </Col>
      <Col :span="21">
        <ProfileForm />
      </Col>
    </Row>
  </Flex>
</template>

<style scoped></style>
