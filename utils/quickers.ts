export function debounce(cb: (...args: any[]) => void, delay = 1000) {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
}
