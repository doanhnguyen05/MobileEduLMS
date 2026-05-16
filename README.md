# mobileEduLMS - Ứng dụng học tập trực tuyến trên mobile

## Thành viên nhóm và phân công công việc

| Thành viên | MSSV | Vai trò | Công việc thực hiện |
|---|---|---|---|
| Nguyễn Hoàng Dũng | 23810310338 | Thành viên | Thiết kế giao diện UI/UX, xử lý luồng phân quyền, đăng nhập và tối ưu responsive giao diện web/mobile. |
| Nguyễn Viết Doanh | 23810310376 | Thành viên | Phát triển chức năng hệ thống, tích hợp Expo SDK 54, cấu hình WebView, xử lý build/deploy. |
| Phạm Quang Huy | 23810310347 | Thành viên | Kiểm thử chức năng, xử lý dữ liệu, hỗ trợ triển khai hệ thống và viết tài liệu báo cáo dự án. |

## Giới thiệu dự án

`mobileEduLMS` là ứng dụng hỗ trợ học tập trực tuyến trên thiết bị di động. Ứng dụng mô phỏng một hệ thống LMS dành cho ba nhóm người dùng chính: học viên, giảng viên và quản trị viên.

Dự án hiện được triển khai theo mô hình hybrid: giao diện web được xây dựng bằng React/Vite, sau đó được nhúng vào shell Expo thông qua WebView để có thể chạy thử trên thiết bị di động bằng Expo Go.

Dự án đã được triển khai bản Web App demo lên Vercel tại:

https://mobile-edu-lms.vercel.app

Phiên bản này phục vụ demo nhanh trên trình duyệt. Ngoài ra, dự án cũng có thể chạy trên thiết bị di động thông qua Expo Go bằng cách quét mã QR từ terminal.

## Tính năng nổi bật

- Đăng nhập và phân quyền theo vai trò: học viên, giảng viên, quản trị viên.
- Học viên có thể xem khóa học, học bài, làm quiz, theo dõi tiến độ và đánh giá khóa học.
- Giảng viên có thể xem dashboard, quản lý danh sách khóa học, theo dõi học viên, xem thống kê và doanh thu.
- Quản trị viên có thể quản lý người dùng, khóa học, nội dung, báo cáo và thống kê hệ thống.
- Có chức năng nhắn tin demo, thông báo, thanh toán khóa học và báo cáo vi phạm.
- Giao diện được tối ưu theo hướng mobile-first, phù hợp khi demo trên trình duyệt hoặc thiết bị di động.

## Cách demo nhanh

Có thể demo trực tiếp bằng bản Web App tại:

https://mobile-edu-lms.vercel.app

Hoặc chạy local:

```bash
npm install
npm run dev:web
```

Sau đó mở trình duyệt tại:

```text
http://localhost:5173
```

## Chạy trên điện thoại bằng Expo Go

### 1. Cài dependency

```bash
npm install
```

### 2. Khởi động Expo và tạo QR

```bash
npm run start
```

Lệnh này sẽ tự động thực hiện:

1. Build web app bằng Vite.
2. Nhúng web app vào shell Expo.
3. Chạy Expo Metro với lệnh `expo start --clear`.

Sau đó:

- Mở ứng dụng Expo Go trên điện thoại.
- Quét mã QR hiển thị trong terminal.

### 3. Nếu quét QR qua mạng LAN không được

Có thể dùng chế độ tunnel:

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

Chạy giao diện web bằng Vite trong trình duyệt để demo hoặc debug nhanh.

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

Build, nhúng web app và chạy Expo.

```bash
npm run test
```

Chạy test tự động.

```bash
npx tsc --noEmit
```

Kiểm tra TypeScript.

```bash
npm run doctor
```

Kiểm tra tính tương thích dependency với Expo SDK 54.

## Yêu cầu môi trường

- Node.js 20.19+ hoặc Node 22 LTS.
- npm.
- Expo Go nếu muốn chạy trên điện thoại.
- Điện thoại và máy tính nên dùng cùng mạng Wi-Fi nếu chạy bằng chế độ LAN.

## Công nghệ đang dùng

### Native shell

- Expo SDK 54
- React Native 0.81.5
- react-native-webview 13.15.0

### Web UI

- React 19.1.0
- Vite 6.4.2
- Tailwind CSS 4.1.12
- React Router 7
- MUI 7
- Radix UI
- Motion
- Recharts
- Lucide React
- React Hook Form

### Công cụ build và kiểm tra

- TypeScript 5.9
- expo-doctor
- vite-plugin-singlefile
- Vitest

## Tài khoản demo

- Học viên: `student@edumobile.vn` / `123456`
- Giảng viên: `teacher@edumobile.vn` / `123456`
- Admin: `admin@edumobile.vn` / `123456`

## Giới hạn hiện tại

- Ứng dụng hiện sử dụng dữ liệu demo/mock, chưa kết nối backend thật.
- Một số thao tác như tạo khóa học, chỉnh sửa hoặc xóa dữ liệu mới mô phỏng luồng giao diện.
- Bản mobile hiện chạy qua WebView, chưa phải React Native thuần hoàn toàn.
- Một số tài nguyên như avatar, ảnh khóa học hoặc font từ nguồn ngoài cần kết nối internet.

## Hình ảnh minh họa hệ thống
<img width="548" height="877" alt="image" src="https://github.com/user-attachments/assets/ed0bd46a-afc2-4ea9-b2a8-dfbaf1a26200" />
<img width="510" height="836" alt="image" src="https://github.com/user-attachments/assets/129ccefd-badf-4319-8601-56a0758408b1" />
<img width="482" height="880" alt="image" src="https://github.com/user-attachments/assets/ff476846-a7d5-425f-a768-5cc7b191f6e1" />
<img width="501" height="806" alt="image" src="https://github.com/user-attachments/assets/20b30ce3-f03b-4c15-aaeb-1a40c7e2e174" />
<img width="495" height="765" alt="image" src="https://github.com/user-attachments/assets/f7a706fc-509a-42d6-9fff-ad72f782a2ed" />
<img width="519" height="865" alt="image" src="https://github.com/user-attachments/assets/4b08bd65-adff-4e50-9849-6ec0aae36e2e" />
<img width="506" height="878" alt="image" src="https://github.com/user-attachments/assets/f0643e38-8747-4993-82e5-b2dbc951856d" />
<img width="507" height="869" alt="image" src="https://github.com/user-attachments/assets/ef76459d-631c-4720-a8c3-3cfdfd8d8338" />
<img width="504" height="883" alt="image" src="https://github.com/user-attachments/assets/803513bf-d9c2-4760-879d-4b52e54400c6" />
<img width="494" height="864" alt="image" src="https://github.com/user-attachments/assets/d023efd5-1548-4dd4-a279-b4b641f77fdd" />
<img width="493" height="870" alt="image" src="https://github.com/user-attachments/assets/78f137db-71b8-42f5-a8c5-d06909a9e808" />
<img width="500" height="872" alt="image" src="https://github.com/user-attachments/assets/7ea375ed-a088-4aa8-9da1-74bc7e97d10c" />
<img width="504" height="872" alt="image" src="https://github.com/user-attachments/assets/bf58cae4-4562-4a6e-81c8-3f75b757b6d2" />
<img width="496" height="877" alt="image" src="https://github.com/user-attachments/assets/ae90e1b4-b9fc-4717-bd19-d62985c6dea7" />


## link video: 
https://drive.google.com/drive/folders/1-xg5ffHNPj9GmbY1AcpL73AJPwPwMgqC?usp=sharing
