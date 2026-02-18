export function debounce<F extends (...args: never[]) => void>(
  func: F,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), wait);
  };
}
