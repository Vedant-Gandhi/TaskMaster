/**
 * @description This function accepts an end date and returns the difference between the current time and the end date in a human-readable format.
 *
 * @param {Date} dueDate The date object representing the end date.
 * @param {boolean} use24hrformat If set to true, it uses a 24-hour format for formatting.
 * @returns {string} A human-readable date format.
 */
function getHumanReadableTime(dueDate, use24hrformat) {
    const now = new Date();
    const MILLISECONDS_IN_SECOND = 1000;
    const MILLISECONDS_IN_MINUTE = 60 * MILLISECONDS_IN_SECOND;
    const MILLISECONDS_IN_HOUR = 60 * MILLISECONDS_IN_MINUTE;

    const diff = dueDate.getTime() - now.getTime();
    const diffSeconds = Math.abs(Math.floor(diff / MILLISECONDS_IN_SECOND));
    const diffMinutes = Math.abs(Math.floor(diff / MILLISECONDS_IN_MINUTE));
    const diffHours = Math.abs(Math.floor(diff / MILLISECONDS_IN_HOUR));

    const LESS_THAN_A_MINUTE = 'Less than a minute';
    const MINUTE_SUFFIX = ' minute';
    const MINUTES_SUFFIX = 's remaining';
    const PM = 'PM';
    const AM = 'AM';

    if (diffSeconds < 60) {
        return LESS_THAN_A_MINUTE;
    } else if (diffMinutes < 60) {
        // Get the number of minutes remaining.
        return `${diffMinutes} ${diffMinutes === 1 ? MINUTE_SUFFIX : MINUTES_SUFFIX}`;
    } else if (diffHours < 24) {
        // Get the number of hours remaining.
        const hoursRemaining = Math.floor(diff / MILLISECONDS_IN_HOUR);
        const minutesRemaining = Math.floor((diff % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
        if (use24hrformat) {
            // Use 24-hour format.
            const formattedHours = hoursRemaining < 10 ? `0${hoursRemaining}` : `${hoursRemaining}`;
            const formattedMinutes =
                minutesRemaining < 10 ? `0${minutesRemaining}` : `${minutesRemaining}`;
            return `${formattedHours}:${formattedMinutes}`;
        } else {
            // Use 12-hour format.
            const hours = hoursRemaining % 12 || 12;
            const ampm = hoursRemaining >= 12 ? PM : AM;
            const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
            const formattedMinutes =
                minutesRemaining < 10 ? `0${minutesRemaining}` : `${minutesRemaining}`;
            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        }
    } else {
        // Get the date and time.
        return `${dueDate.toLocaleDateString()}, ${dueDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}`;
    }
}

/**
 * Generates a unique ID combining a random number and a timestamp.
 * @returns {string} - The unique ID.
 */
function generateUniqueId() {
    // Generate a random number and convert it to a string
    const randomNumber = Math.floor(Math.random() * 1000000).toString();
    // Get the current timestamp and convert it to a string
    const timestamp = Date.now().toString();
    // Concatenate the random number and timestamp to create the unique ID
    const uniqueId = randomNumber + timestamp;
    return uniqueId;
}

function getDateDifference(dateA, dateB) {
    // Compare the dates in descending order
    if (dateA > dateB) {
        return -1;
    } else if (dateA < dateB) {
        return 1;
    } else {
        return 0;
    }
}
// Barrel export the functions.
const utils = { getHumanReadableTime, generateUniqueId, getDateDifference };

export default utils;
