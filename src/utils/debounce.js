export default function debounce(func, wait = 500) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
