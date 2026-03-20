# Expo MVC + SQLite Base

Base project dùng Expo Router, tổ chức theo mô hình MVC và lưu trữ cục bộ bằng SQLite.

## Chức năng hiện có

- Login bằng bảng `accounts`.
- Xem thông tin sinh viên và điểm theo bảng `students`, `scores`.
- Màn hình chính: `app/(tabs)/index.tsx`.

## Chạy dự án

```bash
npm install
npx expo start
```

## Cấu trúc MVC

```text
src/
   models/
      account.ts
      student.ts
      score.ts
   services/
      database.ts
      account-repository.ts
      student-repository.ts
      score-repository.ts
   controllers/
      auth-controller.ts
      score-controller.ts
   views/
      login-score-view.tsx
```

- **Model**: Định nghĩa kiểu dữ liệu (`Account`, `Student`, `Score`).
- **Service/Repository**: Làm việc trực tiếp với SQLite (khởi tạo DB + truy vấn CRUD).
- **Controller**: Chứa nghiệp vụ và validate input.
- **View**: Màn hình React Native gọi controller để hiển thị và thao tác dữ liệu.

## Schema SQLite

- `accounts(username, password, role)`
- `students(code, name, className)`
- `scores(id AUTOINCREMENT, codeStudent, subject, score)`

## Dữ liệu mẫu

- Account sinh viên: `s001 / 123456`
- Account admin: `admin / admin123`
- Sinh viên mẫu: `s001 - Nguyen Van A - SE1701`

## Mở rộng

Khi thêm module mới (ví dụ `notes`, `expenses`, ...), bạn lặp lại theo pattern:

1. Tạo model trong `src/models`
2. Tạo repository SQLite trong `src/services`
3. Tạo controller trong `src/controllers`
4. Tạo màn hình trong `src/views`
