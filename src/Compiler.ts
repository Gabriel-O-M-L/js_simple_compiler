import SAMPLE_CODE from "../static/SAMPLE_CODE";
import LexicalAnalyzer from "./lexical/LexicalAnalyzer";
import SyntacticAnalyzer from "./syntactic/SyntacticAnalyzer";
import SyntacticError from "./syntactic/SyntacticError";

export default class Compiler {
    static compile(code: string, failSilently: boolean = false): boolean | SyntacticError {
        const lexicalInstance = new LexicalAnalyzer()
        lexicalInstance.parser(code)
        if (!lexicalInstance.error) {
            const syntacticInstance = new SyntacticAnalyzer(lexicalInstance.tokens)
            if (failSilently) {
                try {
                    return syntacticInstance.eval()
                } catch (ex) {
                    return ex
                }
            } else
                return syntacticInstance.eval()

        }
        return false
    }
}
