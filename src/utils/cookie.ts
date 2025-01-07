export function setCookie(
  cname: string,
  cvalue: string,
  path: string,
  exMinute: number
) {
  const d = new Date();
  d.setTime(d.getTime() + exMinute * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + `;path=${path}`;
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkCookie(
  cname: string,
  successCb: () => any,
  notFoundCb: () => any
) {
  let username = getCookie(cname);
  if (username != "" || username !== null) {
    successCb;
  } else {
    notFoundCb();
  }
}

export function deleteCookie(cname: string, path: string) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}
