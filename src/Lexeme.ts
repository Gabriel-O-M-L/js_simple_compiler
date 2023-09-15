import TokenType from "./TokenType";
import Token from "./Token";

export default class Lexeme {
    private _term: string;
    private _type: TokenType;
    private _line: number;
    private _column: number;

    constructor(character: string, type: TokenType, line: number, column: number) {
        this._term = character
        this._type = type
        this._line = line
        this._column = column
    }

    append(char: string, type: TokenType) {
        this._term += char
        this._type = type
    }

    get type(): TokenType {
        return this._type;
    }

    get line(): number {
        return this._line;
    }

    get term(): string {
        return this._term
    }

    toString() {
        return "'" + this._term + "' (" + this._line + ", " + this._column + ")";
    }

    toToken(address?: number): Token {
        if (address != null) {
            return new Token(this._type, address, this._line, this._column);
        }
        return new Token(this._type, -1, this._line, this._column);
    }
}

