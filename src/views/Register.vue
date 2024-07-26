<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const user = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const router = useRouter();

const clicked = ref(false);
const clicked2 = ref(false);

const emailAvailable = ref(false);
const nameAvailable = ref(false);

const errors = ref([]);

const checkEmailAvailability = async () => {
  if (!validateEmail(user.value.email)) {
    emailAvailable.value = true;  // 유효하지 않은 이메일은 체크하지 않음
    return;
  }
  try {
    const response = await axios.get(`http://localhost:8080/member/check/email/${user.value.email}`);
    console.log(response.data);
    emailAvailable.value = response.data;
    clicked.value = true;
  } catch (error) {
    console.error('이메일 중복 확인 오류:', error);
    emailAvailable.value = false;  // 오류 시 기본적으로 사용 불가능으로 설정
  }
};

const checkNameAvailability = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/member/check/name/${user.value.username}`);
    console.log(response.data);
    nameAvailable.value = response.data;
    clicked2.value = true;
  } catch (error) {
    console.error('이름 중복 확인 오류:', error);
    nameAvailable.value = false;  // 오류 시 기본적으로 사용 불가능으로 설정
  }
};

const validateForm = () => {
  errors.value = [];

  if (!user.value.username || !nameAvailable.value) {
    errors.value.push('사용자 이름을 입력하세요.');
  }
  if (!validateEmail(user.value.email) || !emailAvailable.value) {
    errors.value.push('유효한 이메일을 입력하세요.');
  }
  if (!user.value.password) {
    errors.value.push('비밀번호를 입력하세요.');
  }
  if (user.value.password !== user.value.confirmPassword) {
    errors.value.push('비밀번호가 일치하지 않습니다.');
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitForm = () => {
  axios.post('http://localhost:8080/member/register', {name : user.value.username, userId : user.value.email, password : user.value.password})
      .then(res => {
        console.log(res.data);
        alert("회원가입 성공.");
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      })
};

</script>

<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="validateForm">
        <div class="mb-3">
          <label for="username" class="form-label">이름:</label>
          <div class="d-flex">
            <input type="text" class="form-control me-3" id="username" v-model="user.username" required>
            <button type="submit" class="btn btn-secondary " @click="checkNameAvailability">check</button>
          </div>
          <small v-if="!nameAvailable && clicked2" class="text-danger">이 닉네임은 이미 사용 중입니다.</small>
          <small v-else-if="nameAvailable && clicked2" class="text-success">이 닉네임은 사용가능 합니다.</small>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">이메일:</label>
          <div class="d-flex">
            <input type="email" class="form-control me-3" id="email" v-model="user.email" required>
            <button type="submit" class="btn btn-secondary " @click="checkEmailAvailability">check</button>
          </div>
          <small v-if="!emailAvailable && clicked" class="text-danger">이 이메일은 이미 사용 중입니다.</small>
          <small v-else-if="emailAvailable && clicked" class="text-success">이 이메일은 사용가능 합니다.</small>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">비밀번호:</label>
          <input type="password" class="form-control" id="password" v-model="user.password">
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">비밀번호 확인:</label>
          <input type="password" class="form-control" id="confirmPassword" v-model="user.confirmPassword">
        </div>
        <div v-if="errors.length" class="alert alert-danger">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <button type="submit" class="btn btn-primary" @click="submitForm">회원가입</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>