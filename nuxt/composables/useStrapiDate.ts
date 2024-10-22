const pad = (n: number) => String(n).padStart(2, '0');

export default (input?: string | Date): string => {
  // If there is an input pass it to new Date constructor, otherwise create a new Date
  const date = input ? new Date(input) : new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
