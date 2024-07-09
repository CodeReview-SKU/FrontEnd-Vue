<template>
  <div>
    <div>Processing...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const handleOAuthKakao = async (token, name) => {
      try {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('name', name);
        await router.push('/');
      } catch (error) {
        router.push('/');
      }
    };

    onMounted(() => {
      const token = route.query.accessToken
      const name = route.query.name;
      if (token) {
        handleOAuthKakao(token, name);
      }
      else {
        alert("다시시도.");
        router.push('/');
      }
    });

    return {};
  },
};
</script>

<style scoped>
/* 스타일을 여기에 추가할 수 있습니다 */
</style>
