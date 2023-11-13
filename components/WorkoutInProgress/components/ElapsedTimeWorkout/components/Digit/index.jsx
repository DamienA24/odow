export default function Digit({ value, last = false }) {
  const leftDigit = value >= 10 ? value.toString()[0] : "0";
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
  const point = last ? "" : " : ";
  return (
    <>
      <span>{leftDigit}</span>
      <span>
        {rightDigit} {point}
      </span>
    </>
  );
}
