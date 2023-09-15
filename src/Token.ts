import TokenType from "./TokenType";

export default class Token {
    private _typeUid: TokenType;
    private _address: number;
    private _line: number;
    private _column: number;

    constructor(type: TokenType, address: number, line: number, column: number) {
        this._typeUid = type
        this._line = line
        this._column = column
        this._address = address
    }

    public get typeUid(): TokenType {
        return this._typeUid;
    }

    public set typeUid(value: TokenType) {
        this._typeUid = value;
    }

    public get address(): number {
        return this._address;
    }

    public set address(value: number) {
        this._address = value;
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
        return `[${this.#minTwoDigits(this.typeUid)}, ${this.address > -1 ? this.#minTwoDigits(this.address) : "  "}, (${this.#minTwoDigits(this.line)}, ${this.#minTwoDigits(this.column)})]`;
    }
}
