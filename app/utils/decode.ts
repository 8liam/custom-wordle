export default function decodeWordFromHex(encodedWord: string) {
  return Buffer.from(encodedWord, "hex").toString();
}
