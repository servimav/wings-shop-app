<template>
  <login-form v-if="login" @toggle="login = !login" @auth="$emit('auth')" />
  <register-form v-else @toggle="login = !login" @auth="$emit('auth')" />
</template>

<script setup lang="ts">
import LoginForm from 'src/components/forms/LoginForm.vue';
import RegisterForm from 'src/components/forms/RegisterForm.vue';
import { ref } from 'vue';

const $emit = defineEmits<{ (e: 'auth'): void }>();
const login = ref(false);
</script>
