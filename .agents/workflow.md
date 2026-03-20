# Standard Workflow For Agents

## Phase 1 - Understand

1. Đọc yêu cầu user, xác định rõ output mong muốn.
2. Mở các file liên quan trực tiếp.
3. Kiểm tra ràng buộc kiến trúc trong `architecture.md`.

## Phase 2 - Plan

1. Liệt kê các bước thay đổi nhỏ, có thể xác minh.
2. Ưu tiên thay đổi tối thiểu để đạt yêu cầu.
3. Xác định trước file nào cần sửa/tạo.

## Phase 3 - Implement

1. Sửa/tạo model -> repository -> controller -> view (theo dependency flow).
2. Nếu thay đổi schema, cập nhật bootstrap DB trước khi dùng.
3. Giữ code đồng nhất với style hiện có.

## Phase 4 - Validate

1. Kiểm tra lỗi compile/lint.
2. Soát lại luồng chính không bị phá vỡ.
3. Đảm bảo không có thay đổi ngoài phạm vi.

## Phase 5 - Hand-off

1. Tóm tắt ngắn: đã đổi gì, ở đâu, vì sao.
2. Nêu bước tiếp theo (nếu có).
3. Không dump code dài trừ khi user yêu cầu.
