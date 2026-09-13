import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useNavigation() {
  const route = useRoute()
  const router = useRouter()

  const currentPage = computed(() => route.name)

  function goTo(page) {
    router.push({ name: page })
  }

  return { currentPage, goTo }
}
