<template>
    <div>
        <table-component :table-data="tableData" />
        <div>
            <h2 v-if="result">{{ result }}</h2>
            <h2>{{ turn }}님의 턴입니다.</h2>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import TableComponent from "./TableComponent";
export default {
    components: {
        TableComponent,
    },
    data() {
        return {
            tableData: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ],
            turn: "O",
            turnCnt: 0,
            result: "",
        };
    },
    methods: {
        onChageData: function (rowIndex, cellIndex, turn) {
            // this.tableData[1][0] = 'X'; //동작하지 않음 인덱스로 접근 시 문제
            this.$set(this.tableData[rowIndex], cellIndex, turn); //Vue.set(this.tableData[1], 0, "X");
        },
    },
    computed: {},
    methods: {},
    mounted() {},
    beforeDestroy() {},
};
</script>
<style>
Table {
    width: 300px;
    height: 300px;
    border: 1px solid #444444;
}
Table > tr,
td {
    border: 1px solid #444444;
    text-align: center;
    font-size: 20px;
    height: 30px;
    width: 30px;
}
</style>