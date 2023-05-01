/**
 * Formats the input date string for display.
 * @example date is today => hh:mm
 *          date yesterday => Month day hh:mm
 *          date last year => Month day year hh:mm
 * @param date Date for formatting
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const today = new Date();
  const date = new Date(dateString);

  let formattedDate = '';
  if (date.toDateString() !== today.toDateString()) {
    formattedDate = `${date.toLocaleString('default', {
      month: 'short'
    })} ${date.getDate()}`;
    if (date.getFullYear() !== today.getFullYear()) {
      formattedDate = `${formattedDate} ${date.getFullYear()}`;
    }
  }
  formattedDate = `${formattedDate} ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  return formattedDate;
};

/**
 * Formats the input duration in milliseconds for display in the format:
 * Xhr Ymin Zsec. If duration is greater than 1 hour seconds are not displayed.
 * @example 2hours 30mins, 4mins 21secs.
 * @param duration Duration in milliseconds
 * @returns Formatted duration string.
 */
export function formatTime(duration: number) {
  const portions: string[] = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + 'hr');
    duration = duration - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + 'min');
    duration = duration - minutes * msInMinute;
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0 && hours < 1) {
    portions.push(seconds + 'sec');
  }

  return portions.join(' ');
}
