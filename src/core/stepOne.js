import {Matrix, STATES, STRATS} from "./settings";

const statesCount = STATES.length;
const stratsCount = STRATS.length;

export const runStepOne = (P, I) => {
    const result = [];
    for (let state = 0; state < statesCount; state++) {
        const stateResult = [];
        for (let strat = 0; strat < stratsCount; strat++) {
            stateResult.push(+calcQ(strat, state, P, I).toFixed(2))
        }

        result.push(stateResult);
    }

    return result;
};

const calcQ = (strat, state, P, I) => {
    let sum = 0;

    for (let i = 0; i < statesCount; i++) {
        sum += P[strat][state][i] * I[strat][state][i]
    }

    return sum
};