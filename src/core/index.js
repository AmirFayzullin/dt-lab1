import {I, n, P, STATES, STRATS} from "./settings";
import {runStepOne} from "./stepOne";
import {runStepTwo} from "./stepTwo";



export const run = () => {
    const qMatrix = runStepOne(P, I);


    const vList = [Array.from({length: STATES.length}, () => 0)];
    const dList = [Array.from({length: STATES.length}, () => -1)];

    const result = {};

    for (let i = 0; i < n; i++) {
        const {maxFullEstimatedIncome, d: dMax} = runStepTwo(qMatrix, vList[i], P);

        vList.push(maxFullEstimatedIncome);
        dList.push(dMax.map(value => STRATS[value]));
    }

    for (let i = 0; i < STATES.length; i++) {
        for (let j = 0; j <= n; j++) {
            result[`v${STATES[i]}(n)`] = {
                ...(result[`v${STATES[i]}(n)`] ? result[`v${STATES[i]}(n)`] : {}),
                [`${j}`]: vList[j][i]
            }
        }
    }

    for (let i = 0; i < STATES.length; i++) {
        for (let j = 0; j <= n; j++) {
            result[`d${STATES[i]}(n)`] = {
                ...(result[`d${STATES[i]}(n)`] ? result[`d${STATES[i]}(n)`] : {}),
                [`${j}`]: dList[j][i]
            }
        }
    }

    console.table(result);

    return [vList, dList]
};