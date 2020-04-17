export const stripAndRound = (str: string): number => {
    return Math.round(parseFloat(str.replace(/,/g, '')))
};