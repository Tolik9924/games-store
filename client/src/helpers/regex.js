export const REGEX_FULL_NAME = /^([A-Z][a-z]{1,15}) ([A-Z][a-z]{1,15})$/;
export const REGEX_EMAIL = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const REGEX_DATE_OF_BIRTH =
  /^((0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)?[0-9]{2})*$/;
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[/#?!@$%^&*-.)()]).{8,10}$/;