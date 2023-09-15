import {test} from '@jest/globals';
import SAMPLE_CODE from "../static/SAMPLE_CODE";
import LexicalAnalysis from "../src/LexicalAnalysis";
import EXPECTED_LEXICAL_OUTPUT from "./EXPECTED_LEXICAL_OUTPUT";

let lexicalInstance: LexicalAnalysis
beforeEach(() => {
    lexicalInstance = new LexicalAnalysis()
    lexicalInstance.parser(SAMPLE_CODE)
})

test('Is compilation valid', () => {
    expect(lexicalInstance.error).toBe(false);
});

test('Quantity of tokens', () => {
    expect(lexicalInstance.tokens.length).toBeGreaterThan(0);
});

test('Quantity of symbols', () => {
    expect(lexicalInstance.symbolTable.size).toBeGreaterThan(0);
});

test('Should match expected output', () => {
    expect(lexicalInstance.tokens.map(t => t.toString())).toEqual(EXPECTED_LEXICAL_OUTPUT);
});
