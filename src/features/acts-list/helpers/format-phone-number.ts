const numberPlaceholder = "#";
const countryCode = "998";

const formatPhoneNumber = (phone: string, format: string): string => {
  if (phone.length === 0) return "";

  const fullPhone = phone.length < 12 ? `${countryCode}${phone}` : phone;

  if (fullPhone[0] !== "+") {
    // which means, if not formatted
    const result = [];

    let phoneTokenIdx = 0;
    let formatTokenIdx = 0;

    while (result.length < format.length) {
      const currChar = format[formatTokenIdx];

      if (currChar === numberPlaceholder) {
        result.push(fullPhone[phoneTokenIdx]);
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
};

export default formatPhoneNumber;
