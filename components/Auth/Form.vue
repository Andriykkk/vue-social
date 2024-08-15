<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">
      <UIInput
        value="hello"
        label="Username"
        v-model="data.username"
      />

      <UIInput
        value="hello"
        label="Password"
        type="password"
        v-model="data.passwords"
      />

      <div>
        <button @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = reactive({
  username: "",
  passwords: "",
  loading: false,
});

async function handleLogin() {
  const { login } = useAuth();

  data.loading = true;
  try {
    await login({
      username: data.username,
      password: data.passwords,
    });
  } catch (err) {
  } finally {
    data.loading = false;
  }
}
</script>

<style></style>
