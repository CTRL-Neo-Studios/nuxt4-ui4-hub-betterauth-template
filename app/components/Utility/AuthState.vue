<script setup lang="ts">
import { useAuthSession } from '~/composables/core/useAuthSession'

const { loggedIn, session, user, clear } = useAuthSession()
</script>

<template>
    <slot
        v-bind="{ loggedIn, user, session, clear }"
    />
</template>