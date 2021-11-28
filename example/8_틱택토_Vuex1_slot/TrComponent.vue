<template>
    <tr>
        <td-component
            v-for="(cellData, cellIndex) in rowData"
            :row-index="rowIndex"
            :cell-index="cellIndex"
            :key="cellIndex"
        >
        </td-component>
    </tr>
</template>

<script>
import TdComponent from "./TdComponent";
import { mapState } from "vuex";
export default {
    props: {
        rowIndex: Number,
    },
    components: {
        TdComponent,
    },
    computed: {
        ...mapState({
            rowData(state) {
                return state.tableData[this.rowIndex];
            },
        }),

        /*rowData() {
            return this.$store.state.tableData[this.rowIndex];
        },*/
    },
};
</script>
