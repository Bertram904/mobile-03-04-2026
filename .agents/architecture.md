# Architecture Rules

## 1) Layer mapping

- **View** (`src/views/*`): render UI, quản lý state giao diện, gọi controller.
- **Controller** (`src/controllers/*`): validate input, điều phối nghiệp vụ.
- **Model** (`src/models/*`): định nghĩa type/domain object.
- **Service/Repository** (`src/services/*`): thao tác SQLite, mapping row <-> model.

## 2) Dependency direction (bắt buộc)

- View -> Controller -> Service/Repository -> Database
- View không gọi DB trực tiếp.
- Controller không import component UI.
- Repository không import từ view/controller.

## 3) SQLite conventions

- Dùng `expo-sqlite`.
- Mọi truy vấn phải đảm bảo `initializeDatabase()` đã chạy.
- SQL parameterized (`?`) thay vì nối chuỗi.
- Cột boolean lưu dạng `INTEGER` (`0/1`) và map sang `boolean` ở repository.

## 4) Routing conventions

- Màn hình route trong `app/*` chỉ làm nhiệm vụ mount view.
- Logic nghiệp vụ đặt trong `src/*`, không nhét vào file route.

## 5) Naming conventions

- Model: `feature.ts` (ví dụ `todo.ts`).
- Controller: `feature-controller.ts`.
- Repository/service: `feature-repository.ts`.
- View: `feature-list-view.tsx` hoặc tên sát nghiệp vụ.
