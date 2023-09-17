import Token from "./Token";
import TokenType from "./TokenType";
import Lexeme from "./Lexeme";
import SyntaticSymbol from "./SyntaticSymbol";
import lexemTyper from "./TokenType";
export default class SyntaticInput{
    lexeme: Lexeme
    SyntacticSymbol : SyntaticSymbol

    public SyntaticInput(character:  string, type: TokenType, column: number,line: number){
        this.lexeme = new Lexeme(character,type,line,column)
    }
    public getSymbolS(): SyntaticSymbol
        {
            let lexemTyper: TokenType
            lexemTyper = this.lexeme.type

            if(TokenType.ASSIGNMENT == lexemTyper)
            {
                return this.SyntacticSymbol.;
            }

            if(TokenType.ADD == lexemTyper)
            {
                return this.SyntacticSymbol.ADD;
            }

            if(TokenType.SUBTRACT == lexemTyper)
            {
                return this.SyntacticSymbol.;
            }

            if(TokenType.MULTIPLY == lexemTyper)
            {
                return this.SyntacticSymbol.MUL;
            }

            if(TokenType.DIVIDE == lexemTyper)
            {
                return this.SyntacticSymbol.DIV;
            }

            if(TokenType.INTEGER == lexemTyper)
            {
                return this.SyntacticSymbol.IDF;
            }

            if(TokenType.VARIABLE == lexemTyper)
            {
                return this.SyntacticSymbol.IDF;
            }
            if(TokenType.ETX == lexemTyper)
            {
                return this.SyntacticSymbol.ETX;
            }

            return null;
        }


}