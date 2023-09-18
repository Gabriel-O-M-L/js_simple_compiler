import SyntacticSymbol from "./SyntacticSymbol";
import Token from "../lexical/Token";
import SyntacticInput from "./SyntacticInput";
import TokenType from "../lexical/TokenType";
import SyntacticError from "./SyntacticError";


export default class SyntacticAnalyzer {
    private tokens: Token[];
    private currentToken: Token;
    static ASSIGNABLE = [TokenType.VARIABLE, TokenType.INTEGER]
    static EXCLUSIVE_LINE_REQUIRED = [SyntacticSymbol.REM, SyntacticSymbol.END, SyntacticSymbol.IF, SyntacticSymbol.LET]
    static REQUIRES_INTEGER_OR_VARIABLE = [SyntacticSymbol.ADD, SyntacticSymbol.SUBTRACT, SyntacticSymbol.MULTIPLY, SyntacticSymbol.DIVIDE, SyntacticSymbol.MODULO, SyntacticSymbol.EQ, SyntacticSymbol.NE, SyntacticSymbol.GT, SyntacticSymbol.LT, SyntacticSymbol.GE, SyntacticSymbol.LE]
    static FUNCTIONS = [SyntacticSymbol.GOTO, SyntacticSymbol.PRINT, SyntacticSymbol.LET, SyntacticSymbol.END_OF_LINE]
    static SIGNS = [TokenType.ADD, TokenType.SUBTRACT];

    /**
     * Contains things that need closing like:
     * 1 + 2
     * "1" and "+" and "2" will be added to the stack
     * or: a < 10
     * @private
     */
    private stack: Token[] = []
    private doneTokens: Token[] = []
    private hasReachedEnd: boolean = false;
    private isOnIf: boolean;
    private lineTokens: Token[];


    constructor(tokens: Token[]) {
        this.tokens = [...tokens];
    }

    eval() {
        this.extractLineTokens()
        while (this.tokens.length > 0) {
            const current = this.shift()
            const next = new SyntacticInput(this.tokens[0])
            const currentInput = new SyntacticInput(current)
            const symbol = currentInput.getSymbol();

            if (current.type == TokenType.END_OF_INPUT && this.hasReachedEnd) {
                return true
            }
            this.doneTokens.push(current)
            this.checkForInconclusiveOperator(next)
            this.throwIfSymbolIsInvalid(symbol)
            this.throwIfStackIsNotEmpty(symbol)
            this.throwIfStackIsEmpty(symbol)
            this.throwIfMissingExpression(symbol)
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
                    this.handleSigns(next)
                    break
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
                case SyntacticSymbol.PRINT:
                    this.handlePrint(next)
                    break
                case SyntacticSymbol.INPUT:
                    this.handlePrint(next)
                    break
                case SyntacticSymbol.IF:
                    this.stack.push(current)
                    this.isOnIf = true
                    break
                //PALAVRAS RESERVADAS
                case SyntacticSymbol.VARIABLE :// Identificador de variavel
                case SyntacticSymbol.LET :// Identificador de variavel
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
        if (!this.hasReachedEnd) {
            this.throwError(SyntacticError.EXPECTED_END)
        }
        return true
    }

    /**
     *                     |
     *                     V
     * EXAMPLE: let a = 10 + REM COMMENT HERE
     * @param symbol
     */
    private throwIfStackIsNotEmpty(symbol: SyntacticSymbol) {
        if (SyntacticAnalyzer.EXCLUSIVE_LINE_REQUIRED.includes(symbol) && this.stack.length > 0) {
            this.throwError(SyntacticError.UNEXPECTED_EOL)
        }
    }

    private checkForInconclusiveOperator(next: SyntacticInput) {
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

    private shift() {
        const first = this.tokens[0]
        this.tokens.splice(0, 1)
        this.currentToken = first
        return first
    }

    private throwError(message: string) {
        const token = this.currentToken;
        throw new SyntacticError(message, token.line, token.column);
    }

    private handleEnd() {
        if (this.tokens[0] == null && this.tokens[0].type !== TokenType.END_OF_INPUT || this.stack.length > 0) {
            this.throwError(SyntacticError.UNEXPECTED_EOL)
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
            this.throwError(SyntacticError.EXPECTED_INTEGER)
        }
    }

    private handleEndOfLine() {
        if (this.stack.length > 0 && !SyntacticAnalyzer.ASSIGNABLE.includes(this.stack[this.stack.length - 1].type)) {
            this.throwError(SyntacticError.EXPECTED_ASSIGNABLE)
        }

        if (this.isOnIf && this.stack.length === 0) {
            this.throwError(SyntacticError.EXPECTED_EXPRESSION)
        }

        this.isOnIf = false
        // END OF LINE, HAS TO CLEAN STACK
        this.stack.length = 0
    }

    private handleAssignment(next: SyntacticInput) {
        let includesVariable = false
        let includesLet = false
        this.stack.forEach(t => {
            if (t.type === TokenType.VARIABLE)
                includesVariable = true
            if (t.type === TokenType.LET)
                includesLet = true
        })
        if (!includesLet || !includesVariable || !SyntacticAnalyzer.ASSIGNABLE.includes(next.token.type) && !SyntacticAnalyzer.SIGNS.includes(next.token.type)) {
            this.throwError(SyntacticError.EXPECTED_VARIABLE_DECLARATION)
        }

        // VALID EXPRESSION UNTIL NOW
        this.stack.length = 0
        this.stack.push(this.currentToken)
    }

    private throwIfStackIsEmpty(symbol: SyntacticSymbol) {
        if (SyntacticAnalyzer.REQUIRES_INTEGER_OR_VARIABLE.includes(symbol) && this.stack.length === 0) {
            this.throwError(SyntacticError.EXPECTED_ASSIGNABLE)
        }
    }

    /**
     * TokenType error
     * @param symbol
     * @private
     */
    private throwIfSymbolIsInvalid(symbol: SyntacticSymbol) {
        if (symbol == null) {
            this.throwError(SyntacticError.UNEXPECTED_ERROR)
        }
    }

    private handleOperation(next: SyntacticInput) {
        if (!SyntacticAnalyzer.ASSIGNABLE.includes(next.token.type) || !SyntacticAnalyzer.ASSIGNABLE.includes(this.stack[this.stack.length - 1].type)) {
            this.throwError(SyntacticError.EXPECTED_ASSIGNABLE)
        }
    }

    private handlePrint(next: SyntacticInput) {
        if (next.getSymbol() !== SyntacticSymbol.VARIABLE) {
            this.throwError(SyntacticError.EXPECTED_ASSIGNABLE)
        }
    }

    private extractLineTokens() {
        const lineTokens: Token[] = []
        let isEndOfLine = false
        this.tokens.forEach((token, index) => {
            if (token.type === TokenType.END_OF_LINE) {
                isEndOfLine = true
            }
            if (isEndOfLine && token.type === TokenType.INTEGER || index === 0) {
                lineTokens.push(token)
                isEndOfLine = false
            }
        })
        this.tokens = this.tokens.filter(t => !lineTokens.includes(t))
        this.lineTokens = lineTokens// FOR TESTING IF GOTO LINE EXISTS
    }

    private handleSigns(next: SyntacticInput) {
        if (!SyntacticAnalyzer.ASSIGNABLE.includes(next.token.type)) {
            this.throwError(SyntacticError.EXPECTED_ASSIGNABLE)
        }
        const isStackEmpty = this.stack.length === 0
        const previousTokenIsNotVariable = !SyntacticAnalyzer.ASSIGNABLE.includes(this.stack[this.stack.length - 1].type)
        const previousTokenIsNotAssigment = this.stack[this.stack.length - 1].type !== TokenType.ASSIGNMENT

        if (isStackEmpty || previousTokenIsNotAssigment && previousTokenIsNotVariable) {
            this.throwError(SyntacticError.UNEXPECTED_ERROR)
        }
    }

    private throwIfMissingExpression(symbol: SyntacticSymbol) {
        const lastNodeIsIf = this.stack.length === 0 || this.stack.length > 0 && this.stack[this.stack.length -1].type === TokenType.IF
        const isFunctionNode = SyntacticAnalyzer.FUNCTIONS.includes(symbol)
        if(this.isOnIf && lastNodeIsIf && isFunctionNode){
            this.throwError(SyntacticError.EXPECTED_EXPRESSION)
        }
    }
}
