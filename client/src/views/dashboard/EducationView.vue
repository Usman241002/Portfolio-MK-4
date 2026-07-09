<script setup>
import { onMounted } from 'vue'
import { Flex, Divider, Collapse, Button } from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import EducationCard from '@/components/dashboard/EducationCard.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import dayjs from 'dayjs'

import useEducationStore from '@/stores/educationStore.js'
const educationStore = useEducationStore()

onMounted(async () => {
  await educationStore.fetchEducation()
})

function onRemove(id) {
  educationStore.removeEducation(id)
}
</script>

<template>
  <Flex class="dash-container" vertical>
    <Subtitle>Education timeline</Subtitle>
    <Divider :style="{ margin: '0.75rem', border: '1px solid var(--border)' }" />

    <Collapse class="timeline-card" :bordered="false">
      <Collapse.Panel
        class="timeline-header"
        :style="{ borderRadius: '0' }"
        v-for="edu in educationStore.educations"
        :key="edu.id"
      >
        <template #header>
          <Flex justify="space-between" align="start">
            <p>
              <span>{{ edu.title }} - </span
              >{{ edu.start_date == '' ? null : dayjs(edu.start_date).format('MM-YYYY') }} →
              {{
                edu.end_date == null || edu.end_date == ''
                  ? 'Present'
                  : dayjs(edu.end_date).format('MM-YYYY')
              }}
            </p>

            <Button
              type="primary"
              ghost
              danger
              :style="{ borderRadius: '0' }"
              @click.stop
              @click="onRemove(edu.id)"
            >
              <CloseOutlined />
            </Button>
          </Flex>
        </template>

        <EducationCard :education="edu" />
      </Collapse.Panel>
    </Collapse>

    <Flex justify="start">
      <BaseButton @click="educationStore.addEducation"> Add </BaseButton>
    </Flex>
  </Flex>
</template>

<style scoped>
.timeline-card {
  border-radius: 0;
  background-color: var(--bg);
}

.timeline-header {
  background-color: var(--surface);
  border: 1px solid var(--border);
  margin-bottom: 1rem;
}

.timeline-header p {
  font: var(--body);
  color: var(--accent);
}

.timeline-header span {
  font-weight: bold;
  color: var(--text-primary);
}
</style>
