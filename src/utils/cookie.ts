/**
 * Sets a cookie with the given name, value and expiration time.
 * @param name Name of the cookie.
 * @param value Value of the cookie.
 * @param days Expiration time of the cookie in days.
 */
export const createCookie = (name: string, value: string, days: number) => {
  let expires;
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
};

/**
 * Gets the value of a cookie by name.
 * @param name Name of the cookie.
 * @returns Value of the cookie.
 */
export const getCookie = (name: string) => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(name + '=');
    if (c_start !== -1) {
      c_start = c_start + name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return decodeURIComponent(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
};
