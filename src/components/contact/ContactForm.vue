<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const name = ref('')
const email = ref('')
const budget = ref('')
const message = ref('')

const status = ref('idle') // 'idle' | 'sending' | 'success' | 'error'
let statusTimer = null

function resetStatusAfterDelay() {
  clearTimeout(statusTimer)
  statusTimer = setTimeout(() => (status.value = 'idle'), 6000)
}

async function handleSubmit() {
  status.value = 'sending'

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: name.value.trim(),
        reply_to: email.value.trim(),
        budget: budget.value.trim() || 'Not specified',
        message: message.value.trim()
      },
      { publicKey: PUBLIC_KEY }
    )
    status.value = 'success'
    name.value = ''
    email.value = ''
    budget.value = ''
    message.value = ''
  } catch (err) {
    console.error('EmailJS error:', err)
    status.value = 'error'
  }

  resetStatusAfterDelay()
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

    <button type="submit" class="form-submit" :disabled="status === 'sending'">
      <template v-if="status === 'sending'">Sending… <i class="fa-solid fa-spinner fa-spin"></i></template>
      <template v-else>Send message <i class="fa-solid fa-arrow-right"></i></template>
    </button>

    <div class="form-toast" :class="{ show: status === 'success' }">
      <i class="fa-solid fa-circle-check"></i> Message sent — I'll get back to you soon.
    </div>
    <div class="form-toast" :class="{ show: status === 'error' }" style="color:#b3261e;background:#fbe9e7;border-color:#f3c6bf;">
      <i class="fa-solid fa-circle-exclamation"></i> Something went wrong — try again, or email me directly.
    </div>

    <p class="form-note">Sent directly from this form — no email client required.</p>
  </form>
</template>