<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  phrases: {
    type: Array,
    required: true,
  },
  typeSpeed: {
    type: Number,
    default: 80,
  },
  deleteSpeed: {
    type: Number,
    default: 40,
  },
  pauseTime: {
    type: Number,
    default: 2000,
  },
})

const displayText = ref('')
const phraseIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)

let interval

const typeSpeed = props.typeSpeed ?? 80
const deleteSpeed = props.deleteSpeed ?? 40
const pauseTime = props.pauseTime ?? 2000

function tick() {
  const current = props.phrases[phraseIndex.value]

  if (!isDeleting.value) {
    displayText.value = current.slice(0, charIndex.value + 1)
    charIndex.value++

    if (charIndex.value === current.length) {
      isDeleting.value = true
      clearInterval(interval)
      setTimeout(startTyping, pauseTime)
    }
  } else {
    displayText.value = current.slice(0, charIndex.value - 1)
    charIndex.value--

    if (charIndex.value === 0) {
      isDeleting.value = false
      phraseIndex.value = (phraseIndex.value + 1) % props.phrases.length
      clearInterval(interval)
      setTimeout(startTyping, 300)
    }
  }
}

function startTyping() {
  interval = setInterval(tick, isDeleting.value ? deleteSpeed : typeSpeed)
}

onMounted(() => {
  startTyping()
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <span class="cursor-text"> {{ displayText }}<span class="cursor">|</span> </span>
</template>

<style scoped>
.cursor {
  color: var(--accent);
  animation: blink 0.8s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.cursor-text {
  font: var(--body);
  font-size: 1rem;
  color: var(--text-secondary);
  white-space: pre;
}
</style>
