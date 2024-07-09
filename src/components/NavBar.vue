<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1 class="navbar-brand m-2" @click="router.push('/')" style="font-size: x-large; cursor: pointer">Code review</h1>
        <button v-if="!isLoggedIn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</button>
        <button v-if="isLoggedIn" class="btn btn-primary" @click="logout">로그아웃</button>
      </div>
    </nav>

    <Login id="loginModal"/>
    <!-- 모달 끝 -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Login from "@/views/Login.vue";
const isLoggedIn = ref(false);
const router = useRouter();



const logout = () => {
  sessionStorage.removeItem("token");
  isLoggedIn.value = false;
  alert("로그아웃 되었습니다.");
  window.location.reload();
};

onMounted(() => {
  // 페이지 로드 시 sessionStorage에 저장된 token을 기준으로 isLoggedIn 초기화
  isLoggedIn.value = !!sessionStorage.getItem('token');
});

watch(() => sessionStorage.getItem('token'), (newToken) => {
  isLoggedIn.value = !! newToken;
});

</script>

<style scoped>
/* 모달 fade 애니메이션 CSS */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
