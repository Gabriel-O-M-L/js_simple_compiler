enum TokenType {
    LF = 10,//NOVA LINHA
    ETX = 3,// FIM DE TEXTO
    ASSIGNMENT = 11,// Atribuição
    ADD = 21,// atribuição '='
    SUBTRACT = 22,// OPERAÇÕES
    MULTIPLY = 23,// Adição '+'
    DIVIDE = 24,// Subtração '-'
    MODULO = 25,// Multiplicação '*'
    EQ = 31,// Divisão '/'
    NE = 32,// Resto de Divisão '%'
    GT = 33,// COMPARAÇÕES
    LT = 34,// Comparação '=='
    GE = 35,// Comparação '!='
    LE = 36,// Comparação '<'
    VARIABLE = 41,// Comparação '>'
    INTEGER = 51,// Comparação '>='
    REM = 61,// Comparação '<='
    INPUT = 62,//PALAVRAS RESERVADAS
    LET = 63,// Identificador de variavel
    PRINT = 64,// Identificador de variavel numerica inteira
    GOTO = 65,// Palavra reservada 'rem' para comentarios
    IF = 66,// Palavra reservada 'input' para receber informação do usuario
    END = 67,// Palavra reservada 'let' para declaraçãp
    ERROR = 99// Palavra reservada 'print' para mostrar infromação na tela
}

export default TokenType