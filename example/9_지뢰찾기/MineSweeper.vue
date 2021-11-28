<template>
    <div>
        <mine-form />
        <div>{{ timer }}</div>
        <table-component />
        <div>{{ result }}</div>
    </div>
</template>
<script>
import store, { INCREMENT_TIMER } from "./store";
import { mapState } from "vuex";
import TableComponent from "./TableComponent.vue";
import MineForm from "./MineForm.vue";

let interval;

export default {
    components: { TableComponent, MineForm },
    store,
    computed: {
        ...mapState(["timer", "result", "halted"]),
    },
    methods: {},
    watch: {
        halted(value, oldValue) {
            if (value === false) {
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER);
                }, 1000);
            } else {
                //게임중단
                clearInterval(interval);
            }
        },
    },
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
    text-align: center;
    font-size: 20px;
    height: 30px;
    width: 30px;
}
</style>