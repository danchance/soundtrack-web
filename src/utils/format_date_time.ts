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
