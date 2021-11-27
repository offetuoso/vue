<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
    props: {
        cellIndex: Number,
        rowIndex: Number,
        rowIndex: Number,
        cellData: String,
    },
    methods: {
        init() {
            this.$root.$data.tableData = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ];
            this.$root.$data.turn = "O";
            this.$root.$data.turnCnt = 0;
        },
        onClickTd() {
            this.$root.$data.result = "";
            let nowTurn = this.$root.$data.turn;
            //console.log(this.rowIndex, this.cellIndex);
            //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;

            //console.log(tableData);

            if (
                this.$root.$data.tableData[this.rowIndex][this.cellIndex] !=
                    "O" &&
                this.$root.$data.tableData[this.rowIndex][this.cellIndex] != "X"
            ) {
                if (this.$root.$data.turn == "O") {
                    this.$root.$data.turnCnt += 1;
                }
                this.$set(
                    this.$root.$data.tableData[this.rowIndex],
                    this.cellIndex,
                    this.$root.$data.turn
                );
                this.$root.$data.turn = nowTurn === "O" ? "X" : "O";
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

            var isWinner = false;

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
                            this.$root.$data.tableData[
                                dy[index] + this.rowIndex
                            ][dx[index] + this.cellIndex]
                        );
                        if (
                            this.$root.$data.tableData[
                                dy[index] + this.rowIndex
                            ][dx[index] + this.cellIndex] === nowTurn
                        ) {
                            count += 1;
                        }
                    }
                }
                console.log(count);
                if (count === 3) {
                    this.$root.$data.result =
                        "승리자는 " + nowTurn + "님 입니다.";
                    this.init();
                } else if (this.$root.$data.turnCnt == 5) {
                    this.$root.$data.result = "무승부 입니다.";
                    this.init();
                }
            }
        },
    },
};
</script>
