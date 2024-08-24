<template>
  <div class="container-fluid mt-3 mb-3 p-3">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="comment" class="form-label">댓글 작성하기</label>
        <textarea class="form-control" id="comment" rows="3" v-model="comment" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">등록</button>
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {useRoute, useRouter} from "vue-router";

export default {
  setup() {
    const comment = ref('');
    const author = ref('');
    const name = ref();
    const route = useRoute();
    const handleSubmit = async () => {
      try {
        const response = await axios.post('/api/comment/comments', {
          content: comment.value,
          name : name.value,
          board_id: route.params.id
        }, {
          headers : {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        resetForm();
        window.location.reload();
      } catch (error) {
        console.error('댓글 제출 실패:', error);
      }
    };

    const resetForm = () => {
      comment.value = '';
      author.value = '';
    };
    onMounted(() => {
      name.value = sessionStorage.getItem('name');
    })
    return {
      comment,
      author,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
