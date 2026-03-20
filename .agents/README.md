# Agent Playbook - Expo MVC + SQLite

Thư mục này là nguồn hướng dẫn chuẩn để mọi agent làm việc nhất quán trong project.

## Mục tiêu

- Giữ đúng kiến trúc MVC hiện tại.
- Tôn trọng design system có sẵn (Themed components).
- Dùng SQLite qua tầng service/repository, không truy vấn DB trực tiếp trong view.
- Giảm thay đổi ngoài phạm vi yêu cầu.

## Thứ tự đọc bắt buộc cho agent

1. `architecture.md`
2. `coding-standards.md`
3. `workflow.md`
4. `templates/new-feature-mvc-sqlite.md`

## Nhanh cho tác vụ mới

- Nếu thêm feature mới: bám checklist trong `templates/new-feature-mvc-sqlite.md`.
- Nếu sửa bug: vẫn đi theo `workflow.md`, ưu tiên sửa root cause.
- Nếu đổi schema DB: cập nhật `src/services/database.ts` và ghi rõ migration strategy trong PR note.

## Nguồn tham chiếu chính trong code

- Entry UI hiện tại: `app/(tabs)/index.tsx`
- View mẫu: `src/views/todo-list-view.tsx`
- Controller mẫu: `src/controllers/todo-controller.ts`
- Repository mẫu: `src/services/todo-repository.ts`
- DB bootstrap: `src/services/database.ts`
