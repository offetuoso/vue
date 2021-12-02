<template>
    <div>
        <h2>숫자야구</h2>
        <form @submit.prevent="onSubmitForm">
            <input
                type="number"
                id="answer"
                ref="answer"
                v-model="value"
                minlength="4"
                maxlength="4"
            />
            <button type="submit">입력</button>
        </form>
        <div>
            {{ question }}
            <p>남은시도 : {{ 10 - tries.length }}</p>
            <ul>
                <li v-for="(item, index) in tries" :key="index">
                    {{ item.try }} : {{ item.result }}
                </li>
            </ul>

            <!-- <p>정답 : {{ question }}</p> -->
        </div>
    </div>
</template>
<script lang="ts">
const getQuestion = () => {
    let arr = new Array();
    while (arr.length != 4) {
        var num = Math.ceil(Math.random() * 9);
        if (!arr.includes(num)) {
            arr.push(num);
        }
    }
    return arr;
};

export default {
    data() {
        return {
            tries: [],
            value: "",
            result: "",
            question: getQuestion(),
        };
    },
    methods: {
        onSubmitForm(e) {
            let ckecked;
            let answer = e.target.answer.value;
            let findTriedNumber = (answer) => {
                let result = false;
                for (var i = 0; i < this.tries.length; i++) {
                    if (this.tries[i].try == answer) {
                        result = true;
                    }
                }

                return result;
            };

            if (answer.length != 4) {
                alert("4자리 숫자를 입력해 주세요");
                this.value = "";
                this.$refs.answer.focus();
                return false;
            } else if (findTriedNumber(answer)) {
                alert(answer + "는 이미 시도했습니다.");
                this.value = "";
                this.$refs.answer.focus();
                return false;
            }

            //console.log(this.tries);
            //console.log(this.tries.length);
            //console.log(this.tries[0]);
            ckecked = this.checkQuestion(answer);
            this.tries.push({
                try: ckecked.try,
                result: ckecked.result,
            });

            if (ckecked.result == "스트라이크") {
                alert("맞췄습니다.");
                this.question = getQuestion();
                this.tries = [];
            } else if (this.tries.length >= 10) {
                alert(
                    "정답은 " +
                        this.question +
                        "였습니다. \n게임을 다시 시작합니다."
                );
                this.question = getQuestion();
                this.tries = [];
            }

            this.value = "";
            this.$refs.answer.focus();
        },
        checkQuestion(answer) {
            let answers = answer.split("");
            let questions = this.question;
            let s_cnt = 0;
            let b_cnt = 0;
            let result = "";

            for (var i = 0; i < answers.length; i++) {
                if (parseInt(answers[i]) == parseInt(questions[i])) {
                    s_cnt++;
                } else if (questions.includes(parseInt(answers[i]))) {
                    b_cnt++;
                }
            }
            if (s_cnt == 4) {
                result = "스트라이크";
            } else if (s_cnt == 0 && b_cnt == 0) {
                result = "아웃";
            } else {
                result = s_cnt + "스트라이크 " + b_cnt + "볼";
            }

            return { try: answer, result: result };
        },
    },
};
</script>
<style>
</style>