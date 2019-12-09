function convertToRoman(num) {
  const integerToRomanMap = {
    1: "I", 4: "IV", 5: "V", 9: "IX", 10: "X", 40: "XL", 50: "L",
    90: "XC", 100: "C", 400: "CD", 500: "D", 900: "CM", 1000: "M"
  };
  // Get integer keys and sort in descending order
  const integerKeys = Object.keys(integerToRomanMap).map(numStr => parseInt(numStr)).sort((a, b) => a < b);

  let romanString = "";
  let remainingNum = num;

  integerKeys.forEach(intKey => {
    if (remainingNum >= intKey) {
      let divider = parseInt(remainingNum / intKey);
      for (let i = 0; i < divider; i++) {
        romanString += integerToRomanMap[intKey];
      }
      remainingNum %= intKey;
    }
  });

  return romanString;
}


console.log(convertToRoman(452))
