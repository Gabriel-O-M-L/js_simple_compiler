import Token from "../lexical/Token";
import TokenType from "../lexical/TokenType";
import SyntacticSymbol from "./SyntacticSymbol";

export default class SyntacticInput {
    private readonly _token: Token

    constructor(token: Token) {
        this._token = token
    }

    static fromToken(type: TokenType, line: number, column: number) {
        return new SyntacticInput(new Token(type, -1, line, column))
    }

    getSymbol(): SyntacticSymbol {
        const tokenType = this._token.type;
        switch (tokenType) {
            case TokenType.LET:
                return SyntacticSymbol.VARIABLE
            case TokenType.INTEGER :
                return SyntacticSymbol.INTEGER
            case TokenType.INPUT :// Accepts only variable
            case TokenType.PRINT :// Accepts variable or number
                return SyntacticSymbol.SINGLE_PARAM_FUNC
            case TokenType.ERROR:
                return null
        }
        return null
    }

    get token() {
        return this._token
    }
}
