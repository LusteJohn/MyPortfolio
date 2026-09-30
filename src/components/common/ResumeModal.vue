<script setup>
import { ref } from 'vue'
import resumePdf from '../../assets/resume/jmluste.pdf'

const isOpen = ref(false)
const pdfUrl = resumePdf

function open() {
  isOpen.value = true
}
function close() {
  isOpen.value = false
}
</script>

<template>
  <div>
    <button type="button" class="resume-cta" @click="open">
      <i class="fa-solid fa-file-arrow-down"></i> View résumé
    </button>

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
