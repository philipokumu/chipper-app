export const usePostStore = defineStore('posts', () => {
  const { $api } = useNuxtApp()
    const loading = ref(false)

    async function createPost({ title, body }) {
        const payload = { title, body }
        loading.value = true
        try {
            const response = await $api.post('/posts', payload)
        } catch (error) {
            console.error('Failed to create post:', error)
        } finally {
            loading.value = false
        }
    }

  return {
    createPost
  }
})