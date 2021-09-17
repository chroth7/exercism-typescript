export class SimpleCipher {
  public key: string; // oh the irony
  private keyLength = 100;

  constructor(overrideKey?: string) {
    this.key =
      overrideKey ||
      Array.from({ length: this.keyLength }, () =>
        SimpleCipher.genRandomChar()
      ).join("");
    if (overrideKey) {
      this.keyLength = overrideKey.length;
    }
  }

  private static genRandomChar(): string {
    const randNumber = Math.floor(26 * Math.random());
    return String.fromCharCode(97 + randNumber);
  }

  encode(plainText: string): string {
    return plainText.split("").reduce((a, v, i) => {
      const keyCode = this.key.charCodeAt(i % this.keyLength) - 97;
      const vKeyCode = v.charCodeAt(0) - 97;
      const offset = (vKeyCode + keyCode) % 26;
      return a + String.fromCharCode(offset + 97);
    }, "");
  }

  decode(secretText: string): string {
    return secretText.split("").reduce((a, v, i) => {
      const keyCode = this.key.charCodeAt(i % this.keyLength) - 97;
      const vKeyCode = v.charCodeAt(0) - 97;
      const offset = (vKeyCode - keyCode + 26) % 26;
      return a + String.fromCharCode(offset + 97);
    }, "");
  }
}
