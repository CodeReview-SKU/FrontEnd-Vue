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

<template>
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
</template>

<style scoped>

</style>