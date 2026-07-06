<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Flex, Button, Input } from 'ant-design-vue'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue'
import BaseButton from '@/components/portfolio/BaseButton.vue'
import useSkillsStore from '@/stores/skillsStore.js'

const skillsStore = useSkillsStore()
const { skills } = storeToRefs(skillsStore)

const skillsFormState = reactive({
  name: '',
  level: '',
})

onMounted(async () => {
  await skillsStore.getSkills()
  console.log('skills:', JSON.stringify(skills.value, null, 2))
})

async function onSubmit() {
  try {
    await skillsStore.addSkill(skillsFormState)
    skillsFormState.name = ''
    skillsFormState.level = ''
  } catch (error) {
    console.error(error)
  }
}

async function onRemove(skillId) {
  try {
    await skillsStore.deleteSkill(skillId)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <Flex class="dash-container" vertical>
    <table>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Level</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="skill in skills" :key="skill.id">
          <td>{{ skill.name }}</td>
          <td>{{ skill.level }}</td>
          <td class="actions-cell">
            <Flex gap="8" class="actions">
              <Button
                type="primary"
                ghost
                danger
                :style="{ borderRadius: '0' }"
                @click="onRemove(skill.id)"
              >
                <CloseOutlined />
              </Button>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <Flex
      class="skill-form"
      gap="16"
      align="center"
      :style="{ padding: '0.5rem 1rem', backgroundColor: 'var(--surface)' }"
    >
      <Input
        class="form-input grow"
        placeholder="Skill name..."
        v-model:value="skillsFormState.name"
      />

      <Input
        class="form-input grow"
        placeholder="Level (e.g. Expert, 4 Years)..."
        v-model:value="skillsFormState.level"
      />

      <BaseButton type="primary" @click="onSubmit"> <PlusOutlined /> Add </BaseButton>
    </Flex>
  </Flex>
</template>

<style scoped>
table {
  width: 100%;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

th {
  font: var(--label);
  text-transform: uppercase;
}

td {
  font: var(--body);
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: var(--hover);
}

tbody tr:last-child td {
  border-bottom: none;
}

.actions {
  opacity: 0;
  transition: opacity 0.2s ease;
}

tbody tr:hover .actions {
  opacity: 1;
}

.skill-form {
  width: 100%;
  margin-top: 1rem;
}

.grow {
  flex: 1;
}

.form-input {
  background: var(--bg);
}
</style>
