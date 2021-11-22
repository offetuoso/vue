<template>
    <table>
        <tr-component
            v-for="(rowData, rowIndex) in tableData"
            :row-data="rowData"
            :row-index="rowIndex"
            :key="rowIndex"
        >
        </tr-component>
    </table>
</template>

<script>
import TrComponent from "./TrComponent";
export default {
    props: {
        tableData: Array,
    },
    components: {
        TrComponent,
    },
};
</script>
