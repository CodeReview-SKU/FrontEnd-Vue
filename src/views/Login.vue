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
  axios.post('http://localhost:8080/member/signin',{userId : email.value, password : password.value})
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
          <h5 class="modal-title" id="loginModalLabel">로그인</h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="email" class="form-label">이메일:</label>
            <input type="email" class="form-control" id="email" v-model="email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호:</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary" @click="loginWithIdPw">로그인</button>
          </div>
          <div class="mb-3">
            <a @click="loginWithOAuth2">
              <img style="width: 100%" src="../../images/google_signup.png" alt="img">
            </a>
          </div>
        </div>
          <a @click="click">회원가입</a>
        </div>
        <div v-else>

          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">회원가입</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <Register/>
            <a @click="click">로그인</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>