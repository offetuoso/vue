<template>
    <div>
        <div>당첨숫자</div>
        <div id="result">
            <lotto-ball
                v-for="(ball, index) in createdBalls"
                :key="index"
                :number="5"
            ></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="7"></lotto-ball>
        <button v-if="redo">한번더</button>
    </div>
</template>
<script>
import LottoBall from "./LottoBall.vue";
function getCreatedBalls() {
    const candidate = Array(45)
        .fill()
        .map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(
            candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        );
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const createdNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
    return [...createdNumbers, bonusNumber];
}
export default {
    components: { LottoBall },
    data: {
        createdNumbers: getCreatedBalls(),
        createdBalls: [],
        bonus: null,
        redo: false,
    },
    computed: {},
    methods: {
        onClickButton(status) {},
    },
    mounted() {
        console.log("mounted");
    },
    beforeDestroy() {
        console.log("beforeDestroy");
    },
    watch: {},
};
</script>
<style>
</style>