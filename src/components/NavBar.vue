<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1 class="navbar-brand m-2" style="font-size: x-large">Code review</h1>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</button>
      </div>
    </nav>

    <!-- 모달 시작 -->
    <div class="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">로그인</h5>
            <button type="button" class="btn-close" data-bs-target="#loginModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">사용자명</label>
                <input type="text" class="form-control" id="username" v-model="username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">비밀번호</label>
                <input type="password" class="form-control" id="password" v-model="password">
              </div>
              <button type="submit" class="btn btn-primary">로그인</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 끝 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const showModal = ref(false);

const showLoginModal = () => {
  showModal.value = true;
  console.log('Show modal:', showModal.value);
};

const closeLoginModal = () => {
  showModal.value = false;
  console.log('Show modal:', showModal.value);
};

const login = () => {
  // 여기에 로그인 처리 로직 추가
  console.log('Username:', username.value);
  console.log('Password:', password.value);
  closeLoginModal(); // 예제에서는 닫기만 시뮬레이션
};
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
