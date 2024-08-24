<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const props = defineProps({
  data :{
    board : String,
    member : String
  }
})

const isPushed = ref(false)
const checkPushed = () => {
  const token = sessionStorage.getItem('token');
  axios.get(`/api/bookmark/get/${props.data.board}/${props.data.member}`, {headers: {Authorization : "Bearer " + token}})
      .then(res => {
        console.log(props.data.board);
        console.log(props.data.member);
        console.log(res.data);
        isPushed.value = res.data;
      })
      .catch(e => {
        console.log(e);
      })
}

const checkLike = () => {
  const token = sessionStorage.getItem('token');
  axios.post(`/api/bookmark/create`, {member : props.data.member, board : props.data.board}, {headers: {Authorization : "Bearer " + token}})
      .then(res => {
        console.log(res.data);
        isPushed.value = true;
      })
      .catch(e =>{
        console.log(e);
      })
}

const uncheckLike = () => {
  const token = sessionStorage.getItem('token');
  axios.delete(`/api/bookmark/delete/${props.data.board}/${props.data.member}`, {headers: {Authorization : "Bearer " + token}})
      .then(res => {
        console.log(res.data);
        isPushed.value = false;
      })
      .catch(e => {
        console.log(e);
      })
}
onMounted(() => {
  checkPushed();
})

</script>

<template>
  <div>
    <div v-if="isPushed" style="width: 10px;">
      <img class="small-img" src="../../images/like-active.png" @click="uncheckLike" alt="img" style="width: 30px"/>
    </div>
    <div v-else-if="!isPushed">
      <img src="../../images/like.png" @click="checkLike" alt="img" style="width: 30px">
    </div>
  </div>
</template>

<style scoped>


</style>