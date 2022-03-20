// 拿到陣到隨機索引值
function getIndex(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return index;
}

// 拿到一組隨機字串組合
const getRandomCombination = (length, CompareStrings) => {
  let randomString = ''
  console.log("CompareStrings", CompareStrings);
  for (let i = 0; i < length; i++) {
    randomString += CompareStrings[getIndex(CompareStrings)];
  }
  return randomString;
}

const stringBox = "012".split("");
const number = 2;
let x = 0;
let result = "";

let shortData = [
  { id: 00, shortString: "localhost:3000/00" },
  { id: 11, shortString: "localhost:3000/11" },
  { id: 22, shortString: "localhost:3000/22" },
];
console.log('prototype',shortData)
shortData = shortData.map((i) => i.shortString.replace("localhost:3000/", ""));
console.log('slice', shortData)
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
while (x < Infinity) {
  x = x + 1
  console.log(`跑第${x}次`)
  console.log('開始前',result)
  const randomString = getRandomCombination(number, stringBox);
  console.log('現下拿到的隨機', randomString)
  if (shortData.includes(randomString)) {
    result = ""
    console.log('比對後在陣列裡',result)
  } else {
    result = randomString;
    console.log('比對後不在陣列裡',result)
    break
  }
  console.log('拿到後',result)
}
