<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useSkillsStore from '@/stores/skillsStore.js'

const skillsStore = useSkillsStore()
const { skills } = storeToRefs(skillsStore)

onMounted(async () => {
  await skillsStore.getSkills()
  console.log('skills:', JSON.stringify(skills.value, null, 2))
})
</script>

<template>
  <div class="skills-grid">
    <div v-for="skill in skills" :key="skill.name" class="skill-row">
      <span class="skill-name">{{ skill.name }}</span>
      <span class="skill-level">{{ skill.level }}</span>
    </div>
  </div>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
}

/* right border on left column only */
.skill-row:nth-child(odd) {
  border-right: 1px solid var(--border);
}
.skill-name {
  font: var(--body);
  color: var(--text-primary);
  font-weight: 700;
}
.skill-level {
  font: var(--label);
  letter-spacing: var(--label-tracking);
  color: var(--text-secondary);
}
</style>
