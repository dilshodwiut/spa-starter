export default function formatPhoneNumber(
  phone: string,
  format: string,
): string {
  const numberPlaceholder = "#";
  const result = [];

  if (phone.length === 0) return "";

  let phoneTokenIdx = 0;
  let formatTokenIdx = 0;

  const phoneTokens = phone.split("");
  const formatTokens = format.split("");

  if (phoneTokens[0] !== "+") {
    while (result.length < formatTokens.length) {
      const currChar = formatTokens[formatTokenIdx];

      if (currChar === numberPlaceholder) {
        result.push(phoneTokens[phoneTokenIdx]);
        phoneTokenIdx += 1;
      } else {
        result.push(currChar);
      }

      formatTokenIdx += 1;
    }

    return result.join("");
  }

  return phone;
}
