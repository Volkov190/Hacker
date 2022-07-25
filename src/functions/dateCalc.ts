export default (time: number): string => {
  const date = new Date(time * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
