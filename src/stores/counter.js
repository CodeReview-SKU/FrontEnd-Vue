import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoggedIn = defineStore('login', {
  state: () => ({
    isLoggedIn: ref(null)
  }),
  actions: {
    setLogin() {
      this.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', 'true');
    },
    offLogin() {
      this.isLoggedIn = false;
      sessionStorage.removeItem('isLoggedIn');
    },
    initializeFromStorage() {
      const storedValue = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = storedValue === 'true';
    }
  },
  getters: {
    // computed 속성으로 isLoggedIn 값을 반환합니다.
    computedIsLoggedIn() {
      return this.isLoggedIn;
    }
  }
})

