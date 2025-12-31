import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorites', () => {
    const { $api } = useNuxtApp()
    const userStore = useUser()
    const favorites = ref({
        users: [],
        posts: []
    })

    // Getter: Check if a user is favorited
    const isUserFavorited = computed(() => (userId) => {
        return favorites.value.users.some(user => user.id === userId)
    })

    // Getter: Check if post belongs to current user
    const postBelongsToCurrentUser = computed(() => (userId) => {
        return userId === userStore.data.id
    })

    // Getter: Check if a post is favorited
    const isPostFavorited = computed(() => (postId) => {
        return favorites.value.posts.some(post => post.id === postId)
    })

    // Action: Fetch all favorites
    async function fetchFavorites() {
        try {
            const response = await $api.get('/favorites')
            favorites.value = {
                users: response.data.users || [],
                posts: response.data.posts || []
            }
        } catch (error) {
        console.error('Error fetching favorites:', error)
        }
    }

    // Action: Toggle favorite/unfavorite user
    async function toggleUserFavorite(user) {
        const userId = user.id
        const index = favorites.value.users.findIndex(u => u.id === userId)
        const isFavorited = index !== -1

        // Optimistic Update
        if (isFavorited) {
            favorites.value.users.splice(index, 1)
        } else {
            favorites.value.users.push(user)
        }

        try {
            if (isFavorited) {
                await $api.delete(`/users/${userId}/favorite`)
            } else {
                await $api.post(`/users/${userId}/favorite`)
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error)
            if (isFavorited) {
                favorites.value.users.push(user)
            } else {
                const i = favorites.value.users.findIndex(u => u.id === userId)
                favorites.value.users.splice(i, 1)
            }
        }
    }

    // Sction: Toggle favorite/unfavorite post
    async function togglePostFavorite(post) {
        const postId = post.id
        const index = favorites.value.posts.findIndex(p => p.id === postId)
        const isFavorited = index !== -1

        // Optimistic Update
        if (isFavorited) {
            favorites.value.posts.splice(index, 1)
        } else {
            favorites.value.posts.push(post)
        }

        try {
            if (isFavorited) {
                await $api.delete(`/posts/${postId}/favorite`)
            } else {
                await $api.post(`/posts/${postId}/favorite`)
            }
        } catch (error) {
            console.error('Failed to toggle post favorite:', error)
            if (isFavorited) {
                favorites.value.posts.push(post)
            } else {
                const i = favorites.value.posts.findIndex(p => p.id === postId)
                favorites.value.posts.splice(i, 1)
            }
        }
    }

    return {
        favorites,
        isUserFavorited,
        postBelongsToCurrentUser,
        isPostFavorited,
        fetchFavorites,
        toggleUserFavorite,
        togglePostFavorite
    }
})