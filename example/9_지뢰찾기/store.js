import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); // <<<< 뺴먹지 말고 꼭

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
};

const plantMine = (row, cell, mine) => {
    //console.log("plantMine",row, cell, mine) //plantMine 함수, 입력받은 row, cell, mine

    let tableData = [];
    let candidateData = [];
    const shuffleData = [];

    // row * cell 생성
    for (const i of Array(row).keys()) {
        let rowData = [];
        //console.log("row",i);
        for (const j of Array(cell).keys()) {
            //console.log("cell",j);
            rowData.push(CODE.NORMAL);
            candidateData.push({ row: i, cell: j });
        }
        tableData.push(rowData);
    }

    while (candidateData.length > 0) {
        shuffleData.push(candidateData.splice(Math.floor(Math.random() * candidateData.length), 1)[0]);
    }

    for (const i of Array(mine).keys()) {
        let data = shuffleData.splice(0, 1)[0];
        tableData[data.row][data.cell] = CODE.MINE;
    }

    // console.log(shuffleRow,shuffleCell)

    //console.log("created tableData", tableData);
    return tableData;
};

export default new Vuex.Store({
    // import store from './store';
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        result: "",
        halted: true, // 중단된 상태
        openedCount: 0,
    }, //vue의 data와 비슷
    getters: {}, //vue의 computed와 비슷
    mutations: {
        [START_GAME](state, { row, cell, mine }) {
            console.log({ row, cell, mine });
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
        },
        [OPEN_CELL](state, { row, cell }) {
            //Vue.set(state.tableData[row], cell, CODE.OPENED);
            const visit = [];

            function checkAround(row, cell) {
                // ↑ ↗ → ↘ ↓ ↙ ← ↖  순서
                let dy = [-1, -1, 0, 1, 1, 1, 0, -1];
                let dx = [0, 1, 1, 1, 0, -1, -1, -1];
                let mineCnt = 0;
                Vue.set(state.tableData[row], cell, CODE.OPENED);

                if (state.tableData[row][cell] === CODE.OPENED && !visit.includes(row + "/" + cell)) {
                    state.openedCount += 1;
                }
                console.log(state.openedCount);

                for (let i = 0; i < dy.length; i++) {
                    if (
                        0 <= dy[i] + row &&
                        dy[i] + row <= state.tableData.length - 1 &&
                        0 <= dx[i] + cell &&
                        dx[i] + cell <= state.tableData[0].length - 1
                        //&& state.tableData[dy[i] + row][dx[i] + cell] === CODE.NORMAL
                    ) {
                        switch (state.tableData[dy[i] + row][dx[i] + cell]) {
                            case CODE.MINE:
                            case CODE.FLAG_MINE:
                            case CODE.QUESTION_MINE:
                            case CODE.CLICKED_MINE:
                                mineCnt += 1;
                                visit.push(dy[i] + row + "/" + dx[i] + cell);
                            default:
                        }
                    }
                }

                if (mineCnt === 0) {
                    for (let i = 0; i < dy.length; i++) {
                        if (
                            0 <= dy[i] + row &&
                            dy[i] + row <= state.tableData.length - 1 &&
                            0 <= dx[i] + cell &&
                            dx[i] + cell <= state.tableData[0].length - 1 &&
                            !visit.includes(dy[i] + row + "/" + dx[i] + cell) &&
                            state.tableData[dy[i] + row][dx[i] + cell] === CODE.NORMAL
                        ) {
                            //console.log(dy[i] + row, dx[i] + cell);
                            visit.push(dy[i] + row + "/" + dx[i] + cell);
                            checkAround(dy[i] + row, dx[i] + cell);
                        }
                    }
                } else {
                    visit.push(row + "/" + cell);
                    Vue.set(state.tableData[row], cell, mineCnt);
                }
            }

            checkAround(row, cell);

            //console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount);
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount) {
                state.halted = true;
                state.result = "[" + state.timer + "]초 만에 클리어!!";
            }
            //console.log(state.openedCount);
        },
        [CLICK_MINE](state, { row, cell }) {
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
            state.halted = true;
        },
        [FLAG_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.NORMAL) {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            } else if (state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            }
        },
        [QUESTION_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.FLAG) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            } else if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            }
        },
        [NORMALIZE_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.QUESTION) {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            } else if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    }, // state를 수정할 때 사용; 동기적으로
    actions: {}, // 비동기를 사용할때, 여러 뮤테이션을 연달아 수행할때
});
