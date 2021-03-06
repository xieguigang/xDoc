﻿namespace CodeEditor.Search {

    export const NA: number = 100000000000;

    /**
     * Term for suggestion
    */
    export class term {

        /**
         * @param id 这个term在数据库之中的id编号
        */
        constructor(public id: number | string, public term: string) {
            this.id = id;
            this.term = term;
        }

        /**
         * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
        */
        public dist(input: string): number {
            return term.indexOf(this.term, input);
        }

        public static indexOf(term: string, input: string): number {
            var i = term.indexOf(input);

            if (i == -1) {
                return NA;
            } else {
                return Math.abs(input.length - term.length);
            }
        }
    }

    export class scoreTerm {

        public score: number;
        public term: term;

        constructor(term: term, score: number) {
            this.term = term;
            this.score = score;
        }
    }
}