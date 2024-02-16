export function millisecondsToHoursAndMinutes(milliseconds: number) {
    // Convert milliseconds to minutes
    const totalMinutes = milliseconds / (1000 * 60);

    // Calculate hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return {
        hours: hours,
        minutes: minutes
    };
}