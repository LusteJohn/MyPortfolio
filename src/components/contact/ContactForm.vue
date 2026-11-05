<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const name = ref('')
const email = ref('')
const budget = ref('')
const budgetOptions = [
  'Full-time role',
  'Contract',
  'Specific project',
  'Part-time / consulting'
]
const message = ref('')
const touched = ref({ name: false, email: false, message: false })

const status = ref('idle') // 'idle' | 'sending' | 'success' | 'error'
let statusTimer = null

const errors = computed(() => ({
  name: name.value.trim() ? '' : 'Please enter your name.',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? '' : 'Enter a valid email address.',
  message: message.value.trim().length >= 10 ? '' : 'Please add at least 10 characters.'
}))
const isValid = computed(() => Object.values(errors.value).every((error) => !error))

function touch(field) {
  touched.value[field] = true
}

function resetStatusAfterDelay() {
  clearTimeout(statusTimer)
  statusTimer = setTimeout(() => (status.value = 'idle'), 6000)
}

async function handleSubmit() {
  touched.value = { name: true, email: true, message: true }
  if (!isValid.value) return
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
        <input id="fName" v-model="name" type="text" required placeholder="Jordan Lee" :aria-invalid="Boolean(touched.name && errors.name)" aria-describedby="fNameError" @blur="touch('name')">
        <small v-if="touched.name && errors.name" id="fNameError" class="field-error">{{ errors.name }}</small>
      </div>
      <div class="form-field">
        <label for="fEmail">Email</label>
        <input id="fEmail" v-model="email" type="email" required placeholder="you@company.com" :aria-invalid="Boolean(touched.email && errors.email)" aria-describedby="fEmailError" @blur="touch('email')">
        <small v-if="touched.email && errors.email" id="fEmailError" class="field-error">{{ errors.email }}</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-field full">
        <label for="fBudget">What are you looking for?</label>
        <input
          id="fBudget"
          list="budget-options"
          v-model="budget"
          type="text"
          placeholder="Full-time role, contract, or a specific project"
        >
        <datalist id="budget-options">
          <option v-for="option in budgetOptions" :key="option" :value="option"></option>
        </datalist>
      </div>
    </div>
    <div class="form-row">
      <div class="form-field full">
        <label for="fMessage">Message</label>
        <textarea id="fMessage" v-model="message" required placeholder="A little about the role or project…" :aria-invalid="Boolean(touched.message && errors.message)" aria-describedby="fMessageError" @blur="touch('message')"></textarea>
        <small v-if="touched.message && errors.message" id="fMessageError" class="field-error">{{ errors.message }}</small>
      </div>
    </div>

    <button type="submit" class="form-submit" :disabled="status === 'sending' || !isValid">
      <template v-if="status === 'sending'">Sending… <i class="fa-solid fa-spinner fa-spin"></i></template>
      <template v-else>Send message <i class="fa-solid fa-arrow-right"></i></template>
    </button>

    <div class="form-toast" :class="{ show: status === 'success' }">
      <i class="fa-solid fa-circle-check"></i> Message sent — I'll get back to you soon.
    </div>
    <div class="form-toast form-toast--error" :class="{ show: status === 'error' }">
      <i class="fa-solid fa-circle-exclamation"></i> Something went wrong — try again, or email me directly.
    </div>

    <p class="form-note"><i class="fa-solid fa-lock"></i> Sent directly from this form — no email client required.</p>
    <button v-if="status === 'error'" type="button" class="form-retry" @click="handleSubmit">Retry sending</button>
  </form>
</template>