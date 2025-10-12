export function getCurrentDate(format) {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String((today.getMonth() + 1)).padStart(2, '0');
    const year = String(today.getFullYear());
    const YY = year.substring(2, 4);

    let date;

    switch (format) {
        case "YYYYMMDD":
            date = `${year}/${month}/${day}`
            break;
        case "DDMMYY":
            date = `${day}/${month}/${YY}`
            break;
        default:
            date = `${day}/${month}/${year}`
            break;
    }
    return date;
}