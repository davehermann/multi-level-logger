type tLoggable = string | unknown;

type tLogObject = tLoggable | (() => tLoggable);

export default tLogObject;
