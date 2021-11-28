<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from "vuex";
import {
    SET_RESULT,
    CLICK_CELL,
    CHANGE_TURN,
    RESET_GAME,
    SET_TURN_CNT,
} from "./store";

export default {
    props: {
        cellIndex: Number,
        rowIndex: Number,
    },
    computed: {
        ...mapState({
            tableData: (state) => state.tableData,
            turn: (state) => state.turn,
            turnCnt: (state) => state.turnCnt,
            cellData(state) {
                return state.tableData[this.rowIndex][this.cellIndex];
            },
        }),
        /*cellData() {
            return this.$store.state.tableData[this.rowIndex][this.cellIndex];
        },
        tableData() {
            return this.$store.state.tableData;
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
        onClickTd() {
            //this.result = "";
            this.$store.commit(SET_RESULT, ""); // 뮤테이션이름, 파라미터

            let nowTurn = this.turn;

            console.log("nowTurn", nowTurn);

            if (
                this.tableData[this.rowIndex][this.cellIndex] != "O" &&
                this.tableData[this.rowIndex][this.cellIndex] != "X"
            ) {
                if (this.turn == "O") {
                    //this.turnCnt += 1;

                    this.$store.commit(SET_TURN_CNT, this.turnCnt + 1);
                }

                //this.$set(this.tableData[this.rowIndex], this.cellIndex, this.turn);
                this.$store.commit(CLICK_CELL, {
                    row: this.rowIndex,
                    cell: this.cellIndex,
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
                        0 <= dy[index] + this.rowIndex &&
                        dy[index] + this.rowIndex <= 2 &&
                        0 <= dx[index] + this.cellIndex &&
                        dx[index] + this.cellIndex <= 2
                    ) {
                        console.log(
                            nowTurn,
                            i,
                            dy[index] + this.rowIndex,
                            dx[index] + this.cellIndex,
                            this.tableData[dy[index] + this.rowIndex][
                                dx[index] + this.cellIndex
                            ]
                        );
                        if (
                            this.tableData[dy[index] + this.rowIndex][
                                dx[index] + this.cellIndex
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
