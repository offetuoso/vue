<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('rock')">바위</button>
            <button @click="onClickButton('scissors')">가위</button>
            <button @click="onClickButton('paper')">보</button>
        </div>
        <div>{{ result }}</div>
        <div>현재 {{ score }} 점</div>
    </div>
</template>
<script lang="ts">
const rspCoords = {
    rock: "0",
    scissors: "-245px",
    paper: "-520px",
};
let interval;
export default {
    data: {
        imgCoord: rspCoords.rock,
        result: "",
        score: 0,
    },
    computed: {
        computedStyleObject() {
            return {
                background: `URL("./images/RPS.jpg") ${this.imgCoord} `,
            };
        },
    },
    methods: {
        onReset() {
            interval = setInterval(() => {
                if (this.imgCoord === rspCoords.rock) {
                    this.imgCoord = rspCoords.scissors;
                } else if (this.imgCoord === rspCoords.scissors) {
                    this.imgCoord = rspCoords.paper;
                } else {
                    this.imgCoord = rspCoords.rock;
                }
            }, 100);
        },
        onClickButton(status) {
            clearInterval(interval);
            if (this.imgCoord == rspCoords.rock && status == "paper") {
                this.score = parseInt(this.score) + 100;
                this.result = "승리";
            } else if (
                this.imgCoord == rspCoords.rock &&
                status == "scissors"
            ) {
                this.score = parseInt(this.score) - 100;
                this.result = "패배";
            } else if (
                this.imgCoord == rspCoords.scissors &&
                status == "rock"
            ) {
                this.score = parseInt(this.score) + 100;
                this.result = "승리";
            } else if (
                this.imgCoord == rspCoords.scissors &&
                status == "paper"
            ) {
                this.score = parseInt(this.score) - 100;
                this.result = "패배";
            } else if (
                this.imgCoord == rspCoords.paper &&
                status == "scissors"
            ) {
                this.score = parseInt(this.score) + 100;
                this.result = "승리";
            } else if (this.imgCoord == rspCoords.paper && status == "rock") {
                this.score = parseInt(this.score) - 100;
                this.result = "패배";
            }

            setTimeout(() => {
                this.onReset();
            }, 1000);
        },
    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
        this.onReset();
    },
    beforeUpdate() {
        console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    beforeDestroy() {
        console.log("beforeDestroy");
    },
    destroyed() {
        console.log("destroyed");
    },
};
</script>
<style>
#computer {
    width: 280px;
    height: 310px;
    background-position: 0 0;
}
</style>