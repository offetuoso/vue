<template>
  <div>
    <h1>{{result}}</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button type="submit">입력</button>
    </form>
    <div>시도: </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        value: '', // 입력
        result: '', // 결과
      }
    },
    methods: {
      onSubmitForm() {

	   }
    }
  };
</script>

<style>
</style>