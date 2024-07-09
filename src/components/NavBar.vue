<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1 class="navbar-brand m-2" style="font-size: x-large">Code review</h1>
        <button v-if="!isLoggedIn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</button>
        <button v-if="isLoggedIn" class="btn btn-primary" @click="logout">로그아웃</button>
      </div>
    </nav>

    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">로그인</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <a @click="loginWithOAuth2">
                  <img style="width: 100%" src="../../images/google_signup.png" alt="img">
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 끝 -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false);
const router = useRouter();

const loginWithOAuth2 = () => {
  try {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  } catch (error) {
    console.error('OAuth2 로그인 실패:', error);
  }
  router.push("/");
};

const logout = () => {
  sessionStorage.removeItem("token");
  isLoggedIn.value = false;
  alert("로그아웃 되었습니다.");
  router.push('/');
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
