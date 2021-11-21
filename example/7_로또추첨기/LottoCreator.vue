<template>
    <div>
        <div>당첨숫자</div>
        <div id="result">
            <lotto-ball
                v-for="(ball, index) in createdBalls"
                :key="index"
                v-bind:number="ball"
            ></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" v-bind:number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickButton">한번더</button>
    </div>
</template>
<script>
import LottoBall from "./LottoBall.vue";
const timeouts = [];

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
        onClickButton() {
            this.createdNumbers = getCreatedBalls();
            this.createdBalls = [];
            this.bonus = null;
            this.showBalls();
        },
        showBalls() {
            for (let i = 0; i < this.createdNumbers.length - 1; i++) {
                timeouts[i] = setTimeout(() => {
                    this.createdBalls.push(this.createdNumbers[i]);
                }, (i + 1) * 1000);
            }
            timeouts[timeouts.length] = setTimeout(() => {
                this.bonus = this.createdNumbers[6];
                this.redo = true;
            }, 7000);
        },
    },
    mounted() {
        this.showBalls();
    },
    beforeDestroy() {
        console.log(timeouts);
        timeouts.forEach((t) => {
            clearTimeout(t);
        });
    },
    watch: {
        /*
        bonus(value, oldValue) {
            console.log(value, oldValue);
            if (value === null) {
                this.showBalls();
            }
        },
         */
    },
};
</script>
<style>
</style>