<script setup lang="ts">
const skills = [
  { name: 'React / TypeScript', level: '3 years' },
  { name: 'Vue.js', level: '1 year' },
  { name: 'Javascript', level: '4 years' },
  { name: 'HTML', level: '5 years' },
  { name: 'CSS', level: '5 years' },
  { name: 'PHP', level: '3 years' },
  { name: 'Node.js', level: '2 years' },
  { name: 'Python', level: '4 years' },
  { name: 'C', level: '1 year' },
  { name: 'C++', level: '2 years' },
  { name: 'SQL', level: '3 years' },
  { name: 'Figma', level: '3 years' },
]

const midpoint = Math.ceil(skills.length / 2)

const leftSkills = skills.slice(0, midpoint)
const rightSkills = skills.slice(midpoint)
</script>

<template>
  <div class="skills-grid">
    <div class="column">
      <div v-for="skill in leftSkills" :key="skill.name" class="skill-row">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-level">{{ skill.level }}</span>
      </div>
    </div>

    <div class="column">
      <div v-for="skill in rightSkills" :key="skill.name" class="skill-row">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-level">{{ skill.level }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.column:first-child {
  border-right: 1px solid var(--border);
}

.skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}

.column:first-child .skill-row {
  padding-right: 2rem;
}

.column:last-child .skill-row {
  padding-left: 2rem;
}

.skill-name {
  font: var(--body);
  color: var(--text-primary);
  font-weight: 700;
}

.skill-level {
  font: var(--label);
  color: var(--text-secondary);
}
</style>
