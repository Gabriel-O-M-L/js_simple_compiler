import SyntacticSymbol from "./SyntacticSymbol";
import Token from "../lexical/Token";
import SyntacticInput from "./SyntacticInput";
import TokenType from "../lexical/TokenType";


export default class SyntacticAnalyzer {

    private error1 = "expect variable";
    private error2 = "expect attribution";
    private error3 = "expected operator";
    private error4 = "expected operating";
    private error7 = "expected expression";
    private error8 = "invalid operator";
    private error9 = "unknown error";
    private correct: boolean;
    private tokens: Token[];
    private currentToken: Token;
    static ASSIGNABLE = [TokenType.VARIABLE, TokenType.INTEGER]
    static EXCLUSIVE_LINE_REQUIRED = [SyntacticSymbol.REM, SyntacticSymbol.END, SyntacticSymbol.END_OF_LINE, SyntacticSymbol.GOTO, SyntacticSymbol.IF, SyntacticSymbol.VARIABLE]
    static REQUIRES_INTEGER_OR_VARIABLE = [SyntacticSymbol.ADD, SyntacticSymbol.SUBTRACT, SyntacticSymbol.MULTIPLY, SyntacticSymbol.DIVIDE, SyntacticSymbol.MODULO, SyntacticSymbol.EQ, SyntacticSymbol.NE, SyntacticSymbol.GT, SyntacticSymbol.LT, SyntacticSymbol.GE, SyntacticSymbol.LE]
    /**
     * Contains things that need closing like:
     * 1 + 2
     * "1" and "+" and "2" will be added to the stack
     * or: a < 10
     * @private
     */
    private stack: Token[]

    /**
     * Original list of tokens
     * @private
     */
    private tokensOriginal: Token[];
    private symbols: Map<string, number>;
    private symbolEntries: [string, number][];
    private hasReachedEnd: boolean = false;
    private isOnIf: boolean;

    constructor(tokens: Token[], symbols: Map<string, number>) {
        this.tokens = tokens;
        this.tokensOriginal = tokens;
        this.symbols = symbols
    }


    get isCorrect() {
        return this.correct
    }

    parseTokens() {
        while (this.tokens.length > 0) {
            const current = this.shift()
            if (current.type == TokenType.END_OF_INPUT && this.hasReachedEnd) {
                return
            }

            const next = new SyntacticInput(this.tokens[0])
            const currentInput = new SyntacticInput(current)

            this.checkForInconclusiveOperator(next)
            const symbol = currentInput.getSymbol();
            this.throwIfSymbolIsInvalid(symbol)
            this.throwIfStackIsNotEmpty(symbol)
            this.throwIfStackIsEmpty(symbol)


            switch (symbol) {
                case SyntacticSymbol.END_OF_LINE ://NOVA LINHA
                    this.handleEndOfLine()
                    break
                // Atribuição
                case SyntacticSymbol.ASSIGNMENT :// atribuição '='
                    this.handleAssignment(next)
                    break

                //OPERAÇÕES
                case SyntacticSymbol.ADD :// Adição '+'
                case SyntacticSymbol.SUBTRACT : //Subtração '-'
                case SyntacticSymbol.MULTIPLY :// Multiplicação '*'
                case SyntacticSymbol.DIVIDE :// Divisão '/'
                case SyntacticSymbol.MODULO :// Resto de Divisão '%'
                //COMPARAÇÕES
                case SyntacticSymbol.EQ :// Comparação '=='
                case SyntacticSymbol.NE :// Comparação '!='
                case SyntacticSymbol.GT :// Comparação '>'
                case SyntacticSymbol.LT :// Comparação '<'
                case SyntacticSymbol.GE :// Comparação '>='
                case SyntacticSymbol.LE :// Comparação '<='
                    this.handleOperation(next)
                    break
                case SyntacticSymbol.IF:
                    this.isOnIf = true
                    break
                //PALAVRAS RESERVADAS
                case SyntacticSymbol.VARIABLE :// Identificador de variavel
                    this.stack.push(current)
                    break
                case SyntacticSymbol.INTEGER :// Identificador de variavel
                    this.stack.push(current)
                    break
                case SyntacticSymbol.GOTO: // HAS TO RECIEVE NUMBER
                    this.handleGOTO(next)
                    break
                case SyntacticSymbol.REM: // IGNORA LINHA
                    this.handleComment(next)
                    break
                case SyntacticSymbol.END:
                    this.handleEnd()
                    break
            }
        }
    }

    /**
     *                     |
     *                     V
     * EXAMPLE: let a = 10 + REM COMMENT HERE
     * @param symbol
     */
    throwIfStackIsNotEmpty(symbol: SyntacticSymbol) {
        if (SyntacticAnalyzer.EXCLUSIVE_LINE_REQUIRED.includes(symbol) && this.stack.length > 0) {
            this.throwError("Unexpected end of line")
        }
    }

    checkForInconclusiveOperator(next: SyntacticInput) {
        switch (next.getSymbol()) {
            case SyntacticSymbol.ADD :
            case SyntacticSymbol.SUBTRACT :
            case SyntacticSymbol.MULTIPLY :
            case SyntacticSymbol.DIVIDE :
            case SyntacticSymbol.MODULO :
            case SyntacticSymbol.EQ :
            case SyntacticSymbol.NE :
            case SyntacticSymbol.GT :
            case SyntacticSymbol.LT :
            case SyntacticSymbol.GE :
            case SyntacticSymbol.LE :
                this.stack.push(this.currentToken, next.token)
                break
        }
    }

    shift() {
        const first = this.tokens[0]
        this.tokens.splice(0, 1)
        this.currentToken = first
        return first
    }

    private throwError(message: string) {
        this.correct = false;
        const token = this.currentToken;
        throw new Error(` Syntactic analysis error: \n- LINE: ${token.line}\n- COLUMN: ${token.column}\n- MESSAGE: ${message}`);
    }

    private handleEnd() {
        if (this.tokens[0] == null && this.tokens[0].type !== TokenType.END_OF_INPUT || this.stack.length > 0) {
            this.throwError("Unexpected end of file")
        }

        this.hasReachedEnd = true
    }

    private handleComment(next: SyntacticInput) {
        // IGNORES EVERYTHING UNTIL NEW LINE COMES
        let nextToken = next.token
        while (nextToken.type != TokenType.END_OF_INPUT) {
            nextToken = this.shift()
        }
    }

    private handleGOTO(next: SyntacticInput) {
        if (next.getSymbol() !== SyntacticSymbol.INTEGER) {
            this.throwError("Expected integer but found otherwise")
        }

        if (!this.isOnIf) {
            this.throwError("Expected condition statement before GOTO, this will cause an infinite loop")
        }
    }

    private findSymbol(address: number) {
        if (!this.symbolEntries) {
            this.symbolEntries = Array.from(this.symbols.entries())
        }

        const entry = this.symbolEntries.find(([_, add]) => add === address)
        if (!entry)
            return null
        return entry[0]
    }

    static addOnIndex(arr: any[], values: any[], index: number = 0) {
        const copy = [
            ...arr.slice(0, index),
            ...values,
            ...arr.slice(index)
        ]
        arr.length = 0
        arr.push(...copy)
    }

    private handleEndOfLine() {
        if (this.stack.length > 0 && !SyntacticAnalyzer.ASSIGNABLE.includes(this.stack[this.stack.length - 1].type)) {
            this.throwError("Expected assignable but found otherwise")
        }

        if (this.isOnIf && this.stack.length === 0) {
            this.throwError("Expected expression but found otherwise")
        }

        this.isOnIf = false
        // END OF LINE, HAS TO CLEAN STACK
        this.stack.length = 0
    }

    private handleAssignment(next: SyntacticInput) {
        if (this.stack.length == 0 || this.stack[0].type != TokenType.VARIABLE || !SyntacticAnalyzer.ASSIGNABLE.includes(next.token.type)) {
            this.throwError("Expected assignable but found otherwise")
        }

        // VALID EXPRESSION UNTIL NOW
        this.stack.length = 0
    }

    private throwIfStackIsEmpty(symbol: SyntacticSymbol) {
        if (SyntacticAnalyzer.REQUIRES_INTEGER_OR_VARIABLE.includes(symbol) && this.stack.length === 0) {
            this.throwError("Expected assignable but found otherwise")
        }
    }

    /**
     * TokenType error
     * @param symbol
     * @private
     */
    private throwIfSymbolIsInvalid(symbol: SyntacticSymbol) {
        if (symbol == null) {
            this.throwError("Unexpected error")
        }
    }

    private handleOperation(next: SyntacticInput) {
        if (!SyntacticAnalyzer.ASSIGNABLE.includes(next.token.type) || !SyntacticAnalyzer.ASSIGNABLE.includes(this.stack[this.stack.length - 1].type)) {
            this.throwError("Expected variable or integer but found otherwise")
        }
    }
}
