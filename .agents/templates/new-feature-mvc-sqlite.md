# Template: New Feature (MVC + SQLite)

Dùng template này khi tạo feature mới, ví dụ: `notes`, `expenses`, `categories`.

## 1) Files to create

- `src/models/<feature>.ts`
- `src/services/<feature>-repository.ts`
- `src/controllers/<feature>-controller.ts`
- `src/views/<feature>-list-view.tsx` (hoặc tên view phù hợp)
- `app/<route>.tsx` hoặc `app/(tabs)/<route>.tsx` để mount view

## 2) Checklist implementation

- [ ] Định nghĩa type model + input type.
- [ ] Viết SQL CRUD trong repository.
- [ ] Map dữ liệu DB -> model tại repository.
- [ ] Validate input trong controller.
- [ ] View chỉ gọi controller, không chứa SQL.
- [ ] Thêm trạng thái loading/error cơ bản trong view.

## 3) Database checklist

- [ ] Bảng được tạo trong `src/services/database.ts`.
- [ ] Dùng `IF NOT EXISTS` khi tạo bảng.
- [ ] Dùng query parameter (`?`) cho dữ liệu động.
- [ ] Boolean lưu kiểu `INTEGER` và map lại ở repository.

## 4) Done criteria

- [ ] Không lỗi lint/typecheck.
- [ ] Route render được view mới.
- [ ] CRUD tối thiểu chạy đúng.
