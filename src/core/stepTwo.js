import {EstimatedIncome} from "./stepOne";
import {Matrix, STATES, STRATS} from "./settings";

const statesCount = STATES.length;
const stratsCount = STRATS.length;

// MaxFullEstimatedIncome[state]

export const runStepTwo = (
    estimatedIncome,
    prevMaxFullEstimatedIncome,
    P
) => {
    const maxFullEstimatedIncome = [];
    const d = [];

    for (let state = 0; state < statesCount; state++) {
        const localResult = [];

        for (let strat = 0; strat < stratsCount; strat++) {
            localResult.push(+calcFullEstimatedIncome(estimatedIncome, strat, state, P, prevMaxFullEstimatedIncome).toFixed(2))
        }

        let maxIndex = 0;

        for (let i = 0; i < localResult.length; i++) {
            if (localResult[maxIndex] < localResult[i]) maxIndex = i;
        }

        maxFullEstimatedIncome.push(localResult[maxIndex]);
        d.push(maxIndex)
    }

    return {maxFullEstimatedIncome, d};
};

const calcFullEstimatedIncome = (
    estimatedIncome,
    strat,
    state,
    P,
    prevMaxFullEstimatedIncome
) => {

    let sum = 0;

    for (let stateIndex = 0; stateIndex < statesCount; stateIndex++) {
        sum += P[strat][state][stateIndex] * prevMaxFullEstimatedIncome[stateIndex]
    }

    return estimatedIncome[state][strat] + sum;
};