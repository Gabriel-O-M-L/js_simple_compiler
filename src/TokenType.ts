enum TokenType{
    LF = 10, //NOVA LINHA
    ETF = 3, // FIM DE TEXTO
    // Atribuição
    ATR = 11, // atribuição '='
    // OPERAÇÕES
    ADD = 21, // Adição '+'
    SUB = 22, // Subtração '-'
    MUL = 23, // Multiplicação '*'
    DIV = 24, // Divisão '/'
    RES = 25, // Resto de Divisão '%'
    // COMPARAÇÕES
    EQ = 31, // Comparação '=='
    NE = 32, // Comparação '!='
    GT = 33, // Comparação '<'
    LT = 34, // Comparação '>'
    GE = 35, // Comparação '>='
    LE = 36, // Comparação '<='
    //PALAVRAS RESERVADAS
    VARIABLE = 41, // Identificador de variavel
    INTEGER = 51, // Identificador de variavel numerica inteira
    REM = 61, // Palavra reservada 'rem' para comentarios
    INPUT = 62, // Palavra reservada 'input' para receber informação do usuario
    LET = 63, // Palavra reservada 'let' para declaraçãp
    PRINT = 64, // Palavra reservada 'print' para mostrar infromação na tela
    GOTO = 65, // Palavra reservada 'goto' para ir a para uma linha especifica
    IF = 66, // Palavra reservada 'if' para condicionais
    END = 67, // Palavra reservada 'end' para a indicar a o fim do codigo
    ERROR = 99 // Palvra de identificação de erro
};
