<template>
    <div>
        <h2>{{ turn }}님의 턴입니다.</h2>
        <!--<table-component :table-data="tableData" /> -->

        <table-component>
            <!-- 컴포넌트에 slot에 보낼 vue 소스  -->
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td
                    @click="onClickTd(rowIndex, cellIndex)"
                    v-for="(cellData, cellIndex) in rowData"
                    :key="cellIndex"
                >
                    {{ cellData }}
                </td>
            </tr>
        </table-component>

        <div>
            <h2 v-if="result">{{ result }}</h2>
        </div>
    </div>
</template>
<script>
import store from "./store";
import { mapState } from "vuex";
import {
    SET_RESULT,
    CLICK_CELL,
    CHANGE_TURN,
    RESET_GAME,
    SET_TURN_CNT,
} from "./store";
import TableComponent from "./TableComponent.vue";

export default {
    components: { TableComponent },
    store,
    computed: {
        ...mapState(["tableData", "result", "turn", "turnCnt"]),
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
    methods: {
        init() {
            this.tableData = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ];
            this.turn = "O";
            this.turnCnt = 0;
        },
        onClickTd(rowIndex, cellIndex) {
            //this.result = "";
            this.$store.commit(SET_RESULT, ""); // 뮤테이션이름, 파라미터

            let nowTurn = this.turn;

            console.log("nowTurn", nowTurn);

            if (
                this.tableData[rowIndex][cellIndex] != "O" &&
                this.tableData[rowIndex][cellIndex] != "X"
            ) {
                if (this.turn == "O") {
                    //this.turnCnt += 1;

                    this.$store.commit(SET_TURN_CNT, this.turnCnt + 1);
                }

                //this.$set(this.tableData[rowIndex], cellIndex, this.turn);
                this.$store.commit(CLICK_CELL, {
                    row: rowIndex,
                    cell: cellIndex,
                });

                //this.turn = nowTurn === "O" ? "X" : "O";
                this.$store.commit(CHANGE_TURN);
            } else {
                alert("상대방이 선택한 칸입니다.");
                return false;
            }

            // ← → ↑ ↓ ↖ ↘ ↙ ↗ 순서

            var dy = [
                0, 0, 0, 0, 0, -2, -1, 0, 1, 2, -2, -1, 0, 1, 2, 2, 1, 0, -1,
                -2,
            ];

            var dx = [
                -2, -1, 0, 1, 2, 0, 0, 0, 0, 0, -2, -1, 0, 1, 2, -2, -1, 0, 1,
                2,
            ];

            var check = [
                [0, 1, 2, 3, 4], // ← →
                [5, 6, 7, 8, 9], // ↑ ↓
                [10, 11, 12, 13, 14], // ↖ ↘
                [15, 16, 17, 18, 19], //↙ ↗
            ];

            for (var i = 0; i < check.length; i++) {
                let count = 0;

                for (var j = 0; j < check[i].length; j++) {
                    let index = check[i][j];

                    if (
                        0 <= dy[index] + rowIndex &&
                        dy[index] + rowIndex <= 2 &&
                        0 <= dx[index] + cellIndex &&
                        dx[index] + cellIndex <= 2
                    ) {
                        console.log(
                            nowTurn,
                            i,
                            dy[index] + rowIndex,
                            dx[index] + cellIndex,
                            this.tableData[dy[index] + rowIndex][
                                dx[index] + cellIndex
                            ]
                        );
                        if (
                            this.tableData[dy[index] + rowIndex][
                                dx[index] + cellIndex
                            ] === nowTurn
                        ) {
                            count += 1;
                        }
                    }
                }
                console.log(count);
                if (count === 3) {
                    //this.result = "승리자는 " + nowTurn + "님 입니다.";

                    this.$store.commit(
                        SET_RESULT,
                        "승리자는 " + nowTurn + "님 입니다."
                    );

                    //this.init();
                    this.$store.commit(RESET_GAME);
                } else if (this.turnCnt == 5) {
                    //this.result = "무승부 입니다.";
                    this.$store.commit(SET_RESULT, "무승부 입니다.");
                    //this.init();
                    this.$store.commit(RESET_GAME);
                }
            }
        },
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