### Short-URL-Generator 短網址生器 HEROKU版本

![restaurant-image](https://github.com/Steavn-Chen/AC_Expense-Teacker/blob/main/public/image/%E8%A8%BB%E5%86%8A%E9%A0%81.PNG)

## 功能介紹

- 使用者輸入一組網址，藉由短網址產生器產生一組短網址。
- 使用者輸入過的網址會被儲存在短網址產生器伺服器資料庫中，當下次再輸入同樣的網址時是會得到第一次產生的短網址。
- 當產生器無法再產生新的字串組時，會顯示錯誤訊息，或者請使用者寫信通知站長。

## 種子資料
  總共四筆:
  1. inputUrl: "https://github.com/",
     outputShortUrl: `https://shrot-url-generator.herokuapp.com/01234`
  2. inputUrl: "https://www.facebook.com",
     outputShortUrl: `https://shrot-url-generator.herokuapp.com/abcde`
  3. inputUrl: "https://www.yahoo.com.tw",
    outputShortUrl: `https://shrot-url-generator.herokuapp.com/ABCDE`
  4. inputUrl: "https://www.pchome.com.tw",
    outputShortUrl: `https://shrot-url-generator.herokuapp.com/ASDQW`

## 啓動方式

- 將專案 clone 到本地端

https://github.com/Steavn-Chen/Short-Url-Generator-Heroku.git

- 進入到專案資料夾
```
- 安裝 npm
```
  npm install
```
- 啓動專案
```
  npm run dev
```
- 若終端機出顥示出以下字串，表示成功。
```
   The Short-URL-Generator web is running https://shrot-url-generator.herokuapp.com
```
  出現 mongodb is connected ! ，代表 mongodb 資料庫連接成功

- 在終端機輸入 npm run seed
```
  看到 insert urlSeeder done ! 種子資料建立成功
```
  ## 開發環境

- Node.js -v14.15.1
- Express -4.17.3
- Express-Handlebars-5.3.4
- mongoose 5.12.15


## 使用的套件

- mongoose-findoneorcreate: 1.0.3
- dotenv: ^16.0.0

