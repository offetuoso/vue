<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td
                @click.prevent="onClick(rowIndex, cellIndex)"
                @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
                v-for="(cellData, cellIndex) in rowData"
                :key="cellIndex"
                :style="cellDataStyle(rowIndex, cellIndex)"
            >
                {{ cellDataText(rowIndex, cellIndex) }}
            </td>
        </tr>
    </table>
</template>

<script>
let timeoutId = null;
import { mapState } from "vuex";
import {
    CODE,
    OPEN_CELL,
    CLICK_MINE,
    FLAG_CELL,
    QUESTION_CELL,
    NORMALIZE_CELL,
} from "./store";
export default {
    computed: {
        ...mapState(["tableData", "halted", "openedCnt", "result"]),
        cellDataStyle() {
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]) {
                    case CODE.NORMAL:
                    case CODE.MINE:
                        return { background: "gray" };
                    case CODE.CLICKED_MINE:
                    case CODE.OPENED:
                        return { background: "white" };
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return { background: "red" };

                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return { background: "yellow" };
                    default:
                        return {};
                }
            };
        },
        cellDataText() {
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]) {
                    case CODE.MINE:
                    //return "X";
                    case CODE.NORMAL:
                    case CODE.OPENED:
                        return "";
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return "!";
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return "?";
                    case CODE.CLICKED_MINE:
                        return "펑";
                    default:
                        return this.$store.state.tableData[row][cell];
                }
            };
        },
    },
    data() {
        return {
            delay: 500,
            clicks: 0,
            timer: null,
        };
    },
    methods: {
        onClick(row, cell) {
            this.clicks++;
            if (this.clicks === 1) {
                this.timer = setTimeout(() => {
                    this.clicks = 0;
                    this.onClickTd(row, cell);
                }, this.delay);
            } else {
                clearTimeout(this.timer);
                this.clicks = 0;
                this.onRightClickTd(row, cell);
            }
        },
        onClickTd(row, cell) {
            if (this.halted) {
                return false;
            }
            console.log("onClickTd", row, cell);
            if (this.$store.state.tableData[row][cell] === CODE.NORMAL) {
                this.$store.commit(OPEN_CELL, { row, cell });
            } else if (this.$store.state.tableData[row][cell] === CODE.MINE) {
                this.$store.commit(CLICK_MINE, { row, cell });
            }
        },
        onRightClickTd(row, cell) {
            if (this.halted) {
                return false;
            }
            switch (this.$store.state.tableData[row][cell]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    return this.$store.commit(FLAG_CELL, { row, cell });
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                    return this.$store.commit(QUESTION_CELL, { row, cell });
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    return this.$store.commit(NORMALIZE_CELL, { row, cell });
                default:
                    return;
            }
        },
    },
};
</script>
