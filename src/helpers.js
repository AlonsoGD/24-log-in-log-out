const toDateInputValue = () => {
  let local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().slice(0, 10);
};

const toTimeInputValue = () => {
  let local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().slice(11, 16);
};

/** @date ISO string dates */
const ISODateStringToLocaleString = (date, dateFormat) => {
  let shortOptions = {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  let longOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  let narrowOptions = {
    weekday: "narrow",
    year: "numeric",
    month: "narrow",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  let allDigitsOptions = {
    weekday: "narrow",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };

  if (date !== undefined && date !== "") {
    if (dateFormat === "short") {
      return new Date(date).toLocaleTimeString("en-CA", shortOptions);
    } else if (dateFormat === "long") {
      return new Date(date).toLocaleTimeString("en-CA", longOptions);
    } else if (dateFormat === "narrow") {
      return new Date(date).toLocaleTimeString("en-CA", narrowOptions);
    } else if (dateFormat === "allDigits") {
      return new Date(date).toLocaleTimeString("en-CA", allDigitsOptions);
    }
  }
};

/** @date1 @date2 ISO string dates */
const elapsedTime = (date1, date2) => {
  let elapsed = (new Date(date2) - new Date(date1)) / 1000;

  if (elapsed >= 0) {
    const diff = {};

    diff.days = Math.floor(elapsed / 86400);
    diff.hours = Math.floor((elapsed / 3600) % 24);
    diff.minutes = Math.floor((elapsed / 60) % 60);
    diff.seconds = Math.floor(elapsed % 60);

    let message = `${diff.days}d ${diff.hours} h ${diff.minutes} m`;
    message = message.replace(/(?:0. )+/, "");
    return message;
  }
};

export {
  toTimeInputValue,
  toDateInputValue,
  elapsedTime,
  ISODateStringToLocaleString
};
