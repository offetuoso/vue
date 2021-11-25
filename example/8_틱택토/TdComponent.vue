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
