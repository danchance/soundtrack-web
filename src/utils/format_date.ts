const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;

/**
 * Formats the input date string for display.
 * @example date is today => hh:mm
 *          date yesterday => Month day hh:mm
 *          date last year => Month day year hh:mm
 * @param date Date for formatting
 * @returns Formatted date string
 */
const formatDate = (dateString: string): string => {
  const today = new Date();
  const date = new Date(dateString);

  let formattedDate = '';
  if (date.toDateString() !== today.toDateString()) {
    formattedDate = `${date.toLocaleString('default', {
      month: 'short'
    })} ${date.getDate()}`;
  }
  if (date.getFullYear() !== today.getFullYear()) {
    formattedDate = `${formattedDate} ${date.getFullYear()}`;
  }
  formattedDate = `${formattedDate} ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  return formattedDate;
};

export default formatDate;
