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
        onClickTd() {
            console.log(this.rowIndex, this.cellIndex);
            //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;

            // → ↘ ↓ ↙ ← ↖ ↑ ↗ 순서
            var dx = [1, 2, 2, 1, 0, 0, -1, -2, -1, -2, 0, 0, 1, 2];
            var dy = [0, 0, -2, -1, -1, -2, -1, -2, 0, 0, -1, -2, 1, 2];

            for (var i = 0; i < dx.length; i++) {
                if (
                    this.cellIndex + dx[i] <= 2 &&
                    this.rowIndex + dy[i] <= 2 &&
                    this.cellIndex + dx[i] >= 0 &&
                    this.rowIndex + dy[i] >= 0
                ) {
                    console.log(
                        this.rowIndex + dy[i],
                        this.cellIndex + dx[i],
                        this.$root.$data.tableData[this.rowIndex + dy[i]][
                            this.cellIndex + dx[i]
                        ]
                    );
                }
            }

            this.$set(
                this.$root.$data.tableData[this.rowIndex],
                this.cellIndex,
                this.$root.$data.turn
            );

            console.log(this.$root.$data.tableData);

            this.$root.$data.turn = this.$root.$data.turn === "O" ? "X" : "O";

            this.$root.$data;
        },
    },
};
</script>
