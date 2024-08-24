<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Register from "@/views/Register.vue";
import axios from "axios";
import {useLoggedIn} from "@/stores/counter.js";

const isLoggedIn = ref(false);
const router = useRouter();

const inLogin = ref(true);
const login = useLoggedIn();
const email = ref("");
const password = ref("");

const loginWithOAuth2 = () => {
  try {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  } catch (error) {
    console.error('OAuth2 로그인 실패:', error);
  }
  router.push("/");
};

const loginWithIdPw = () => {
  axios.post('/api/member/signin',{userId : email.value, password : password.value})
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('name', res.data.name);
        login.setLogin();
        window.location.reload();
      })
      .catch(err => {
        alert("이메일 및 패스워드가 올바르지 않습니다.");
        return;
      })
}

const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("name");
  isLoggedIn.value = false;
  alert("로그아웃 되었습니다.");
  router.push('/');
};

const click = () => {
  inLogin.value = !inLogin.value;
}

const reset = () => {
  inLogin.value = true;
}

onMounted(() => {
  // 페이지 로드 시 sessionStorage에 저장된 token을 기준으로 isLoggedIn 초기화
  isLoggedIn.value = !!sessionStorage.getItem('token');
  const modal = document.getElementById('loginModal');
  modal.addEventListener('hide.bs.modal', () => {
    inLogin.value = true;
  });
});

watch(() => sessionStorage.getItem('token'), (newToken) => {
  isLoggedIn.value = !! newToken;
});
</script>

<template>
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="inLogin">

        <div class="modal-header">
          <h5 class="modal-title text-center" id="loginModalLabel">Code Review 로그인</h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="email" class="form-label">아이디:</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호:</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <div class="mb-3 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary w-100" @click="loginWithIdPw">로그인</button>
          </div>
          <hr>
          <p class="text-muted text-center">소셜계정으로 로그인</p>
          <div class="mb-1 d-flex justify-content-center">
            <a class="" @click="loginWithOAuth2">
              <img style="cursor: pointer" src="../../images/google_login.svg" alt="img">
            </a>
<!--            <a>-->
<!--              <img style="cursor: pointer" src="../../images/btn_kakao.svg" alt="img">-->
<!--            </a>-->
          </div>
        </div>
          <div class="d-flex mb-3 justify-content-center">
            <a class="text-muted me-3" style="cursor: pointer" @click="click">회원가입</a>
            <a class="text-muted me-3">|</a>
            <a class="text-muted" style="cursor: pointer;">문의하기</a>
          </div>
        </div>
        <div v-else>

          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Code Review 회원가입</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <Register/>
            <a class="text-muted m-2 d-flex justify-content-center" style="cursor: pointer" @click="click">로그인</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>