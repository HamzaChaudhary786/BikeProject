import { URL_REGEX } from '../constants';

export function validateAndEnsureHttps(link: string) {
  // Regular expression to check if the link starts with "http://" or "https://"
  const urlRegex = /^(https?:\/\/)/;

  // Check if the link starts with "https://"
  if (!urlRegex.test(link)) {
    // If not, prepend "https://"
    link = 'https://' + link;
  }

  if (link.endsWith('/')) {
    link = link.slice(0, -1);
  }
  // Validate the link using a more comprehensive URL regular expression
  const validUrlRegex = URL_REGEX;

  if (validUrlRegex.test(link)) {
    // The link is valid
    return link;
  } else {
    // The link is not valid
    throw 'Invalid link format';
  }
}
