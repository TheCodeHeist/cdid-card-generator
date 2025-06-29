export const valueToNumber = (value: any) => {
    return isNaN(Number(value)) ? 0 : Number(value);
}

export const getRqThemeClass = (rq: number) => {
    if (rq >= 80) return "theme-legendary";
    if (rq >= 65) return "theme-epic";
    if (rq >= 50) return "theme-ultra-rare";
    if (rq >= 40) return "theme-super-rare";
    if (rq >= 30) return "theme-rare";
    if (rq >= 20) return "theme-uncommon";
    return "theme-common";
}

export const getRqSymbol = (rq: number) => {
    if (rq >= 80) return "S";
    if (rq >= 65) return "A";
    if (rq >= 50) return "B";
    if (rq >= 40) return "C";
    if (rq >= 30) return "D";
    if (rq >= 20) return "E";
    return "F";
}