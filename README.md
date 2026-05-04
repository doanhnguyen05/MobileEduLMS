# mobileEduLMS

`mobileEduLMS` hiện đã được chuyển sang mô hình chạy bằng `Expo SDK 54` để bạn có thể mở `Expo Go` và quét QR trực tiếp trên điện thoại.

## Kiến trúc hiện tại

Dự án gốc là một ứng dụng web React được xuất ra từ Figma/Vite. Để chuyển sang Expo nhanh, ổn định và vẫn giữ nguyên toàn bộ giao diện hiện có, dự án đang dùng kiến trúc hybrid:

- `Expo SDK 54` làm shell native để chạy trên `Android` và `iOS`.
- `react-native-webview` dùng để hiển thị toàn bộ giao diện web bên trong app Expo.
- `Vite` build ứng dụng web thành một file HTML self-contained.
- Script `scripts/generate-webview-html.mjs` nhúng file HTML đó vào `src/native/generated/webAppHtml.ts`.

Nói ngắn gọn: đây là một app Expo chạy được bằng QR code trong `Expo Go`, nhưng phần UI nghiệp vụ vẫn là code web hiện có, chưa phải rewrite 100% sang React Native thuần.

## Yêu cầu môi trường

- `Node.js 20.19+`
- `npm`
- Ứng dụng `Expo Go` trên điện thoại
- Điện thoại và máy tính cùng mạng Wi-Fi nếu dùng chế độ `LAN`

Repo đã có file `.nvmrc`, vì vậy nếu bạn dùng `nvm` thì chỉ cần:

```bash
nvm use
```

Nếu máy đang dùng `Node 25` hoặc một bản quá mới khiến Expo CLI hoạt động không ổn định, hãy chuyển về `Node 20.19.x` hoặc `Node 22 LTS`.

## Chạy nhanh để quét mã QR

### 1. Cài dependency

```bash
npm install
```

### 2. Khởi động Expo và tạo QR

```bash
npm run start
```

Lệnh này sẽ tự động làm 3 việc:

1. Build web app bằng `Vite`
2. Nhúng web app vào shell `Expo`
3. Chạy `expo start --clear`

Sau đó:

- Mở `Expo Go` trên điện thoại
- Quét mã QR hiển thị trong terminal

### 3. Nếu quét QR qua mạng LAN không được

Dùng chế độ tunnel:

```bash
npm run start:tunnel
```

Hoặc ép chạy qua LAN:

```bash
npm run start:lan
```

## Các lệnh quan trọng

```bash
npm run dev:web
```

Chạy giao diện web gốc bằng Vite trong trình duyệt để debug nhanh.

```bash
npm run build:web
```

Build riêng phần web.

```bash
npm run prepare:expo
```

Build phần web và tạo file HTML nhúng cho Expo, nhưng chưa mở Metro.

```bash
npm run start
```

Build + nhúng + chạy Expo.

```bash
npm run start:tunnel
```

Build + nhúng + chạy Expo bằng tunnel.

```bash
npm run doctor
```

Kiểm tra tính tương thích dependency với Expo SDK 54.

```bash
npx tsc --noEmit
```

Kiểm tra TypeScript.

## Cấu trúc thư mục quan trọng

```text
.
├── App.tsx                           # Shell Expo native
├── app.json                          # Cấu hình Expo
├── scripts/
│   └── generate-webview-html.mjs     # Tạo file HTML nhúng cho Expo
├── src/
│   ├── main.tsx                      # Entry của web app Vite
│   ├── webapp/                       # Toàn bộ màn hình và component web hiện tại
│   ├── native/
│   │   └── generated/
│   │       └── webAppHtml.ts         # File auto-generated cho WebView
│   └── styles/                       # CSS/Tailwind cho web app
└── vite.config.ts                    # Cấu hình build web thành single HTML
```

## Kiến trúc nội bộ của web app

Phần `src/webapp` đã được tách lại theo trách nhiệm rõ hơn:

```text
src/webapp/
├── app/                # Composition root: providers, router, app shell
├── entities/           # Kiểu dữ liệu và đối tượng nghiệp vụ cốt lõi
├── features/           # Nghiệp vụ theo module: auth, payments, profile, reports...
├── screens/            # Màn hình hiện tại của ứng dụng
├── components/         # UI dùng lại
├── data/               # Catalog dữ liệu mock đã được gắn type
└── hooks/              # Hook dùng chung cho web app
```

Các thay đổi chính:

- `src/webapp/App.tsx` giờ chỉ còn là entry mỏng, không ôm router và auth nữa
- router được tách sang `src/webapp/app/router/*`
- provider được gom vào `src/webapp/app/providers/*`
- `User`, `Course`, `Lesson`, `Quiz`, `Notification`, `TeacherCourse`, `AdminStats` đã có entity type riêng trong `src/webapp/entities/*`
- auth được chuyển thành feature độc lập tại `src/webapp/features/auth/*`
- `src/webapp/data/mockData.ts` giờ phụ thuộc vào entity types thay vì object tự do

Mục tiêu của cách tách này là:

- giảm coupling của `App.tsx`
- tách session/auth khỏi entity `User`
- gom route theo domain thay vì một file registry dài
- tạo chỗ rõ ràng để tiếp tục tách từng feature sau này

## Luồng build Expo hiện tại

Khi chạy `npm run start`, pipeline diễn ra như sau:

1. `Vite` build mã nguồn web trong `src/webapp`
2. Plugin `vite-plugin-singlefile` gộp JS/CSS vào `dist/index.html`
3. Script `generate-webview-html.mjs` đọc `dist/index.html`
4. Script sinh ra `src/native/generated/webAppHtml.ts`
5. `App.tsx` nạp chuỗi HTML này vào `WebView`
6. `Expo Go` mở app qua QR code

## Công nghệ đang dùng

### Native shell

- `Expo SDK 54`
- `React Native 0.81.5`
- `react-native-webview 13.15.0`

### Web UI hiện có

- `React 19.1.0`
- `Vite 6.3.5`
- `Tailwind CSS 4.1.12`
- `React Router 7`
- `MUI 7`
- `Radix UI`
- `Motion`
- `Recharts`
- `Lucide React`
- `React Hook Form`

### Công cụ build và kiểm tra

- `TypeScript 5.9`
- `expo-doctor`
- `vite-plugin-singlefile`

## Những điều cần biết khi tiếp tục phát triển

### Khi bạn sửa giao diện trong `src/webapp`

Bạn không cần sửa phần Expo shell. Chỉ cần chạy lại:

```bash
npm run start
```

hoặc:

```bash
npm run prepare:expo
```

để tạo lại file HTML nhúng mới nhất.

### Khi nào dùng `dev:web`

Nếu bạn muốn chỉnh UI thật nhanh trong trình duyệt, dùng:

```bash
npm run dev:web
```

Sau khi ổn, chạy lại:

```bash
npm run prepare:expo
```

để cập nhật app Expo.

## Giới hạn hiện tại

- App hiện chạy qua `WebView`, nên đây chưa phải bản React Native thuần.
- Một số tài nguyên như avatar, ảnh khóa học hoặc font từ nguồn ngoài vẫn cần internet.
- Nếu terminal hiện cảnh báo `watchman` liên quan quyền truy cập thư mục macOS, đó thường không chặn Expo chạy; chỉ là cảnh báo theo dõi file.

## Trạng thái kiểm tra đã chạy

Dự án đã được kiểm tra với các bước sau:

- `npm run prepare:expo`
- `npm run doctor`
- `npx tsc --noEmit`
- `expo start` khởi động thành công và hiển thị QR code

## Gợi ý quy trình làm việc

1. `nvm use`
2. `npm install`
3. `npm run start:tunnel`
4. Mở `Expo Go`
5. Quét QR

Nếu bạn muốn, bước tiếp theo có thể là tách dần từng màn từ `WebView` sang `React Native` thật để tiến tới app native hoàn toàn.
