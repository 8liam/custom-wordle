export default function alphaOnlyCreate(
  event: React.KeyboardEvent<HTMLInputElement>
) {
  var key = event.keyCode;
  // Allow letters and additional necessary keys like backspace, left/right arrow, etc.
  const isLetter = key >= 65 && key <= 90; // Letters
  const isControlKey = key === 8 || key === 37 || key === 39; // Backspace, left arrow, right arrow

  if (!isLetter && !isControlKey) {
    event.preventDefault(); // Prevent non-letter inputs
  }
}
