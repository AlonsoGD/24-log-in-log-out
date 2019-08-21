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
const ISODateStringToLocaleString = (date) => {
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  if (date !== undefined && date !== "") {
    return new Date(date).toLocaleTimeString("en-CA", options);
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
  //else {
  //   return "Elapsed time lesser than 0, i.e. specified datetime is still in the future.";
  // }
};

export {
  toTimeInputValue,
  toDateInputValue,
  elapsedTime,
  ISODateStringToLocaleString
};
