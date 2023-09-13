class token{
    private _typeUid: number;
    private _address: number;
    private _line: number;
    private _column: number;

    constructor(Uid,line,column,address){
        this._typeUid = Uid
        this._line = line
        this._column = column
        this._address = address
    }
    public get typeUid(): number {
        return this._typeUid;
    }
    public set typeUid(value: number) {
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

    toString() :string{
        return "[" + this.typeUid + ", , ("
        + this.line + ", " + this.column + ")]" ;
    }
}