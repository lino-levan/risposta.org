/** Get the readable time from the timestamp */
export function getReadableTime(timestamp: string) {
  const postedTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();
  const timeDifferenceInSeconds = Math.floor((currentTime - postedTime) / 1000);

  let timeAgo;
  if (timeDifferenceInSeconds < 60) {
    timeAgo = "just now";
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    timeAgo = `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    timeAgo = `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    timeAgo = `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  }

  return timeAgo;
}
