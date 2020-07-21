import {t} from 'ttag';

const WEEK_DAYS = {
  Monday: t`Monday`,
  Tuesday: t`Tuesday`,
  Wednesday: t`Wednesday`,
  Thursday: t`Thursday`,
  Friday: t`Friday`,
  Saturday: t`Saturday`,
  Sunday: t`Sunday`,
}

export function day(day_) {
  if (WEEK_DAYS.hasOwnProperty(day_)){
    return WEEK_DAYS[day_];
  }
  return day_;
};

/* Convert a date (YYYY-MM-DD) to the locale format */
export function date(date_, locale='en-US'){
  // Since a date without a time will be in UTC, the timeZone used for output should
  // also be UTC. If not specified, the timezone of the user will be used, iow, a meeting
  // late Monday evening EST would show as Tuesday in CEST.
  // TODO - this translation is dynamic, while the rest of the translation is static
  //      - it's baked in when webpack builds it
  let localDate = new Date(date_).toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  })
  return localDate;
}

/* takes time formatted as hh:mm:ss and outputs it without seconds in the locale format */
export function time(time_){
  let [h,m,s] = time_.split(':');
  let now = new Date();
  now.setHours(h);
  now.setMinutes(m);
  return now.toLocaleTimeString('en-US', {hour: 'numeric', minute:'2-digit'});
}

const LANGUAGES = {
  "en": {
    "name":"English",
    "nativeName":"English"
  },
  "fi": {
    "name":"Finnish",
    "nativeName":"suomi, suomen kieli"
  },
  "fr": {
    "name":"French",
    "nativeName":"français, langue française"
  },
  "de": {
    "name":"German",
    "nativeName":"Deutsch"
  },
  "pl": {
    "name":"Polish",
    "nativeName":"polski"
  },
  "pt": {
    "name":"Portuguese",
    "nativeName":"Português"
  },
  "ro": {
    "name":"Romanian, Moldavian, Moldovan",
    "nativeName":"română"
  },
  "es": {
    "name":"Spanish; Castilian",
    "nativeName":"español, castellano"
  },
};

export function isoCodeToLangName(code){
  if (LANGUAGES.hasOwnProperty(code)){
    return LANGUAGES[code].nativeName;
  }
  return code;
}
