# ALPHA CAST

串接第三方帳號(Spotify)登入，搭配 React 框架所打造出的微型專案。你可以在授權 Spotify 登入後，無須再次註冊，便能開始使用此 App。
![Alt text](public/demo01.png)
功能包含新增、編輯及刪除分類，搜尋 Spotify 上的 Podcast 節目，並加入"已收藏"清單。也串接了 Spotfiy 播放器，讓你可以直接線上收聽。

- DEMO 網址: https://fishiryoma.github.io/alphacast/

* DEMO 影片:

- GitHub: https://github.com/fishiryoma/alphacast

### 使用 Bootstrap 打造

使用 Bootstrap 快速建立符合設計稿的網站的同時，搭配 inline style 補足 Bootstrap 客製化不足及繁瑣的部分。引入 Bootstrap 的 UI 元件，如 carousel、spinner、button、modal，節省開發時間。但因 Bootstrap 在對應 React 元件上，官網提供的可調參數相對不多，因此適時拆開元件，直接對 html 元件做樣式修改。

### React-route-dom

利用 React-route-dom 達到分頁效果。使用 BrowserRouter 建立 Route，並利用 Outlet 功能讓重複的元件如 header & siderbar 不需要被重複撰寫，只需注重在 Outlet 內容的抽換即可。useNavigate, useParams 做網頁的導向，以及從網址欄抓取需要的數據。

### Axios

使用 Axios 向 API 獲取資料。利用 axios.create 功能建立可重複使用的函數，並加入 baseUrl 及 Header 中的 Authorization，以方便後續管理網頁能一鍵修改。在錯誤處理上，catch 裡都已 throw new Error 的方式，能有效的提示使用者及開發者。

### React

熟用 useState、useEffect。正確把握 React 渲染與 useEffect 執行的順序。

### 其他輔助 Library

使用 sweetalert2 套件，有效率快速做出客製化彈出式提示視窗。emoji-picker-react 提供了多樣的圖示選擇，讓網頁在外觀上更活潑。

## 安裝與下載

下載檔案至本地資料夾

```
git clone https://github.com/fishiryoma/alphacast
```

開啟專案資料夾後安裝檔案

```
npm install
```

輸入執行碼

```
npm run dev
```

於瀏覽器輸入以下網址

```
http://127.0.0.1:3000/
```

## 使用工具與版本

- Node.js v16
- React v18
- Vite v5
- Axios v1
- Bootstrap v5
- React-router-dom v6
- Emoji-picker-react v4
- Js-cookie v3
- React-icons v5
- Sweetalert2 v11
