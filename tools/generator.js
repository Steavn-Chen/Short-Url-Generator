// 拿到陣到隨機索引值
function getIndex (arr) {
  const index = Math.floor(Math.random() * arr.length)
  return index
}

// 拿到一組隨機字串組合
const getRandomCombination = (length, CompareStrings) => {
  let randomString = ''
  for (let i = 0; i < length; i++) {
    randomString += CompareStrings[getIndex(CompareStrings)]
  }
  return randomString
}

// getShortUrlGenerator 函式的參數
// shortUrlData 放進函式的整包資料，
function getShortUrlGenerator (shortUrlData) {
  const BASE_URL = process.env.BASE_URL
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCasesLetters = lowerCaseLetters.toLocaleUpperCase()
  const numbers = '1234567890'
  // 設 stringBox 為原生字元陣列
  const stringBox = (lowerCaseLetters + upperCasesLetters + numbers).split('')
  // 設stringLength 為要產生隨機字串的長度
  const stringLength = 5
  // 設 lapCount 為 while 迴圈遁環次數
  let lapCount = 1
  // 設 result 為回傳的結果
  let result = ''
  // 設 totalNumberOfArray 為字串組合最大值
  const totalNumberOfArray = Math.pow(stringBox.length, stringLength)
  // 把 瀏覽器 request 來的資料(shortUrlData)處理。
  const newShortUrlData = shortUrlData.map((i) =>
    i.outputShortUrl.replace(`${BASE_URL}/`, '')
  )

  // 把隨機一組產生的字串拿到現有的資料陣列去比對，
  // 如果隨機字串有在現有的資料陣列出現就在產生一組新的隨機字串,
  // 直到產生出一組不在現有資料陣列的字串。
  while (lapCount <= Infinity) {
    const randomString = getRandomCombination(stringLength, stringBox)
    if (newShortUrlData.includes(randomString)) {
      result = ''
    } else {
      result = randomString
      break
    }

    // 這一段程式碼主要防止有人惡意重覆產生字串組合，
    // 導致伺服器陷入無限迴圈，造成伺服器崩潰。
    // 產生器可以產生字串組的最大值與資料庫資料相等狀況下
    // 便停止迴圈並回傳錯誤誤息
    if (totalNumberOfArray === newShortUrlData.length) {
      result = ''
      break
    }
    lapCount = lapCount + 1
  }
  return result
}
module.exports = { getShortUrlGenerator }
