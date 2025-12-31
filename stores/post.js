export const usePostStore = defineStore('posts', () => {
  const { $api } = useNuxtApp()
    const loading = ref(false)
    const posts = ref([])
    const newPostsBuffer = ref([])

    async function fetchPosts() {
        loading.value = true
        try {
            const response = await $api.get('/posts')
            posts.value = response.data
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        } finally {
            loading.value = false
        }
    }

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

    async function checkForNewPosts() {
      try {
        const response = await $api.get('/posts')
        // Compare id of latest post to confirm there are new posts
        if (response.data[0]?.id !== posts.value[0]?.id) {
          // Filter out posts we already have in the main list
          const existingIds = new Set(posts.value.map(p => p.id))
          newPostsBuffer.value = response.data.filter(p => !existingIds.has(p.id))
        }
      } catch (error) {
        console.error('Polling error', error)
      }
    }

    // merge new posts into main posts list
    function displayNewPosts() {
      posts.value = [...newPostsBuffer.value, ...posts.value]
      newPostsBuffer.value = []
    }

  return {
    createPost,
    fetchPosts,
    checkForNewPosts,
    displayNewPosts,
    newPostsBuffer,
    loading,
    posts
  }
})