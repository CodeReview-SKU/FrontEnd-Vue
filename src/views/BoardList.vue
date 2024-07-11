<script setup>
import Navbar from '../components/NavBar.vue'
import axios from "axios";
import { ref, onMounted } from 'vue';
import {useRouter} from "vue-router";

const list = ref([]);
const router = useRouter();
const isLoggedIn = ref(false);
const getList = () => {
  axios.get("http://localhost:8080/board/list")
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

onMounted( () => {
  getList();
  if(sessionStorage.getItem("token")) {
    isLoggedIn.value = true;
  }
})

</script>

<template>
  <div class="container mt-4">
    <table class="table table-hover">
      <thead>
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
          <td>{{ post.member.name }}</td>
          <td>{{ post.title }}</td>
          <td>{{post.category}}</td>
          <td>{{post.write_date}}</td>
          <td>{{post.likeCount}}</td>
      </tr>
      </tbody>
    </table>
    <RouterLink v-if="isLoggedIn" to="/create" class="btn btn-primary" >글쓰기</RouterLink>

  </div>

</template>

<style scoped>

</style>