import Token from "../lexical/Token";
import TokenType from "../lexical/TokenType";
import SyntacticSymbol from "./SyntacticSymbol";

export default class SyntacticInput {
    private readonly _token: Token

    constructor(token: Token) {
        this._token = token
    }

    getSymbol(): SyntacticSymbol {
        if (!this._token)
            return null
        const tokenType = this._token.type;
        switch (tokenType) {
            case TokenType.LET:
                return SyntacticSymbol.LET
            case TokenType.VARIABLE:
                return SyntacticSymbol.VARIABLE
            case TokenType.INTEGER :
                return SyntacticSymbol.INTEGER
            case TokenType.INPUT :// Accepts only variable
                return SyntacticSymbol.INPUT
            case TokenType.PRINT :// Accepts variable or number
                return SyntacticSymbol.PRINT
            case TokenType.ERROR:
                return null
            case TokenType.END_OF_LINE:
                return SyntacticSymbol.END_OF_LINE
            case TokenType.END_OF_INPUT:
                return SyntacticSymbol.END_OF_INPUT
            case TokenType.ASSIGNMENT:
                return SyntacticSymbol.ASSIGNMENT
            case TokenType.ADD:
                return SyntacticSymbol.ADD
            case TokenType.SUBTRACT:
                return SyntacticSymbol.SUBTRACT
            case TokenType.MULTIPLY:
                return SyntacticSymbol.MULTIPLY
            case TokenType.DIVIDE:
                return SyntacticSymbol.DIVIDE
            case TokenType.MODULO:
                return SyntacticSymbol.MODULO
            case TokenType.EQ:
                return SyntacticSymbol.EQ
            case TokenType.NE:
                return SyntacticSymbol.NE
            case TokenType.GT:
                return SyntacticSymbol.GT
            case TokenType.LT:
                return SyntacticSymbol.LT
            case TokenType.GE:
                return SyntacticSymbol.GE
            case TokenType.LE:
                return SyntacticSymbol.LE
            case TokenType.REM:
                return SyntacticSymbol.REM
            case TokenType.GOTO:
                return SyntacticSymbol.GOTO
            case TokenType.IF:
                return SyntacticSymbol.IF
            case TokenType.END:
                return SyntacticSymbol.END
        }
        return null
    }

    get token() {
        return this._token
    }
}
