const codeToChar = code => String.fromCharCode(code);
const charToCode = char => char.charCodeAt();

function rot13(str) { // LBH QVQ VG!
  const rangeMin = charToCode("A");
  const rangeMax = charToCode("Z");
  const codeRange = rangeMax - rangeMin + 1;

  const letters = str.split("");

  const decodedLetters = letters.map((ch) => {
    const charCode = charToCode(ch);
    // Skip if it is not an uppercase latter
    if (charCode < rangeMin || charCode > rangeMax) return ch;
    const decodedCharCode = charToCode(ch) - 13;
    return codeToChar(rangeMin + ((codeRange + (decodedCharCode - rangeMin )) % codeRange))
  })
  
  return decodedLetters.join("");
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));

