import TokenType from "./TokenType";
import State from "./State";

const INTEGERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export default [
    {
        states:[ State.q0, ],
        type: TokenType.VARIABLE,
        tokens: ['a', 'b', 'c', 'd', 'f', 'h', 'j', 'k', 'm', 'n', 'o', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        nextState: State.q4
    },
    {
        states:[ State.q0, ],

        type: TokenType.INTEGER,
        tokens: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        nextState: State.q1
    },
    {
        states:[ State.q0, ],
        tokens: [' '],
        nextState: State.NONE
    },
    {
        states:[ State.q0, ],
        tokens: ['\n'],
        nextState: State.q3
    },


    {
        states:[ State.q0, ],
        tokens: ['r'],
        type: TokenType.VARIABLE,
        nextState: State.q14
    },

    {
        states:[ State.q0, ],
        tokens: ['i'],
        type: TokenType.VARIABLE,
        nextState: State.q16
    },

    {
        states:[ State.q0, ],
        tokens: ['l'],
        type: TokenType.VARIABLE,
        nextState: State.q20
    },

    {
        states:[ State.q0, ],
        tokens: ['p'],
        type: TokenType.VARIABLE,
        nextState: State.q22
    },

    {
        states:[ State.q0, ],
        tokens: ['g'],
        type: TokenType.VARIABLE,
        nextState: State.q26
    },

    {
        states:[ State.q0, ],
        tokens: ['e'],
        type: TokenType.VARIABLE,
        nextState: State.q29
    },

    {
        states:[ State.q0, ],
        tokens: ['+'],
        type: TokenType.ADD,
        nextState: State.q5
    },

    {
        states:[ State.q0, ],
        tokens: ['-'],
        type: TokenType.SUBTRACT,
        nextState: State.q5
    },

    {
        states:[ State.q0, ],
        tokens: ['*'],
        type: TokenType.MULTIPLY,
        nextState: State.q5
    },

    {
        states:[ State.q0, ],
        tokens: ['/'],
        type: TokenType.DIVIDE,
        nextState: State.q5
    },

    {
        states:[ State.q0, ],
        tokens: ['%'],
        type: TokenType.MODULO,
        nextState: State.q5
    },

    {
        states:[ State.q0, ],
        tokens: ['='],
        type: TokenType.ASSIGNMENT,
        nextState: State.q6
    },

    {
        states:[ State.q0, ],
        tokens: ['<'],
        type: TokenType.LT,
        nextState: State.q7
    },

    {
        states:[ State.q0, ],
        tokens: ['>'],
        type: TokenType.GT,
        nextState: State.q8
    },

    {
        states:[State.q0, ],
        tokens: ['!'],
        type: TokenType.ERROR,
        nextState: State.q13
    },

]