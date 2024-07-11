<template>
  <div>
    <div>Processing...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import {useLoggedIn} from "@/stores/counter.js";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const login = useLoggedIn();

    const handleOAuthKakao = async (token, name) => {
      try {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('name', name);
        login.setLogin();
        await router.push('/');
        //console.log(login.isLoggedIn);
      } catch (error) {
        await router.push('/');
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
