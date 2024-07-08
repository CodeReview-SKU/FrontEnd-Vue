<script setup>
import Navbar from '../components/NavBar.vue'
import axios from "axios";
import { ref, onMounted } from 'vue';
import {useRouter} from "vue-router";

const list = ref([]);
const router = useRouter();
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
})

</script>

<template>
  <div class="container mt-4">
    <table class="table table-hover">
      <thead>
      <tr>
        <th>번호</th>
        <th>회원</th>
        <th>제목</th>
      </tr>
      </thead>
      <tbody>
      <tr style="cursor: pointer" v-for="post in list" :key="post.id" @click="goToDetail(post.id)">
          <td>{{ post.id }}</td>
          <td>{{ post.member.name }}</td>
          <td>{{ post.title }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>