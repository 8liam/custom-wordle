export default function encodeWordToHex(word: string) {
  return Buffer.from(word).toString("hex");
}
