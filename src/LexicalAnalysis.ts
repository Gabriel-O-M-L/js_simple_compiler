import State from "./State";
import Token from "./Token";
import TOKENS from "./TOKENS";

export default class LexicalAnalysis {
    private error: boolean
    currentState: State
    source: string;
    symbolTable = new Map<string, number>();
    tokens: Token[];

    parser(source: string): boolean {
        this.source = source;
        this.tokens = []
        this.symbolTable.clear();
        this.error = false
        this.currentState = State.q0

        for (const token of TOKENS) {
            if (token.states.includes(this.currentState)) {
                // TODO - IMPLEMENT HERE

                this.currentState = token.nextState
            }
        }
        return this.error;
    }

}