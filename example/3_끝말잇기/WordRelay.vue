<template>
    <div>
        <h3>제시어: {{ word }}</h3>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="2" maxlength="3" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>{{ result }}</div>
        <br />
        <p>사용한 단어는 사용할 수 없습니다.</p>
    </div>
</template>
<script>
let arr = new Array();
let first_word = "공부";
arr.push(first_word);

export default {
    data() {
        return {
            word: first_word,
            value: "",
            result: "",
            history: arr,
        };
    },
    methods: {
        onSubmitForm() {
            if (
                this.word.charAt(this.word.length - 1) ===
                    this.value.charAt(0) &&
                !this.history.includes(this.value)
            ) {
                this.result = "";
                this.history.push(this.value);
                this.word = this.value;
                this.value = "";
            } else if (this.history.includes(this.value)) {
                this.result = "땡, 이전에 사용한 단어입니다.";
            } else {
                this.result = "땡";
            }
        },
    },
};
</script>
<style>
</style>