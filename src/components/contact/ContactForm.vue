<script setup>
import { ref } from 'vue'
import { CONTACT_EMAIL } from '../../data/commands'

const name = ref('')
const email = ref('')
const budget = ref('')
const message = ref('')
const showToast = ref(false)
let toastTimer = null

function handleSubmit() {
  const subject = encodeURIComponent(`New project inquiry from ${name.value.trim() || 'website visitor'}`)
  const bodyLines = [
    message.value.trim(),
    '',
    budget.value.trim() ? `Looking for: ${budget.value.trim()}` : '',
    `Reply to: ${email.value.trim()}`
  ].filter(Boolean).join('\n')
  const body = encodeURIComponent(bodyLines)

  showToast.value = true
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (showToast.value = false), 6000)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-row">
      <div class="form-field">
        <label for="fName">Name</label>
        <input id="fName" v-model="name" type="text" required placeholder="Jordan Lee">
      </div>
      <div class="form-field">
        <label for="fEmail">Email</label>
        <input id="fEmail" v-model="email" type="email" required placeholder="you@company.com">
      </div>
    </div>
    <div class="form-row">
      <div class="form-field full">
        <label for="fBudget">What are you looking for?</label>
        <input id="fBudget" v-model="budget" type="text" placeholder="Full-time role, contract, or a specific project">
      </div>
    </div>
    <div class="form-row">
      <div class="form-field full">
        <label for="fMessage">Message</label>
        <textarea id="fMessage" v-model="message" required placeholder="A little about the role or project…"></textarea>
      </div>
    </div>
    <button type="submit" class="form-submit">Send message <i class="fa-solid fa-arrow-right"></i></button>
    <div class="form-toast" :class="{ show: showToast }">
      <i class="fa-solid fa-circle-check"></i> Opening your email client with this message…
    </div>
    <p class="form-note">This opens a pre-filled email in your mail app — nothing is sent from this page directly.</p>
  </form>
</template>
