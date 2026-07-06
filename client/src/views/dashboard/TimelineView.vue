<script setup lang="ts">
import { onMounted } from 'vue'
import { Flex, Divider, Collapse, Button } from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import Subtitle from '@/components/portfolio/Subtitle.vue'
import TimelineCard from '@/components/dashboard/TimelineCard.vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import dayjs from 'dayjs'

import useExperienceStore from '@/stores/experienceStore.js'
const experienceStore = useExperienceStore()

onMounted(async () => {
  await experienceStore.fetchExperience()
})

function onRemove(id: number) {
  experienceStore.removeExperience(id)
}
</script>

<template>
  <Flex class="dash-container" vertical>
    <Subtitle>Experience timeline</Subtitle>
    <Divider :style="{ margin: '0.75rem', border: '1px solid var(--border)' }" />

    <Collapse class="timeline-card" :bordered="false">
      <Collapse.Panel
        class="timeline-header"
        :style="{ borderRadius: '0' }"
        v-for="exp in experienceStore.experiences"
        :key="exp.id"
      >
        <template #header>
          <Flex justify="space-between" align="start">
            <p>
              <span>{{ exp.title }} - </span
              >{{ exp.start_date == '' ? null : dayjs(exp.start_date).format('MM-YYYY') }} →
              {{
                exp.end_date == null || exp.end_date == ''
                  ? 'Present'
                  : dayjs(exp.end_date).format('MM-YYYY')
              }}
            </p>

            <Button
              type="primary"
              ghost
              danger
              :style="{ borderRadius: '0' }"
              @click.stop
              @click="onRemove(exp.id)"
            >
              <CloseOutlined />
            </Button>
          </Flex>
        </template>

        <TimelineCard :experience="exp" />
      </Collapse.Panel>
    </Collapse>

    <Flex justify="start">
      <BaseButton @click="experienceStore.addExperience"> Add </BaseButton>
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
