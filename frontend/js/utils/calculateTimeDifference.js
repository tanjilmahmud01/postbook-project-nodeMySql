function timeDifference(dateTimeString) {
  const now = new Date();
  const past = new Date(dateTimeString);

  let diffInSeconds = Math.floor((now - past) / 1000);

  const days = Math.floor(diffInSeconds / (24 * 3600));
  diffInSeconds -= days * 24 * 3600;

  const hours = Math.floor(diffInSeconds / 3600);
  diffInSeconds -= hours * 3600;

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;

  let result = "";
  if (days > 0) {
    result += `${days} day${days !== 1 ? "s" : ""}`;
  } else if (hours > 0) {
    result += `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    result += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    result += `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }

  return result;
}
