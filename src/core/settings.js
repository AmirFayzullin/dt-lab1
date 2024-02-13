// стратегии
export const STRATS = [1, 2, 3];

// состояния
export const STATES = ["У", "П"];

// P[strategy][state][state]
export const P = [
    [
        [1, 0],
        [0.1, 0.9]
    ],
    [
        [1, 0],
        [0.33, 0.67]
    ],
    [
        [1, 0],
        [0.33, 0.67]
    ]
];

// P[strategy][state][state]
export const I = [
    [
        [8.68, 0],
        [2.43, 3.29]
    ],
    [
        [16.83, 0],
        [14.11, 7.63]
    ],
    [
        [3.23, 0],
        [10.07, 7.86]
    ]
];

// количество этапов моделирования
export const n = 3;