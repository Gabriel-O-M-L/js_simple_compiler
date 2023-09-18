import {test} from '@jest/globals';
import SAMPLE_CODE from "../static/SAMPLE_CODE";
import LexicalAnalyzer from "../src/lexical/LexicalAnalyzer";
import SyntacticAnalyzer from "../src/syntactic/SyntacticAnalyzer";
import Compiler from "../src/Compiler";
import SyntacticError from "../src/syntactic/SyntacticError";
import SAMPLE_CODE_WITH_ERROR from "../static/SAMPLE_CODE_WITH_ERROR";

test('Valid code', () => {
    expect(Compiler.compile(SAMPLE_CODE)).toEqual(true)
});

test('MISSING_LET', () => {
    const exception = Compiler.compile(SAMPLE_CODE_WITH_ERROR.MISSING_LET, true) as SyntacticError
    expect(exception).toBeInstanceOf(SyntacticError)
    expect(exception.message).toEqual(SyntacticError.EXPECTED_VARIABLE_DECLARATION)
    expect(exception.line).toEqual(8)
});

test('MISSING_TARGET_LINE_GOTO', () => {
    const exception = Compiler.compile(SAMPLE_CODE_WITH_ERROR.MISSING_TARGET_LINE_GOTO, true) as SyntacticError
    expect(exception).toBeInstanceOf(SyntacticError)
    expect(exception.message).toEqual(SyntacticError.EXPECTED_INTEGER)
    expect(exception.line).toEqual(2)
});

test('MISSING_PRINT_VALUE', () => {
    const exception = Compiler.compile(SAMPLE_CODE_WITH_ERROR.MISSING_PRINT_VALUE, true) as SyntacticError
    expect(exception).toBeInstanceOf(SyntacticError)
    expect(exception.message).toEqual(SyntacticError.EXPECTED_ASSIGNABLE)
    expect(exception.line).toEqual(9)
});

test('MISSING_IF_CONDITION', () => {
    const exception = Compiler.compile(SAMPLE_CODE_WITH_ERROR.MISSING_IF_CONDITION, true) as SyntacticError
    expect(exception).toBeInstanceOf(SyntacticError)
    expect(exception.message).toEqual(SyntacticError.EXPECTED_EXPRESSION)
    expect(exception.line).toEqual(2)
});
