export const convertTime = (time: number) => {
  const s = time % 60;
  const m = Math.floor((time / 60) % 60);
  const h = Math.trunc(time / (60 * 60));

  const doubleDigits = (digit: number) =>
    digit.toString().length > 1 ? digit : `0${digit}`;

  return `${doubleDigits(h)}:${doubleDigits(m)}:${doubleDigits(s)}`;
};
