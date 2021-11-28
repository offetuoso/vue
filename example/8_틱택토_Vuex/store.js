import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex); // <<<< 뺴먹지 말고 꼭

export const SET_RESULT = 'SET_RESULT'; //오브젝트 다이나믹 프로퍼티
export const CLICK_CELL = 'CLICK_CELL'; // import {CLICK_CELL} from './store';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const SET_TURN_CNT = 'SET_TURN_CNT'; 

export default new Vuex.Store({  // import store from './store';
	state : {
		tableData: [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		],
		turn: "O",
		turnCnt: 0,
		result: "",
	}, //vue의 data와 비슷
	getters :{
		turnMessage(state){

			return state.turn +'님이 승리하셨습니다';
		}
	}, //vue의 computed와 비슷
	mutations :{
		// mutations의 함수는 대문자로 정의하는게 커뮤니티 약속
		
		//SET_RESULT(state, result){
		[SET_RESULT](state, result){
			state.result = result;
		}, 
		[CLICK_CELL](state,{row, cell}){
			Vue.set(state.tableData[row], cell,  state.turn);
		},
		[CHANGE_TURN](state){
			console.log("old",state.turn)
			state.turn = state.turn === "O" ? "X" : "O";
			console.log("new",state.turn)
		}, 
		[RESET_GAME](status){
			status.tableData = [
				["", "", ""],
				["", "", ""],
				["", "", ""],
			];
			status.turn = 'O'
			status.turnCnt = 0
		},
		[SET_TURN_CNT](state, cnt){
			state.turnCnt = cnt;
		}
	}, // state를 수정할 때 사용; 동기적으로
	actions : {

	}, // 비동기를 사용할때, 여러 뮤테이션을 연달아 수행할때
});