<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import EventBus from "./EventBus";
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
            if (this.cellData) return;

            EventBus.$emit("clickTd", this.rowIndex, this.cellIndex);
        },
    },
};
</script>
