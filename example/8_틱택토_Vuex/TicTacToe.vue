<template>
    <div>
        <h2>{{ turn }}님의 턴입니다.</h2>
        <table-component :table-data="tableData" />
        <div>
            <h2 v-if="result">{{ result }}</h2>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import store from "./store";
import TableComponent from "./TableComponent";
export default {
    store,
    components: {
        TableComponent,
    },
    computed: {
        ...mapState(["result", "turn", "turnCnt"]),
        /*...mapState({
            Result: (state) => state.result, //화살표 함수에서는 this 사용 불가
            turnState(state) {
                return state.turn;
            },
        }),*/
        /*,
        result() {
            return this.$store.state.result;
        },
        turn() {
            return this.$store.state.turn;
        },
        turnCnt() {
            return this.$store.state.turnCnt;
        },*/
    },
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