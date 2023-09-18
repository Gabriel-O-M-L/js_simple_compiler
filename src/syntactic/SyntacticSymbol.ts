enum SyntacticSymbol {
    // TEXTO
    LET,
    INTEGER,
    END_OF_LINE,
    END_OF_INPUT,

    // Atribuição
    ASSIGNMENT,

    //OPERAÇÕES
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE,
    MODULO,

    //COMPARAÇÕES
    EQ,
    NE,
    GT,
    LT,
    GE,
    LE,

    //PALAVRAS RESERVADAS
    VARIABLE,
    REM,
    INPUT,
    PRINT,
    GOTO,
    IF,
    END,
}

export default SyntacticSymbol
