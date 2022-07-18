export function convertMinutesToHours(mins: number | any) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + ' ч ' + minutes + ' мин';
};