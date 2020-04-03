const digitWeightsBC = [2, 4, 8, 5, 10, 9, 7, 3];

export enum Province {
    BC, ON
}

function getRandom(len = 10): string {
    return Math.random().toFixed(len).split('.')[1];
}

function generateHinBC(): string {
    return "9" + getRandom(9);
}

function generateHinON(): string {
    return getRandom();
}

export function validateBC(hin: string): boolean {
    const checkSumDigit = parseInt(hin.substring(9,10), 10);

    let sum = 0;

    Array.from(hin.substring(1,9)).forEach((digit, i) => {
        const element = parseInt(digit, 10);
        sum += (element * digitWeightsBC[i]) % 11;
    });

    return (11 - (sum % 11)) === checkSumDigit;
}

export function validateON(hin: string): boolean {
    let sum = 0;
    const checkSumDigit = parseInt(hin.charAt(9), 10);
    Array.from(hin.substring(0, 9)).forEach((digitStr, index) =>
    {
        let digit = parseInt(digitStr, 10);

        if ((index % 2) === 0)
        {
            const doubled = digit * 2;
            digit = (Math.floor(doubled / 10)) + (doubled % 10);
        }
        sum += digit;
    });
    return (checkSumDigit === ((10 - (sum % 10)) % 10));

}

export function generateHin(province: Province = Province.BC): string {
    const isBC = province == Province.BC;

    while (true) {
        const hin = isBC ? generateHinBC() : generateHinON();

        if ((isBC && validateBC(hin)) || (!isBC && validateON(hin))) {
            return hin;
        }
    }
}

