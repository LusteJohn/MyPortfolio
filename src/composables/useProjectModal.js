import { reactive } from 'vue'

const state = reactive({
  isOpen: false,
  project: null
})

export function useProjectModal() {
  function open(project) {
    state.project = project
    state.isOpen = true
  }
  function close() {
    state.isOpen = false
  }
  return { state, open, close }
}
