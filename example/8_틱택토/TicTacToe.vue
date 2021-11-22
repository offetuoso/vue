<template>
    <table-component :table-data="tableData" />
</template>
<script>
import TableComponent from "./TableComponent";
export default {
    components: {
        TableComponent,
    },
    data() {
        return {
            tableData: [
                ["o", "x", "o"],
                ["x", "o", "x"],
                ["o", "x", "o"],
            ],
        };
    },
    computed: {},
    methods: {},
    mounted() {},
    beforeDestroy() {},
};
</script>
<style>
Table {
    width: 300px;
    height: 300px;
    border: 1px solid #444444;
}
Table > tr,
td {
    border: 1px solid #444444;
}
</style>