<template>
  <div class="container mb-5">
    <div class="container mt-5">
      <div v-if="data">
          <h1 class="mb-4 text-dark-emphasis">{{ data.title }}</h1>
          <h5 class="text-muted mb-4">{{setDate(data.write_date)}}</h5>
        <p class="container">{{ data.content }}</p>
        <h4>소스코드</h4>
        <div class="container mb-4 mt-4" v-if="data.source_code">
          <!-- highlight.js를 사용하여 코드 강조 -->
          <highlightjs
              class="rounded-3"
              :code="data.source_code"
              :autodetect="true"
          />
        </div>
        <div class="container text-muted mb-4" v-else>
          <h6>소스코드가 없습니다.</h6>
        </div>
        <router-link to="/" class="btn btn-primary">목록으로 돌아가기</router-link>
      </div>
      <div v-else>
        <p>게시물을 찾을 수 없습니다.</p>
      </div>
    </div>

    <CommentCreate v-if="loggedIn.isLoggedIn" />
    <div class="comment-list mt-4">
      <h2 class="mb-3">댓글</h2>
      <div v-if="comments">
        <ul class="list-group">
          <li v-for="(comment, index) in comments" :key="index" class="list-group-item">
            <strong>{{ comment.member.name }}</strong>
            <small class="text-muted m-2">{{ setDate(comment.createDate) }}</small>
            <p class="m-3">{{ comment.content }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <h4 class="text-center text-muted">댓글이 없습니다.</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import CommentCreate from "@/views/CommentCreate.vue";
import 'highlight.js/styles/srcery.css'
import hljsVuePlugin from "@highlightjs/vue-plugin";
import {useLoggedIn} from "@/stores/counter.js";

const route = useRoute();
const isLoggedIn = ref(false);
const data = ref();
const comments = ref([]);
const loggedIn = useLoggedIn();

const getData = () => {
  axios.get(`http://localhost:8080/board/detail/${route.params.id}`)
      .then(res => {
        data.value = res.data;
        console.log(data.value);
      })
      .catch(e => {
        console.log(e);
      });
};

const getComment = () => {
  axios.get(`http://localhost:8080/comment/board/${route.params.id}`)
      .then(res => {
        comments.value = res.data;
        console.log(comments.value);
      })
      .catch(e => {
        console.log(e);
      });
};

function setDate(date) {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear().toString().slice(-4);
  const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
  const day = ('0' + originalDate.getDate()).slice(-2);
  const hours = ('0' + originalDate.getHours()).slice(-2);
  const minutes = ('0' + originalDate.getMinutes()).slice(-2);
  const ampm = (hours / 12) ? "오후" : "오전";

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours % 12}시 ${minutes}분`;
}

const highlightjs = hljsVuePlugin.component;

onMounted(async () => {
  getData();
  getComment();
  loggedIn.isLoggedIn = !!sessionStorage.getItem("isLoggedIn");
});

</script>



<style scoped>

</style>
