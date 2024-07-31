<template>
  <div class="mt-2">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
      <div class="container-fluid">
        <h1 class="navbar-brand m-2" @click="router.push('/')" style="font-size: x-large; cursor: pointer">Code review</h1>
        <div>
          <button v-if="!loggedIn.isLoggedIn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</button>
          <RouterLink v-if="loggedIn.isLoggedIn" class="btn btn-secondary me-3" to="/profile">내 정보</RouterLink>
          <button v-if="loggedIn.isLoggedIn" class="btn btn-secondary" @click="logout">로그아웃</button>
        </div>
      </div>
    </nav>

    <Login id="loginModal"/>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Login from "@/views/Login.vue";
import {useLoggedIn} from "@/stores/counter.js";


const isLoggedIn = ref(false);
const router = useRouter();

const loggedIn = useLoggedIn();

const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("name");
  isLoggedIn.value = false;
  loggedIn.offLogin();
  alert("로그아웃 되었습니다.");
  router.push('/');
};

watch(
    () => loggedIn.isLoggedIn, // 감시할 대상
    (newLoggedIn, oldLoggedIn) => {
      // 변화가 감지될 때 실행할 코드
      if (newLoggedIn) {
        isLoggedIn.value = true;
      } else {
        //console.log('사용자가 로그아웃했습니다.')
        isLoggedIn.value = false;
      }
    }
)
onMounted(() => {
  // 페이지 로드 시 sessionStorage에 저장된 token을 기준으로 isLoggedIn 초기화
  loggedIn.isLoggedIn = !!sessionStorage.getItem("isLoggedIn");
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
