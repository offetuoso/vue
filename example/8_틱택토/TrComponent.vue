<template>
    <tr>
        <td-component
            v-for="(cellData, cellIndex) in rowData"
            :row-index="rowIndex"
            :cell-data="cellData"
            :cell-index="cellIndex"
            :key="cellIndex"
        >
        </td-component>
    </tr>
</template>

<script>
import TdComponent from "./TdComponent";
export default {
    props: {
        rowData: Array,
        rowIndex: Number,
    },
    components: {
        TdComponent,
    },
};
</script>
