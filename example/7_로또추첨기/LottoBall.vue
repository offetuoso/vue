<template>
    <div class="ball" :style="styleObject">
        {{ number }}
    </div>
</template>
<script>
export default {
    name: "LottoBall",
    props: {
        number: Number,
    }, // 부모 vue 에서 받아오는 값
    computed: {
        styleObject() {
            let background;

            if (this.number <= 10) {
                background = "yellow";
            } else if (this.number <= 20) {
                background = "blue";
            } else if (this.number <= 30) {
                background = "red";
            } else if (this.number <= 30) {
                background = "gray";
            } else {
                background = "green";
            }
            return {
                background,
            };
        },
    },
};
</script>
<style>
.ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
}
</style>