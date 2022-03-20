// 拿到陣到隨機索引值
function getIndex(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return index;
}

// 拿到一組隨機字串組合
const getRandomCombination = (length, CompareStrings) => {
  let randomString = "";
  console.log("CompareStrings", CompareStrings);
  for (let i = 0; i < length; i++) {
    randomString += CompareStrings[getIndex(CompareStrings)];
  }
  return randomString;
};

function getShortUrlGenerator(shortUrlData, urlData) {
  // shortUrlData = shortUrlData.map((i) =>
  //   i.shortString.replace("localhost:3000/", "")
  // );
  // console.log("shortUrlData", shortUrlData, "length", shortUrlData.length);
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCasesLetters = lowerCaseLetters.toLocaleUpperCase();
  const numbers = "1234567890";
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/';

  const stringBox1 = (lowerCaseLetters + upperCasesLetters + numbers).split("");
  console.log(stringBox1.length);
  console.log("這是在裡面", "shortUrlData", shortUrlData);
  console.log("這是在裡面", "urlData", urlData);
  const stringBox2 = "012".split("");
  const stringLength = 2;
  // const stringLength = 5;
  let lapCount = 1;
  let joinArrayCount = 1;
  let result = "";
  // const totalNumberOfArray = Math.pow(stringBox.length, stringLength);
  const totalNumberOfArray = Math.pow(stringBox2.length, stringLength);
  const checkUrl = shortUrlData.some((i) => i.inputUrl === urlData);
  console.log('checkUrl', checkUrl)
  const newUrlData = shortUrlData.find((i) => i.inputUrl === urlData);
  console.log("newUrlData", newUrlData);
  console.log("prototype-shortUrlData", shortUrlData);
  const newsSortUrlData = shortUrlData.map((i) =>
    i.shortString.replace("localhost:3000/", "")
  );
  console.log("slice-newsSortUrlData", newsSortUrlData);
  const numberBox = [];
  let shortData = [
    { id: 00, shortString: "localhost:3000/00" },
    { id: 11, shortString: "localhost:3000/11" },
    { id: 22, shortString: "localhost:3000/22" },
  ];
  console.log("prototype", shortData);
  shortData = shortData.map((i) =>
    i.shortString.replace("localhost:3000/", "")
  );
  console.log("slice", shortData);
  // 把隨機一組產生的字串拿到現有的資料陣列去比對，
  // 如果隨機字串有在現有的資料陣列出現就在產生一組新的隨機字串,
  // 直到產生出一組不在現有資料陣列的字串。

  // 目前while迴圈下不能設 (lapCount <= Math.pow(stringBox.length, stringLength)) 陣列總合數，因為產生的字串組合會有重覆的情形，
  // while (lapCount <= Math.pow(stringBox.length, stringLength)) {

  // 所以得用(lapCount <= Infinity)  <-- Infinity無限

  while (lapCount <= Infinity) {
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log("totalNumberOfArray", totalNumberOfArray);
    console.log("shortUrlData.length");
    console.log(`跑第${lapCount}次`);
    console.log("開始前", result);
    const randomString = getRandomCombination(stringLength, stringBox2);
    console.log("現下拿到的隨機", randomString);
    // 測試 if (numberBox.includes(randomString)) {
    if (newsSortUrlData.includes(randomString)) {
      result = "";
      console.log("比對後在陣列裡", result);
    } else {
      //  測試 numberBox.push(randomString);
      // numberBox.push(randomString);
      result = randomString;
      console.log(`~~~~~~~成功推進第${joinArrayCount}個`);
      console.log("比對後不在陣列裡", result);
      joinArrayCount = joinArrayCount + 1;
      break;
    }
    lapCount = lapCount + 1;

    // 這一段程式碼主要防止有人惡意重覆產生字串組合，
    // 導致伺服器陷入無限迴圈，造成伺服器崩潰。

    // 測試 if (totalNumberOfArray === numberBox.length) {
    // if (totalNumberOfArray === shortUrlData.length) {
    //   console.log("拿到後", result);

    //   // 測試 console.log(numberBox.sort());
    //   console.log(shortUrlData.sort());
    //   console.log("lapCount", lapCount);
    //   result = "己超出短網址產生器隨機字串組合總數";

    //   // 測試 console.log("numberBox.length", numberBox.length);
    //   console.log("shortUrlData.length", shortUrlData.length);
    //   break;
    // }

    // if (totalNumberOfArray === shortUrlData.length && lapCount === 100) {
    //   console.log("拿到後", result);

    //   // 測試 console.log(numberBox.sort());
    //   console.log(shortUrlData.sort());
    //   console.log("lapCount", lapCount);
    //   result = '字串總合數己滿回傳陣列不回傳';

    //   // 測試 console.log("numberBox.length", numberBox.length);
    //   console.log("shortUrlData.length", shortUrlData.length);
    //   break;
    // }
    
    if (totalNumberOfArray === newsSortUrlData.length && checkUrl) {
      // result = randomString;
      result = {
        ...newUrlData,
        message: "無法再產生新的字串，而且使用者輸入的字串在資料庫得回傳",
      };
      console.log("result", result);
      break
    }

    if (totalNumberOfArray === newsSortUrlData.length ) {
      console.log("拿到後", result);

      // 測試 console.log(numberBox.sort());
      console.log(newsSortUrlData.sort());
      console.log("lapCount", lapCount);
      result = "短網址產生器無法再產生新的短網址";

      // 測試 console.log("numberBox.length", numberBox.length);
      console.log("shortUrlData.length", shortUrlData.length);
      break;
    }

  }
  console.log("最後的結果是", result);
  return result;
}
module.exports = { getShortUrlGenerator };
