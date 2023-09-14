import { string } from "mathjs";
import { TokenType } from "./TokenType";
class Lexeme
{
  private _term: string;
  private _type: TokenType;
  private _line: number;
  private _column: number;

  constructor(character,type,line,column){
    this._term = ''
    this._term = ''.concat(this._term,character)
    this._type = type
    this._line = line
    this._column = column
  }

  
  public append(chracter,type) {
    this._term = "".concat(this._term,chracter)
    this._type = type
  }
  public getTerm() :string {
    //return this._term.
  }
}

