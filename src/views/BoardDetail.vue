<template>
  <div class="container mb-5">
    <div class="container mt-5">
      <div v-if="data">
        <h1 class="mb-4">{{ data.title }}</h1>
        <p class="container">{{ data.content }}</p>
        <h4>소스코드</h4>
        <div class="container mb-4" v-if="data.source_code">
          <!-- highlight.js를 사용하여 코드 강조 -->
          <pre><code class="java" v-html="hljs.highlightAuto(data.source_code).value"></code></pre>
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

    <CommentCreate v-if="isLoggedIn" />
    <div class="comment-list mt-4">
      <h2 class="mb-3">댓글</h2>
      <div v-if="comments">
        <ul class="list-group">
          <li v-for="(comment, index) in comments" :key="index" class="list-group-item">
            <strong>{{ comment.member.name }}</strong>
            <small class="text-muted m-2">{{ comment.createDate }}</small>
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
import hljs from 'highlight.js';
import java from 'highlight.js/lib/languages/java.js'
import 'highlight.js/styles/github-dark.css'
import CommentCreate from "@/views/CommentCreate.vue";
hljs.initHighlightingOnLoad();
hljs.registerLanguage('java', java);
const route = useRoute();
const isLoggedIn = ref(false);
const data = ref();
const comments = ref([]);

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

onMounted(() => {
  getData();
  getComment();
  if (sessionStorage.getItem("token")) {
    isLoggedIn.value = true;
  }
});



onMounted(() => {

});
</script>



<style scoped>
@import "highlight.js/styles/github-dark.css";
</style>
