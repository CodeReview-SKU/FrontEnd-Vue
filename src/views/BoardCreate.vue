<template>
  <div class="container mt-5">
    <h2 class="mb-4">글 작성</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" class="form-control" id="title" v-model="title" required>
      </div>
<!--      <div class="mb-3">-->
<!--        <prism language="javascript">{{ jsonSample }}</prism>-->
<!--      </div>-->
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea class="form-control" id="content" rows="5" v-model="content" required></textarea>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">소스 코드</label>
        <select class="form-select" id="langs" v-model="lan" @change="highlightCode" required>
          <option v-for="lan in langs" :key="lan.value" :value="lan.value">{{ lan.label }}</option>
        </select>
        <textarea class="form-control" id="code" rows="10" v-model="code" ></textarea>
      </div>
      <div class="mb-3">
        <label for="tags" class="form-label">태그 선택</label>
        <div id="tags">
          <button
              v-for="tag in availableTags"
              :key="tag.value"
              type="button"
              class="btn"
              :class="{'btn-primary': selectedTag === tag.value, 'btn-outline-primary': selectedTag !== tag.value}"
              @click="toggleTag(tag.value)"
          >
            {{ tag.label }}
          </button>
        </div>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label mt-3">카테고리</label>
        <select class="form-select" id="category" v-model="selectedCategory" required>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">제출</button>
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";

export default {
  setup() {
    const title = ref('');
    const content = ref('');
    const lan = ref('javascript');
    const selectedTag = ref('');
    const selectedCategory = ref('');
    const id = ref();
    const code = ref('');

    const router = useRouter();

    const availableTags = [
      { label: '다이나믹 프로그래밍', value: '다이나믹 프로그래밍' },
      { label: '자료구조', value: '자료구조' },
      { label: '그래프 이론', value: '그래프 이론' },
      { label: '수학', value: '수학' },
      { label: '구현', value: '구현' },
      { label: '문자열', value: '문자열' },
      { label: '그리디', value: '그리디' },
      { label: '트리', value: '트리' },
      { label: '해시', value: '해시' },
      { label: '정렬', value: '정렬' }
    ];

    const categories = [
      '공지',
      '질문',
      '리뷰',
    ];

    const langs = [
      { label: 'JavaScript', value: 'javascript' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
      // 추가로 필요한 언어를 이곳에 추가하세요
    ];

    const toggleTag = (tag) => {
      if (selectedTag.value === tag) {
        selectedTag.value = '';
      } else {
        selectedTag.value = tag;
      }
    };

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:8080/board/detail', {
          title: title.value,
          member_id : id.value,
          content: content.value,
          source_code : code.value,
          tag: selectedTag.value,
          category: selectedCategory.value
        }, {
          headers : {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        alert('글이 성공적으로 제출되었습니다.');
        resetForm();
        await router.push('/')
      } catch (error) {
        console.error('글 제출 실패:', error);
        alert('글 제출에 실패했습니다.');
      }
    };

    const resetForm = () => {
      title.value = '';
      content.value = '';
      code.value = '';
      selectedTag.value = '';
      selectedCategory.value = '';
    };

    onMounted(() => {
      id.value = sessionStorage.getItem("name");
    });
    return {
      title,
      content,
      selectedTag,
      selectedCategory,
      handleSubmit,
      availableTags,
      categories,
      toggleTag,
      code,
      langs,
      lan,

    };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.btn {
  margin: 0.2em;
}
</style>
