<template>
    <div>
        <input
            type="Number"
            placeholder="세로"
            :value="row"
            @change="onChangeRow"
        />
        <input
            type="Number"
            placeholder="가로"
            :value="cell"
            @change="onChangeCell"
        />
        <input
            type="Number"
            placeholder="지뢰 수"
            :value="mine"
            @change="onChangeMine"
        />
        <button @click="onClickBtn">시작</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            row: 10,
            cell: 10,
            mine: 20,
        };
    },
    methods: {
        onChangeRow(e) {
            this.row = parseInt(e.target.value);
        },
        onChangeCell(e) {
            this.cell = parseInt(e.target.value);
        },
        onChangeMine(e) {
            this.mine = parseInt(e.target.value);
        },
        onClickBtn() {
            this.$store.commit("START_GAME", {
                row: this.row,
                cell: this.cell,
                mine: this.mine,
            });
        },
    },
};
</script>
