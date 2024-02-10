export default function alphaOnly(keyPressed: string) {
  const isLetter = /^[a-zA-Z]$/.test(keyPressed);
  const isControlKey = ["Backspace", "ArrowLeft", "ArrowRight"].includes(
    keyPressed
  );

  return isLetter || isControlKey;
}
