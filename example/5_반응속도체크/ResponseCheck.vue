<template>
    <div>
        <!--<div id="screen" v-bind:class="status">{{ message }}</div>-->
        <div id="screen" :class="status" @click="onClickDiv">
            {{ message }}
        </div>
        <div>
            <div>
                평균시간 :
                {{ result.reduce((a, c) => a + c, 0) / result.length || 0 }}
                ms
            </div>
            <button @click="onReset">리셋</button>
        </div>
    </div>
</template>
<script lang="ts">
let timeout;
let startTime;
let endTime;
export default {
    data: {
        status: "waiting",
        message: "클릭해서 시작하세요.",
        result: [],
        avrage: "",
    },
    methods: {
        onReset() {
            this.status = "waiting";
            this.result = [];
        },
        onClickDiv() {
            if (this.status === "waiting") {
                this.message = "초록색이 되면 클릭하세요";
                this.status = "ready";
                timeout = setTimeout(() => {
                    this.status = "now";
                    this.message = "지금클릭";
                    startTime = new Date();
                }, 800 - Math.ceil(Math.random() * 400));
            } else if (this.status === "ready") {
                clearTimeout(timeout);
                this.status = "waiting";
                this.message =
                    "너무 빨리 클릭하셨습니다! 초록색이 된 후에 클릭하세요.";
            } else if (this.status == "now") {
                endTime = new Date();
                this.status = "waiting";
                this.message = "클릭해서 시작하세요";
                this.result.push(endTime - startTime);
            }
        },
    },
};
</script>
<style scoped>
#screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
}
#screen.waiting {
    background-color: aqua;
}
#screen.ready {
    background-color: pink;
}
#screen.now {
    background-color: greenyellow;
}
</style>