export default defineNuxtRouteMiddleware(() => {
  const user = useUser()

  if (!user.isGuest) return navigateTo('/')
})
