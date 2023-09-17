enum SyntacticSymbol {
    // TEXTO
    INTEGER,
    NUMERIC_OPERATOR = 69,
    END_OF_LINE = 10,//NOVA LINHA
    END_OF_INPUT = 3,// FIM DE TEXTO

    // Atribuição
    ASSIGNMENT = 11,// atribuição '='

    //OPERAÇÕES
    ADD = 21,// Adição '+'
    SUBTRACT = 22, //Subtração '-'
    MULTIPLY = 23,// Multiplicação '*'
    DIVIDE = 24,// Divisão '/'
    MODULO = 25,// Resto de Divisão '%'

    //COMPARAÇÕES
    EQ = 31,// Comparação '=='
    NE = 32,// Comparação '!='
    GT = 33,// Comparação '>'
    LT = 34,// Comparação '<'
    GE = 35,// Comparação '>='
    LE = 36,// Comparação '<='

    //PALAVRAS RESERVADAS
    VARIABLE = 41,// Identificador de variavel
    REM = 61,// Palavra reservada 'rem' para comentarios
    INPUT = 62,//Palavra reservada 'input' para receber informação do usuario
    LET = 63,// Palavra reservada 'let' para declaraçãp
    PRINT = 64,// Palavra reservada 'print' para mostrar infromação na tela
    GOTO = 65,// Palavra reservada 'goto' para ir ate linha especifica
    IF = 66,// Palavra reservada 'if' para para condicionais
    END = 67,// Palavra reservada 'end' para declaração de fim de codigo

    SINGLE_PARAM_FUNC,
}

export default SyntacticSymbol
