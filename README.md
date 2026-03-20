# Expo MVC + SQLite Base

Base project dùng Expo Router, tổ chức theo mô hình MVC và lưu trữ cục bộ bằng SQLite.

## Chạy dự án

```bash
npm install
npx expo start
```

## Cấu trúc MVC

```text
src/
   models/
      todo.ts
   services/
      database.ts
      todo-repository.ts
   controllers/
      todo-controller.ts
   views/
      todo-list-view.tsx
```

- **Model**: Định nghĩa kiểu dữ liệu (`Todo`).
- **Service/Repository**: Làm việc trực tiếp với SQLite (khởi tạo DB + truy vấn CRUD).
- **Controller**: Chứa nghiệp vụ và validate input.
- **View**: Màn hình React Native gọi controller để hiển thị và thao tác dữ liệu.

## Màn hình mẫu

- `app/(tabs)/index.tsx` đang mount `TodoListView` để demo MVC + SQLite.
- Có sẵn chức năng thêm, đổi trạng thái hoàn thành, xoá công việc.

## Mở rộng

Khi thêm module mới (ví dụ `notes`, `expenses`, ...), bạn lặp lại theo pattern:

1. Tạo model trong `src/models`
2. Tạo repository SQLite trong `src/services`
3. Tạo controller trong `src/controllers`
4. Tạo màn hình trong `src/views`
