function findSpecificError(valueName, errorMessage) {
  const start = errorMessage.indexOf(valueName) + valueName.length + 2;
  const trimmedError = errorMessage.substring(start);
  const end = trimmedError.indexOf(",");
  if (end > -1) {
    return trimmedError.substring(0, end);
  }
  return trimmedError;
}

export { findSpecificError };
