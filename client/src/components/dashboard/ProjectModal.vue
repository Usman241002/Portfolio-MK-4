<script setup>
import {  API_URL } from '@/config.js'
import { onMounted, computed, ref, watch } from 'vue'
import {
  Modal,
  Flex,
  Divider,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Button,
  Collapse,
  Upload,
  Typography,
} from 'ant-design-vue'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue'
import BaseButton from '../portfolio/BaseButton.vue'
import Subtitle from '../portfolio/Subtitle.vue'
import CaseCard from './CaseCard.vue'
import { storeToRefs } from 'pinia'

import useSkillsStore from '@/stores/skillsStore.js'
import useProjectsStore from '@/stores/projectsStore.js'

const props = defineProps({
  modalVisible : Boolean
})

const emit = defineEmits(['update:modalVisible'])
const close = () => emit('update:modalVisible', false)

const projectsStore = useProjectsStore()
const skillsStore = useSkillsStore()
const { currentProject } = storeToRefs(projectsStore)
const uploadFileList = ref([])


watch(
  () => currentProject.value.thumbnail,
  (thumbnail) => {
    if (typeof thumbnail === 'string') {
      uploadFileList.value = [
        {
          uid: '-1',
          name: thumbnail.split('/').pop(),
          status: 'done',
          url: `${API_URL}${thumbnail}`,
        },
      ]
    }
  },
  { immediate: true },
)

const skillOptions = computed(() =>
  skillsStore.skills.map((skill) => ({ label: skill.name, value: skill.id })),
)

onMounted(async () => {
  await skillsStore.getSkills()
})

function onAddSection() {
  currentProject.value.cases.push({
    id: Date.now(),
    heading: '',
    subheading: '',
    description: '',
    stat: '',
    stat_description: '',
  })
}

function onRemove(caseId) {
  currentProject.value.cases = currentProject.value.cases.filter((c) => c.id !== caseId)
}

async function onSave() {
  await projectsStore.saveProject()
  close()
}

const beforeUpload = (file) => {
  currentProject.value.thumbnail = file

  uploadFileList.value = [
    {
      uid: String(Date.now()),
      name: file.name,
      status: 'done',
      originFileObj: file,
    },
  ]

  return false
}

function onRemoveImage() {
  currentProject.value.thumbnail = null
  uploadFileList.value = []
}
</script>

<template>
  <Modal
    :open="modalVisible"
    @cancel="close"
    :title="currentProject.title || 'New Project'"
    width="45%"
    centered
  >
    <template #footer>
      <Flex gap="16" justify="end">
        <Button @click="close">Cancel</Button>
        <Button @click="onSave" type="primary">Save</Button>
      </Flex>
    </template>

    <Flex
      vertical
      :style="{ overflowY: 'auto', overflowX: 'hidden', minHeight: '50vh', maxHeight: '70vh' }"
    >
      <Subtitle>Basic Info</Subtitle>
      <Divider
        :style="{
          margin: '0.75rem',
          border: '1px solid var(--border)',
        }"
      />
      <Form layout="vertical">
        <Row :gutter="12">
          <Col :span="12">
            <Form.Item class="form-label" label="Project Title">
              <Input type="text" class="form-input" v-model:value="currentProject.title" />
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item class="form-label" label="Client Name">
              <Input type="text" class="form-input" v-model:value="currentProject.client" />
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item class="form-label" label="Role">
              <Input type="text" class="form-input" v-model:value="currentProject.role" />
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item class="form-label" label="Year">
              <InputNumber
                class="form-input"
                v-model:value="currentProject.year"
                style="width: 100%"
              />
            </Form.Item>
          </Col>
          <Col :span="24">
            <Form.Item class="form-label" label="Description">
              <Input.TextArea
                :style="{ resize: 'none', height: '5rem' }"
                class="form-input"
                v-model:value="currentProject.description"
              />
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item class="form-label" label="Github URL">
              <Input type="text" class="form-input" v-model:value="currentProject.repository_url" />
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item class="form-label" label="Demo URL">
              <Input type="text" class="form-input" v-model:value="currentProject.live_demo_url" />
            </Form.Item>
          </Col>
          <Col :span="24">
            <Form.Item class="form-label" label="Subtitle">
              <Input type="text" class="form-input" v-model:value="currentProject.subtitle" />
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item class="form-label" label="Tech Stack">
              <Select
                mode="multiple"
                class="form-select"
                v-model:value="currentProject.skill_ids"
                :options="skillOptions"
              />
            </Form.Item>
          </Col>
          <Col :span="12">
            <Form.Item class="form-label" label="Status">
              <Select
                class="form-select"
                v-model:value="currentProject.status"
                :options="[
                  { value: 'ongoing', label: 'Ongoing' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'archived', label: 'Archived' },
                ]"
              />
            </Form.Item>
          </Col>
          <Col :span="24">
            <Form.Item label="Thumbnail Image">
              <Upload
                v-model:file-list="uploadFileList"
                :before-upload="beforeUpload"
                :show-upload-list="true"
                :on-remove="onRemoveImage"
                :max-count="1"
                accept="image/*"
              >
                <Flex
                  class="upload"
                  align="center"
                  gap="8"
                  :style="{
                    backgroundColor: 'var(--bg)',
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                  }"
                >
                  <PlusOutlined :style="{ color: 'var(--text-secondary)' }" />
                  <Typography.Text
                    :style="{
                      font: 'var(--label)',
                      letterSpacing: 'var(--label-tracking)',
                      color: 'var(--text-secondary)',
                    }"
                  >
                    Upload
                  </Typography.Text>
                </Flex>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Subtitle :style="{ marginTop: '1rem' }">Case Study Section</Subtitle>
        <Divider
          :style="{
            margin: '0.75rem',
            border: '1px solid var(--border)',
          }"
        />
        <Flex vertical>
          <Collapse class="case-card" :bordered="false">
            <Collapse.Panel
              class="case-panel"
              v-for="(c, index) in currentProject.cases"
              :key="index"
            >
              <template #header>
                <Flex align="start" justify="space-between">
                  <p>{{ c.heading || `New Section ${index + 1}` }}</p>
                  <Button
                    type="primary"
                    ghost
                    danger
                    :style="{ borderRadius: '0' }"
                    @click.stop
                    @click="onRemove(c.id)"
                  >
                    <CloseOutlined />
                  </Button>
                </Flex>
              </template>
              <CaseCard :caseItem="c" />
            </Collapse.Panel>
          </Collapse>
          <Flex justify="start">
            <BaseButton @click="onAddSection"><PlusOutlined />Add Section</BaseButton>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  </Modal>
</template>

<style scoped>
.case-card {
  border-radius: 0;
  background-color: var(--surface);
}

.case-panel {
  background-color: var(--bg);
  border: 1px solid var(--border);
  margin-bottom: 1rem;
}

.case-panel p {
  font: var(--body);
  color: var(--text-primary);
}

:deep(.ant-form-item-label > label) {
  font: var(--micro);
  letter-spacing: var(--micro-tracking);
  color: var(--text-secondary);
  text-transform: uppercase;
}

.form-input {
  background: var(--bg);
}

:deep(.form-select .ant-select-selector) {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 0.75rem !important;
}

:deep(.form-select .ant-select-selection-item) {
  line-height: 2rem !important;
}

:deep(.form-select .ant-select-selection-placeholder) {
  line-height: 2rem !important;
}

:deep(.ant-form-item) {
  margin-bottom: 0.25rem;
}

.upload:hover {
  cursor: pointer;
}
</style>
