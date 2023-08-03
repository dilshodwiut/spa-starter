export default function formatPhoneNumber(
  phone: string,
  format: string,
): string {
  const numberPlaceholder = "#";
  const countryCode = "998";
  const result = [];

  let fullPhone = phone;

  if (phone.length === 0) return "";
  if (phone.length < 12) {
    fullPhone = `${countryCode}${phone}`;
  }

  let phoneTokenIdx = 0;
  let formatTokenIdx = 0;

  if (fullPhone[0] !== "+") {
    // which means, if not formatted
    const phoneTokens = fullPhone.split("");
    const formatTokens = format.split("");

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

  if (fullPhone[0] === "+" && fullPhone.length === 13) {
    // which means there is no space between numbers: "+998936604530"
    return formatPhoneNumber(fullPhone.slice(1), format);
  }

  return fullPhone;
}
