import TokenType from "../lexical/TokenType";
import State from "./State";

const INTEGERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export default [
    {
        states: [State.q0, State.q5, State.q6, State.q7, State.q8, State.q9, State.q10, State.q11, State.q12, State.q99],
        type: TokenType.VARIABLE,
        tokens: ['a', 'b', 'c', 'd', 'f', 'h', 'j', 'k', 'm', 'n', 'o', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        nextState: State.q4
    },
    {
        states: [State.q0, State.q1, State.q5, State.q6, State.q7, State.q8, State.q9, State.q10, State.q11, State.q12, State.q99],

        type: TokenType.INTEGER,
        tokens: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        nextState: State.q1
    },
    {
        states: [State.q0, State.q1, State.q2, State.q3, State.q4, State.q5, State.q6, State.q7, State.q8, State.q9, State.q10, State.q11, State.q12, State.q13, State.q14, State.q15, State.q16, State.q17, State.q18, State.q19, State.q20, State.q21, State.q22, State.q23, State.q24, State.q25, State.q26, State.q27, State.q28, State.q29, State.q30, State.q31, State.q32, State.q99,
        ],
        tokens: [0],
        nextState: State.q4
    },

    {
        states: [State.ANY],
        tokens: [' '],
        nextState: State.NONE
    },
    {
        states: [State.q0,],
        tokens: ['\n'],
        nextState: State.q3
    },


    {
        states: [State.q0,],
        tokens: ['r'],
        type: TokenType.VARIABLE,
        nextState: State.q14
    },

    {
        states: [State.q0,],
        tokens: ['i'],
        type: TokenType.VARIABLE,
        nextState: State.q16
    },

    {
        states: [State.q0,],
        tokens: ['l'],
        type: TokenType.VARIABLE,
        nextState: State.q20
    },

    {
        states: [State.q0,],
        tokens: ['p'],
        type: TokenType.VARIABLE,
        nextState: State.q22
    },

    {
        states: [State.q0,],
        tokens: ['g'],
        type: TokenType.VARIABLE,
        nextState: State.q26
    },

    {
        states: [State.q0,],
        tokens: ['e'],
        type: TokenType.VARIABLE,
        nextState: State.q29
    },

    {
        states: [State.q0,],
        tokens: ['+'],
        type: TokenType.ADD,
        nextState: State.q5
    },

    {
        states: [State.q0,],
        tokens: ['-'],
        type: TokenType.SUBTRACT,
        nextState: State.q5
    },

    {
        states: [State.q0,],
        tokens: ['*'],
        type: TokenType.MULTIPLY,
        nextState: State.q5
    },

    {
        states: [State.q0,],
        tokens: ['/'],
        type: TokenType.DIVIDE,
        nextState: State.q5
    },

    {
        states: [State.q0,],
        tokens: ['%'],
        type: TokenType.MODULO,
        nextState: State.q5
    },

    {
        states: [State.q0,],
        tokens: ['='],
        type: TokenType.ASSIGNMENT,
        nextState: State.q6
    },

    {
        states: [State.q0,],
        tokens: ['<'],
        type: TokenType.LT,
        nextState: State.q7
    },

    {
        states: [State.q0,],
        tokens: ['>'],
        type: TokenType.GT,
        nextState: State.q8
    },

    {
        states: [State.q0,],
        tokens: ['!'],
        type: TokenType.ERROR,
        nextState: State.q13
    },

]
