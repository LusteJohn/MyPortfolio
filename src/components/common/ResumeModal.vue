<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import resumePdf from '../../assets/resume/jmluste.pdf'

const props = defineProps({
  showDownload: { type: Boolean, default: false },
  source: { type: String, default: 'resume' },
  label: { type: String, default: 'View résumé' },
  keyboard: { type: Boolean, default: false },
  visible: { type: Boolean, default: true }
})

const isOpen = ref(false)
const pdfUrl = resumePdf

function open() {
  isOpen.value = true
}
function close() {
  isOpen.value = false
}

function trackDownload() {
  window.dispatchEvent(new CustomEvent('resume-download', { detail: { source: props.source } }))
}

function openFromShortcut() {
  if (props.keyboard) open()
}

onMounted(() => window.addEventListener('resume-open', openFromShortcut))
onUnmounted(() => window.removeEventListener('resume-open', openFromShortcut))
</script>

<template>
  <div v-if="visible" class="resume-actions">
    <button type="button" class="resume-cta" @click="open">
      <i class="fa-solid fa-file-arrow-down"></i> {{ label }}
    </button>
    <a
      v-if="showDownload"
      class="resume-download"
      :href="pdfUrl"
      download="John-Mark-Luste-Resume.pdf"
      @click="trackDownload"
    >
      <i class="fa-solid fa-download"></i> Download PDF
    </a>

    <teleport to="body">
      <div v-if="isOpen" class="resume-modal-backdrop" @click.self="close">
        <div class="resume-modal-panel">
          <button class="resume-modal-close" aria-label="Close" @click="close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <iframe
            :src="`${pdfUrl}#zoom=FitH`"
            title="John Mark Luste résumé"
            class="resume-embed"
            loading="lazy"
          >
            <p>Your browser does not support embedded PDFs.
              <a :href="pdfUrl" target="_blank" rel="noopener noreferrer">Download the résumé instead</a>.
            </p>
          </iframe>
        </div>
      </div>
    </teleport>
  </div>
</template>
