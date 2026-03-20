name: mvc-sqlite
description: Implement or modify Expo MVC features with SQLite persistence following this repository structure.
---

# Skill: MVC SQLite Implementation

## Use this skill when

- User yêu cầu thêm/sửa feature theo mô hình MVC.
- User yêu cầu dùng SQLite để lưu dữ liệu cục bộ.
- Cần giữ chuẩn code và kiến trúc đồng nhất trong repo.

## Required context

- Read `.agents/architecture.md`
- Read `.agents/coding-standards.md`
- Read `.agents/workflow.md`
- Read `.agents/templates/new-feature-mvc-sqlite.md`

## Execution rules

1. Implement theo thứ tự: model -> repository -> controller -> view -> route.
2. Không viết SQL ở view/controller.
3. Không thêm UI vượt quá yêu cầu.
4. Dùng `ThemedText`/`ThemedView` cho UI cơ bản.
5. Chạy kiểm tra lỗi sau khi chỉnh sửa.

## Expected output format from agent

- Danh sách file đã sửa/tạo.
- Tóm tắt ngắn logic chính.
- Kết quả kiểm tra lỗi/lint.
- Bước tiếp theo đề xuất (nếu phù hợp).
