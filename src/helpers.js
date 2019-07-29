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

export { toTimeInputValue, toDateInputValue };
