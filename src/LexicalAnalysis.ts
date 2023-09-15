import Token from "./Token";
import Lexeme from "./Lexeme";
import TokenType from "./TokenType";

export default class LexicalAnalysis {
    error: boolean = false
    source: string;
    symbolTable = new Map<string, number>();
    tokens: Token[];
    lexeme: Lexeme;
    column: number = 0
    line: number = 1;
    charGenerator: Generator<string|number>

    addSymbolTable(lexeme: string): number {
        if (!this.symbolTable.has(lexeme)) {
            this.symbolTable.set(lexeme, this.symbolTable.size);
        }

        return this.symbolTable.get(lexeme);
    }


    addToken() {
        if (this.lexeme.type != TokenType.ERROR) {
            if (this.lexeme.type === TokenType.INTEGER || this.lexeme.type === TokenType.VARIABLE) {
                this.tokens.push(this.lexeme.toToken(this.addSymbolTable(this.lexeme.term)));
            } else {
                this.tokens.push(this.lexeme.toToken());
            }
        } else {
            console.error("INVALID TOKEN: ", this.lexeme.toString())
            this.error = true;
        }
    }


    * next() {
        const split = this.source.split("").reverse()
        while (split.length > 0) {
            let char = split.pop()
            if (char === "\r") {
                char = split.pop()
            }
            this.column++;
            yield char
        }
        this.source = null;
        yield 0
    }


    parser(source: string): boolean {
        this.source = source;
        this.tokens = []
        this.symbolTable.clear();
        this.error = false
        this.charGenerator = this.next()

        while (this.source != null) {
            this.q0()
        }

        return this.error;
    }


    q0() {
        const character = this.charGenerator.next().value
        switch (character) {
            case 0:
                this.q04();
                break;
            case '\n':
                this.q03();
                break;
            case ' ':
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            case '+':
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            default:
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q99();
        }
    }

    /**
     * Estado responsavel pelo reconhecimento da constante numerica inteira
     */
    q01() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.lexeme.append(character, TokenType.INTEGER);
                this.q01();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q01();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do identificador
     */
    q02() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q02();
        }
    }

    /**
     * Estado responsavel pelo reconhecimento do delimitador de nova linha
     */
    q03() {
        this.lexeme = new Lexeme('\n', TokenType.LF, this.line, this.column);
        this.addToken();
        this.line++;
        this.column = 0;
    }

    /**
     * Estado responsavel pelo reconhecimento do delimitador de fim de texto
     */
    q04() {
        this.lexeme = new Lexeme('\0', TokenType.ETX, this.line, this.column);

        this.addToken();
    }

    /**
     * Estado responsavel pelo reconhecido dos operadores aritmeticos
     * adicao (+)
     * subtracao (-)
     * multiplicacao (*)
     * divisao inteira (/)
     * resto da divisao inteira (%)
     */
    q05() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q05();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador de atribuicao (=)
     */
    q06() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            case '=':
                this.lexeme.append(character, TokenType.EQ);
                this.q09();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q06();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador relacional
     * menor que (<)
     */
    q07() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            case '=':
                this.lexeme.append(character, TokenType.LE);
                this.q10();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q07();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador relacional
     * maior que (>)
     */
    q08() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            case '=':
                this.lexeme.append(character, TokenType.GE);
                this.q11();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q08();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador relacional
     * igual a (==)
     */
    q09() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q09();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador relacional
     * maior ou igual a (>=)
     */
    q10() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q10();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador relacional
     * menor ou igual a (<=)
     */
    q11() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q11();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador relacional
     * diferente de (!=)
     */
    q12() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q12();
        }
    }

    /**
     * Estado responsavel pelo reconhecido do operador relacional
     * diferente de (!=)
     */
    q13() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '=':
                this.lexeme.append(character, TokenType.NE);
                this.q12();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q13();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada rem
     */
    q14() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            case 'e':
                this.lexeme.append(character, TokenType.ERROR);
                this.q15();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q14();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada rem
     */
    q15() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 'm':
                this.lexeme.append(character, TokenType.REM);
                this.q31();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q15();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada if
     */
    q16() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            case 'f':
                this.lexeme.append(character, TokenType.IF);
                this.q32();
                break;
            case 'n':
                this.lexeme.append(character, TokenType.ERROR);
                this.q17();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q16();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada input
     */
    q17() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 'p':
                this.lexeme.append(character, TokenType.ERROR);
                this.q18();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q17();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada input
     */
    q18() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 'u':
                this.lexeme.append(character, TokenType.ERROR);
                this.q19();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q18();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada input
     */
    q19() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 't':
                this.lexeme.append(character, TokenType.INPUT);
                this.q32();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q19();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada let
     */
    q20() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            case 'e':
                this.lexeme.append(character, TokenType.ERROR);
                this.q21();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q20();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada let
     */
    q21() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 't':
                this.lexeme.append(character, TokenType.LET);
                this.q32();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q21();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada print
     */
    q22() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            case 'r':
                this.lexeme.append(character, TokenType.ERROR);
                this.q23();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q22();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada print
     */
    q23() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 'i':
                this.lexeme.append(character, TokenType.ERROR);
                this.q24();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q23();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada print
     */
    q24() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 'n':
                this.lexeme.append(character, TokenType.ERROR);
                this.q25();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q24();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada print
     */
    q25() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 't':
                this.lexeme.append(character, TokenType.PRINT);
                this.q32();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q25();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada goto
     */
    q26() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            case 'o':
                this.lexeme.append(character, TokenType.ERROR);
                this.q27();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q26();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada goto
     */
    q27() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 't':
                this.lexeme.append(character, TokenType.ERROR);
                this.q28();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q27();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada goto
     */
    q28() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 'o':
                this.lexeme.append(character, TokenType.GOTO);
                this.q32();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q28();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada end
     */
    q29() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            case 'n':
                this.lexeme.append(character, TokenType.ERROR);
                this.q30();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q29();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada end
     */
    q30() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            case 'd':
                this.lexeme.append(character, TokenType.END);
                this.q32();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q30();
        }
    }

    /**
     * Estado responsavel pelo reconhecido da palavra reservada rem
     */
    q31() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            default:
                this.q31();
        }
    }

    /**
     * Estado responsavel pelo reconhecido das palavras reservadas
     * end
     * goto
     * if
     * input
     * let
     * print
     */
    q32() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.addToken();
                this.q04();
                break;
            case '\n':
                this.addToken();
                this.q03();
                break;
            case ' ':
                this.addToken();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q32();
        }
    }

    /**
     * Estado responsavel pelo reconhecimento do erro
     */
    q99() {
        const character = this.charGenerator.next().value

        switch (character) {
            case 0:
                this.q04();
                break;
            case '\n':
                this.q03();
                break;
            case ' ':
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.INTEGER, this.line, this.column);
                this.q01();
                break;
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'f':
            case 'h':
            case 'j':
            case 'k':
            case 'm':
            case 'n':
            case 'o':
            case 'q':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q02();
                break;
            case 'r':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q14();
                break;
            case 'i':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q16();
                break;
            case 'l':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q20();
                break;
            case 'p':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q22();
                break;
            case 'g':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q26();
                break;
            case 'e':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.VARIABLE, this.line, this.column);
                this.q29();
                break;
            case '+':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ADD, this.line, this.column);
                this.q05();
                break;
            case '-':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.SUBTRACT, this.line, this.column);
                this.q05();
                break;
            case '*':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MULTIPLY, this.line, this.column);
                this.q05();
                break;
            case '/':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.DIVIDE, this.line, this.column);
                this.q05();
                break;
            case '%':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.MODULO, this.line, this.column);
                this.q05();
                break;
            case '=':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ASSIGNMENT, this.line, this.column);
                this.q06();
                break;
            case '<':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.LT, this.line, this.column);
                this.q07();
                break;
            case '>':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.GT, this.line, this.column);
                this.q08();
                break;
            case '!':
                this.addToken();
                this.lexeme = new Lexeme(character, TokenType.ERROR, this.line, this.column);
                this.q13();
                break;
            default:
                this.lexeme.append(character, TokenType.ERROR);
                this.q99();
        }
    }
}
