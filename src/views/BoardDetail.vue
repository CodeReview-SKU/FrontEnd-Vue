<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const data = ref();
const comments = ref();
const getData = () => {
  axios.get(`http://localhost:8080/board/detail/${route.params.id}`)
      .then(res => {
        data.value = res.data;
        console.log(data.value);
      })
      .catch(e => {
        console.log(e);
      })
}
const getComment = () => {
  axios.get(`http://localhost:8080/comment/board/${route.params.id}`)
      .then(res => {
        comments.value = res.data;
        console.log(comments.value);
      })
      .catch(e => {
        console.log(e);
      })
}
onMounted( () => {
  getData();
  getComment();
})

</script>

<template>
  <div class="container">

  <div class="container mt-5">
    <h1 class="mb-4">게시물 상세 페이지</h1>
    <div v-if="data">
      <h2>{{ data.title }}</h2>
      <p>{{ data.content }}</p>
      <router-link to="/" class="btn btn-primary">목록으로 돌아가기</router-link>
    </div>
    <div v-else>
      <p>게시물을 찾을 수 없습니다.</p>
    </div>
  </div>

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
        <p class="text-center">댓글이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>