<template>
    <table>
        <tr-component
            v-for="(rowData, rowIndex) in tableData"
            :row-index="rowIndex"
            :key="rowIndex"
        >
        </tr-component>
    </table>
</template>

<script>
import TrComponent from "./TrComponent";
import { mapGetters, mapState } from "vuex";
export default {
    components: {
        TrComponent,
    },
    computed: {
        ...mapState({
            tableData: (state) => state.tableData,
        }),
        /*
        tableData() {
            return this.$store.state.tableData;
        },*/
        ...mapGetters({
            turnMessage: (getters) => getters.turnMessage,
        }),
        /*turnMessage() {
            return this.$store.getters.turnMessage;
        },*/
    },
};
</script>
