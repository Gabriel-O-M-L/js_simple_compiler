enum SyntacticSymbol {
    ATR = "ATR" ,// terminal - operador de atribuicao '='
    ADD = "ADD" , // terminal - operador aritmetico de adicao '+'
    SUB = "SUB", // terminal - operador aritmetico de subtracao '-'
    MUL = "MUL", // terminal - operador aritmetico de multiplicacao '*'
    DIV = "DIV", // terminal - operador aritmetico de divisao inteira '/'
    IDF = "IDF", // terminal - operando numerico inteiro/operando variavel
    ETX = "ETX", // terminal - delimitador fim de texto
    VAR = "VAR"
}
export default SyntacticSymbol