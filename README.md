# mobileEduLMS

`mobileEduLMS` hiện đã được chuyển sang mô hình chạy bằng `Expo SDK 54` để bạn có thể mở `Expo Go` và quét QR trực tiếp trên điện thoại.

## Dự án đã được deyloy lên vercel và chạy ổn định
https://mobile-edu-lms.vercel.app

do nhóm chưa có kinh phí để buil test trên App Store và Ch Play

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

## Công nghệ đang dùng

### Native shell

- `Expo SDK 54`
- `React Native 0.81.5`
- `react-native-webview 13.15.0`

### Web UI hiện có

- `React 19.1.0`
- `Vite 6.4.2`
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


## Gợi ý quy trình làm việc

1. `nvm use`
2. `npm install`
3. `npm run start`
4. Mở `Expo Go`
5. Quét QR
      

Các lệnh nên chạy trước khi nộp:

```bash
npm run test
npx tsc --noEmit
npm run doctor
npm run prepare:expo
```


Học viên: student@edumobile.vn / 123456
Giảng viên: teacher@edumobile.vn / 123456
Admin: admin@edumobile.vn / 123456
