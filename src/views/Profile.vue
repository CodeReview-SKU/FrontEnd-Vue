<template>
  <div class="container mt-5 mb-5">
    <div class="card">
      <div class="card-header bg-secondary text-white">
        내 프로필
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <img src="https://via.placeholder.com/150" alt="프로필 이미지" class="img-fluid rounded-circle mb-3">
            <h4>{{member.name}}</h4>
          </div>
          <div class="col-md-8">
            <h5>기본 정보</h5>
            <ul class="list-group">
              <li class="list-group-item"><strong>이름:</strong> {{member.name}}</li>
              <li class="list-group-item"><strong>소셜 로그인:</strong> {{member.accountProvider ? member.accountProvider : "없음"}}</li>
            </ul>

            <h5 class="mt-3">작성한 글</h5>
            <ul class="list-group" v-for="board in boardList" :key="board.id">
              <li class="list-group-item link-offset-1-hover d-flex justify-content-between" @click="goToDetail(board.id)"><strong>{{board.title}}</strong>{{ board.content }}
                <button class="badge bg-secondary" @click.stop="deleteBoard(board.id)">삭제</button>
              </li>
            </ul>

            <h5 class="mt-5">작성한 댓글</h5>
            <ul class="list-group" v-for="comment in commentList" :key="comment.id">
              <li class="list-group-item d-flex justify-content-between"><strong>{{comment.board.title}}</strong> {{ comment.content }}
                <button class="badge bg-secondary" @click.stop="deleteComment(comment.id)">삭제</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const member = ref({});
const boardList = ref([]);
const commentList = ref([]);

const router = useRouter();

function goToDetail(id) {
  router.push({ path : `/detail/${id}` });
}

const getMember = () => {
  const memberId = sessionStorage.getItem('name');
  const token = sessionStorage.getItem('token');
  axios.get(`http://localhost:8080/member/detail/${memberId}`, {headers: {Authorization : "Bearer " + token}})
      .then(res => {
        member.value = res.data;
        console.log(member.value);
      })
      .catch(e => {
        console.log(e);
      });
}



const getBoardList = () => {
  const memberId = sessionStorage.getItem('name');
  const token = sessionStorage.getItem('token');
  axios.get(`http://localhost:8080/board/list/${memberId}`, {headers: {Authorization : "Bearer " + token}})
      .then(res => {
        boardList.value = res.data;
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      })
}

const getCommentList = () => {
  const memberId = sessionStorage.getItem('name');
  const token = sessionStorage.getItem('token');

  axios.get(`http://localhost:8080/comment/member/${memberId}`,{headers: {Authorization : "Bearer " + token}})
      .then(res => {
        console.log(res.data);
        commentList.value = res.data;
      })
      .catch(e => {
        console.log(e);
      })
}

const deleteBoard = (id) => {
  const token = sessionStorage.getItem('token');

  axios.delete(`http://localhost:8080/board/delete/${id}`, {headers: {Authorization : "Bearer " + token}})
      .then(res => {
        alert('게시물이 삭제 되었습니다.');
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      })
}

const deleteComment = (id) => {
  const token = sessionStorage.getItem('token');

  axios.delete(`http://localhost:8080/comment/delete/${id}`, {headers: {Authorization : "Bearer " + token}})
      .then(res => {
        alert('댓글이 삭제 되었습니다.');
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      })
}


onMounted(() => {
getMember();
getBoardList();
getCommentList();
})
</script>

<style scoped>
.card {
  max-width: 800px;
  margin: 0 auto;
}
</style>
