import TokenType from "./TokenType";

export default class Token {
    private _type: TokenType;
    /**
     * Represents address on
     * @private
     */
    private _symbolAddress: number;
    private _line: number;
    private _column: number;

    constructor(type: TokenType, symbolAddress: number, line: number, column: number) {
        this._type = type
        this._line = line
        this._column = column
        this._symbolAddress = symbolAddress
    }

    public get type(): TokenType {
        return this._type;
    }

    public set type(value: TokenType) {
        this._type = value;
    }

    public get symbolAddress(): number {
        return this._symbolAddress;
    }

    public set symbolAddress(value: number) {
        this._symbolAddress = value;
    }

    public get line(): number {
        return this._line;
    }

    public set line(value: number) {
        this._line = value;
    }

    public get column(): number {
        return this._column;
    }

    public set column(value: number) {
        this._column = value;
    }

    #minTwoDigits(n: number) {
        return (n < 10 ? '0' : '') + n;
    }

    toString(): string {
        return `[${this.#minTwoDigits(this.type)}, ${this.symbolAddress > -1 ? this.#minTwoDigits(this.symbolAddress) : "  "}, (${this.#minTwoDigits(this.line)}, ${this.#minTwoDigits(this.column)})]`;
    }
}
