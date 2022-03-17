function getIndex(arr) {
  let index = Math.floor(Math.random() * arr.length)
  return index
}

function getShortUrl () {
  const number = 5
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCasesLetters = lowerCaseLetters.toLocaleUpperCase();
  const numbers = "1234567890";
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/';

  const stringBox = (lowerCaseLetters + upperCasesLetters + numbers).split('')
  let result = "";

  for (let i = 0; i < number; i++) {
    result += stringBox[getIndex(stringBox)];
  }
  return result
}

module.exports = { getShortUrl }