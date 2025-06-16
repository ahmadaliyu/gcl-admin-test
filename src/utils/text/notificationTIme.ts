export const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000); // 1 year
  if (interval >= 1) return `${interval}yr ago`;
  interval = Math.floor(seconds / 2592000); // 1 month
  if (interval >= 1) return `${interval}M ago`;
  interval = Math.floor(seconds / 86400); // 1 day
  if (interval >= 1) return `${interval}d ago`;
  interval = Math.floor(seconds / 3600); // 1 hour
  if (interval > 1) return `${interval}h ago`;
  interval = Math.floor(seconds / 60); // 1 minute
  if (interval > 1) return `${interval}m ago`;
  return `${seconds} s ago`;
};
