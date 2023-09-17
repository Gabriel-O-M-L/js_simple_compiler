import {test} from '@jest/globals';
import SAMPLE_CODE from "../static/SAMPLE_CODE";
import LexicalAnalyzer from "../src/lexical/LexicalAnalyzer";
import SyntacticAnalyzer from "../src/syntactic/SyntacticAnalyzer";

let lexicalInstance: LexicalAnalyzer
beforeEach(() => {
    lexicalInstance = new LexicalAnalyzer()
    lexicalInstance.parser(SAMPLE_CODE)
})

test('Is compilation valid', () => {
    const syntactic = new SyntacticAnalyzer(lexicalInstance.tokens)
    syntactic.parseTokens()

    expect(syntactic.isCorrect).toBe(true);
});
