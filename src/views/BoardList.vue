<script setup>
import Navbar from '../components/NavBar.vue'
import axios from "axios";
import {ref, onMounted, watch} from 'vue';
import {useRouter} from "vue-router";
import {useLoggedIn} from "@/stores/counter.js";

const list = ref([]);
const router = useRouter();
const isLoggedIn = ref(false);
const loggedIn = useLoggedIn();


const getList = () => {
  axios.get("/api/board/list")
      .then((res) => {
        list.value = res.data;
        console.log(list.value);
      })
      .catch(e => {
        console.log(e);
      })
}
function goToDetail(id) {
  router.push({ path : `/detail/${id}` });
}

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

onMounted( () => {
  getList();
  loggedIn.isLoggedIn = !!sessionStorage.getItem("isLoggedIn");
})

</script>

<template>
  <div class="container mt-4">
    <table class="table table-hover">
      <thead class="table-dark">
      <tr class="text-center">
        <th>작성자</th>
        <th>제목</th>
        <th>카테고리</th>
        <th>작성 일자</th>
        <th>좋아요 수</th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-center" style="cursor: pointer" v-for="post in list" :key="post.id" @click="goToDetail(post.id)">
          <td>{{ post.name }}</td>
          <td>{{ post.title }}</td>
          <td>{{post.category}}</td>
          <td>{{setDate(post.write_date)}}</td>
          <td>{{post.likeCount}}</td>
      </tr>
      </tbody>
    </table>
    <RouterLink v-if="loggedIn.isLoggedIn" to="/create" class="btn btn-primary" >글쓰기</RouterLink>

  </div>

</template>

<style scoped>

</style>