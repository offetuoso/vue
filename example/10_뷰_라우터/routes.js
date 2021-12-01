import Vue from "vue";
import VueRouter from "vue-router";
import NumberBaseball from "../4_숫자야구/NumberBaseball";
import ResponseCheck from "../5_반응속도체크/ResponseCheck";
import RockPaperScissors from "../6_가위바위보/RockPaperScissors";
import LottoCreator from "../7_로또추첨기/LottoCreator";
import TicTacToe from "../8_틱택토/TicTacToe";
import MineSweeper from "../9_지뢰찾기/MineSweeper";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/number-baseball", component: NumberBaseball },
        { path: "/response-check", component: ResponseCheck },
        { path: "/rock-paper-scissors", component: RockPaperScissors },
        { path: "/lotto-creator", component: LottoCreator },
        { path: "/tic-tac-toe", component: TicTacToe },
        { path: "/mine-sweeper", component: MineSweeper },
    ],
});
