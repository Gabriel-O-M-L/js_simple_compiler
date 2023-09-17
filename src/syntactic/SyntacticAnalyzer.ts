import SyntacticSymbol from "./SyntacticSymbol";
import Token from "../lexical/Token";
import SyntacticInput from "./SyntacticInput";

export default class SyntacticAnalyzer {

    private error1 = "expect variable";
    private error2 = "expect attribution";
    private error3 = "expected operator";
    private error4 = "expected operating";
    private error7 = "expected expression";
    private error8 = "invalid operator";
    private error9 = "unknown error";
    private input: SyntacticInput[] = [];
    private stack: SyntacticSymbol[] = [];
    private correct: boolean;

    constructor(tokens: Token[]) {
        tokens.forEach(token => {
            this.input.push(new SyntacticInput(token));
        })
        this.correct = true;
    }

    private shift() {
        this.stack = [this.input[0].getSymbol(), ...this.stack]
        this.input.splice(0, 1);
    }

    get isCorrect() {
        return this.correct
    }

    parseTokens() {
        this.stack = [SyntacticSymbol.END_OF_INPUT]
        let process = true;
        while (process) {
            let top = this.stack[0];

            let i = 1;

            while (SyntacticSymbol.VARIABLE == top) {
                top = this.stack[i++];
            }

            let front = this.input[0].getSymbol();

            switch (top) {
                case SyntacticSymbol.NUMERIC_OPERATOR:
                    this.lineIDF(front);
                    break;
                case SyntacticSymbol.ADD:
                case SyntacticSymbol.SUBTRACT:
                case SyntacticSymbol.MULTIPLY:
                case SyntacticSymbol.DIVIDE:
                case SyntacticSymbol.MODULO:
                    this.lineMathOperator(front, top)
                    break;
                case SyntacticSymbol.END_OF_INPUT:
                    process = this.lineETX(front);
                    break;
                case SyntacticSymbol.EQ:
                    this.throwError(this.error8);
                    break;
                default :
                    this.throwError(this.error9);
                    break;
            }
        }
    }

    lineETX(front: SyntacticSymbol) {
        switch (front) {
            case SyntacticSymbol.ADD:
            case SyntacticSymbol.SUBTRACT:
            case SyntacticSymbol.MULTIPLY:
            case SyntacticSymbol.DIVIDE:
            case SyntacticSymbol.NUMERIC_OPERATOR:
                this.shift();
                break;
            case SyntacticSymbol.END_OF_INPUT:
                return false;
            case SyntacticSymbol.EQ:
                this.throwError(this.error8);

                break;
            default :
                this.throwError(this.error9);
                break;
        }
        return true;
    }

    lineMathOperator(front: SyntacticSymbol, mathSymbol: SyntacticSymbol) {
        switch (front) {
            case SyntacticSymbol.ADD:
            case SyntacticSymbol.SUBTRACT:
            case SyntacticSymbol.MULTIPLY:
            case SyntacticSymbol.DIVIDE:
            case SyntacticSymbol.MODULO:
            case SyntacticSymbol.END_OF_INPUT:
                this.reduce(SyntacticSymbol.VARIABLE, mathSymbol, SyntacticSymbol.VARIABLE)
                break;
            case SyntacticSymbol.NUMERIC_OPERATOR:
                this.shift();
                break;
            case SyntacticSymbol.EQ:
                this.throwError(this.error8);
                break;
            default :
                this.throwError(this.error9);
                break;
        }
    }


    lineIDF(front: SyntacticSymbol) {
        switch (front) {
            case SyntacticSymbol.ADD:
            case SyntacticSymbol.SUBTRACT:
            case SyntacticSymbol.MULTIPLY:
            case SyntacticSymbol.DIVIDE:

            case SyntacticSymbol.END_OF_INPUT:
                this.reduce(SyntacticSymbol.NUMERIC_OPERATOR);
                break;
            case SyntacticSymbol.NUMERIC_OPERATOR:
                this.throwError(this.error3);
                break;
            case SyntacticSymbol.EQ:
                this.throwError(this.error8);
                break;
            default :
                this.throwError(this.error9);
                break;
        }
    }

    reduce(...production: SyntacticSymbol[]) {
        if (SyntacticSymbol.NUMERIC_OPERATOR == production[0]) {
            this.stack.splice(0, 1);
            SyntacticAnalyzer.addOnIndex(this.stack, SyntacticSymbol.VARIABLE)
        } else if (SyntacticSymbol.VARIABLE == production[0]) {
            if (this.stack[0] != SyntacticSymbol.VARIABLE) {
                this.throwError(this.error4);
            } else if ((this.stack.length > 2) && (this.stack[2] != SyntacticSymbol.VARIABLE)) {
                this.throwError(this.error4);
            } else {
                this.stack.splice(0, 1);
                this.stack.splice(0, 1);
                this.stack.splice(0, 1);
                SyntacticAnalyzer.addOnIndex(this.stack, SyntacticSymbol.VARIABLE)
            }
        }
    }

    static addOnIndex(arr: any[], value: any, index: number = 0) {
        const copy = [
            ...arr.slice(0, index),
            value,
            ...arr.slice(index)
        ]
        arr.length = 0
        arr.push(...copy)
    }

    private throwError(message: string) {
        this.correct = false;
        const token = this.input[0].token;
        throw new Error(` Syntactic analysis error: \n- LINE: ${token.line}\n- COLUMN: ${token.column}\n- MESSAGE: ${message}`);
    }
}
