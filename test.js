// 拿到陣到隨機索引值
function getIndex(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return index;
}

// 拿到一組隨機字串組合
const getRandomCombination = (length, CompareStrings) => {
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += CompareStrings[getIndex(CompareStrings)];
  }
  return randomString;
};

// 設一份假資料測試
const shortData = [
  {
    id: 01,
    inputUrl: "https://www.google.com",
    outputShortUrl: "localhost:3000/00",
  },
  {
    id: 02,
    inputUrl: "https://www.facebook.com",
    outputShortUrl: "localhost:3000/11",
  },
  {
    id: 03,
    inputUrl: "https://www.yahoo.com.tw",
    outputShortUrl: "localhost:3000/01",
  },
  // {
  //   id: 04,
  //   inputUrl: "https://www.pchome.com.tw",
  //   outputShortUrl: "localhost:3000/10",
  // },
];
//  設一個瀏覽器傳進來的 req.body.url = url 測試
const url = "https://www.facebook.com";

// getShortUrlGenerator 函式的參數
// shortUrlData 放進函式被比對的整包資料，
// urlData 放進函式要比對的資料
function getShortUrlGenerator(shortUrlData, urlData) {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCasesLetters = lowerCaseLetters.toLocaleUpperCase();
  const numbers = "1234567890";
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/';
  const stringBox1 = (lowerCaseLetters + upperCasesLetters + numbers).split("");
  // const stringBox = (lowerCaseLetters + upperCasesLetters + numbers).split("")
  // 測試用字元陣列
  const stringBox2 = "01".split("");
  // 試試用組合字元長度
  const stringLength = 2;
  // lapCount <--計算while迴圈次數
  let lapCount = 1;
  // joinArrayCount <-- 計算加入陣列次數
  let joinArrayCount = 1;
  // 計算結果 result
  let result = "";
  // 陣列組合總數 <-- totalNumberOfArray
  const totalNumberOfArray = Math.pow(stringBox2.length, stringLength);
  // 設numberBox為一個字串組合的陣列
  // let numberBox = []
  const numberBox = ["00", "01", "10", "11"];
  console.log(totalNumberOfArray, numberBox.length);

  console.log("urlData", urlData);
  const checkUrl = shortUrlData.some((i) => i.inputUrl === urlData);
  // const checkUrl = false
  console.log("checkUrl", checkUrl);
  const newUrlData = shortUrlData.find((i) => i.inputUrl === urlData);
  console.log("newUrlData", newUrlData);
  console.log("prototype-shortUrlData", shortUrlData);
  const newsSortUrlData = shortUrlData.map((i) =>
    i.outputShortUrl.replace("localhost:3000/", "")
  );
  console.log("slice-newsSortUrlData", newsSortUrlData);
  // while (x < Infinity) {
  //   i = i + 1
  //   // console.log(i)
  //   if (i === 3) {
  //     console.log(i)
  //     break
  //   }
  // }
  // 把隨機一組產生的字串拿到現有的資料陣列去比對，
  // 如果隨機字串有在現有的資料陣列出現就在產生一組新的隨機字串,
  // 直到產生出一組不在現有資料陣列的字串。

  // 目前while迴圈下不能設 (lapCount <= Math.pow(stringBox.length, stringLength)) 陣列總合數，因為產生的字串組合會有重覆的情形，
  //所以把 Math.pow(stringBox.length, stringLength)
  // 改為 Infinity 無限

  while (lapCount <= Infinity) {
    console.log(`跑第${lapCount}次`);
    console.log("開始前", result);
    const randomString = getRandomCombination(stringLength, stringBox2);
    console.log("現下拿到的隨機", randomString);
    // newsSortUrlData 為要進推進資料庫的變數
    if (newsSortUrlData.includes(randomString)) {
      // numberBox為比對用變數
      // if (numberBox.includes(randomString)) {
      result = "";
      console.log("比對後在陣列裡，就回傳就' ' 空字串。", result);
    } else {
      // newsSortUrlData 為要進推進資料庫的變數
      newsSortUrlData.push(randomString);
      console.log("newsSortUrlData", newsSortUrlData);

      // numberBox為比對用變數
      // numberBox.push(randomString);
      // console.log("numberBox", numberBox);
      result = randomString;
      console.log(`~~~~~~~成功推進第${joinArrayCount}個`);
      console.log("比對後不在陣列裡,然後就回傳這個結果。", result);
      joinArrayCount = joinArrayCount + 1;
      break;
    }
    lapCount = lapCount + 1;

    // 這一段程式碼主要防止有人惡意重覆產生字串組合，
    // 導致伺服器陷入無限迴圈，造成伺服器崩潰。
    // 這裡設lapCount === 100 。 主要是資料裡所產生的字串組跟
    // 產生器可以產生的組合數量相等，前提是產生器己到最大值無法
    // 再產生新的字串組狀況下，只讓迴圈跑 100 次， 並使其停下
    // 回傳錯誤訊息。
    // newsSortUrlData 為要進推進資料庫的變數
    if (totalNumberOfArray === newsSortUrlData.length && checkUrl) {
      // numberBox為比對用變數
      // if (totalNumberOfArray === numberBox.length && checkUrl) {
      result = {
        ...newUrlData,
        message: "無法再產生新的字串，而且使用者輸入的字串在資料庫得回傳",
      };
      console.log("result", result);
      break;
    }

    // newsSortUrlData 為要進推進資料庫的變數
    if (totalNumberOfArray === newsSortUrlData.length) {
      // numberBox為比對用變數
      // if (totalNumberOfArray === numberBox.length) {
      result = "短網址產生器無法再產生新的短網址。";
      console.log("newsSortUrlData.length", newsSortUrlData.length);
      console.log("numberBox.length", numberBox.length);
      console.log("短網址產生器無法再產生新的短網址。");
      break;
    }
  }
  console.log(`這是最後的結果:`, result);
}

getShortUrlGenerator(shortData, url);
