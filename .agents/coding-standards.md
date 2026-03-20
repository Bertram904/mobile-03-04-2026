# Coding Standards For Agents

## TypeScript & React

- Bật strict mode, luôn giữ type rõ ràng cho input/output.
- Ưu tiên `type` cho data model đơn giản.
- Dùng `async/await`, xử lý lỗi bằng `try/catch` ở boundary phù hợp.
- Không dùng one-letter variable name.

## UI / Design system

- Ưu tiên dùng `ThemedText`, `ThemedView` từ `components/`.
- Không hard-code màu mới nếu không bắt buộc.
- Không thêm UI ngoài yêu cầu (modal/filter/animation thừa).

## Data access

- Không viết SQL trong view/controller.
- Mọi mapping từ row DB sang model để tại repository.
- Validate input ở controller (ví dụ title không rỗng).

## Scope discipline

- Chỉ sửa file liên quan trực tiếp yêu cầu.
- Không đổi tên file/symbol nếu không cần thiết.
- Không thêm dependency mới trừ khi cần cho task.

## Verification

- Sau chỉnh sửa: chạy kiểm tra lỗi (`get_errors` hoặc lint nếu phù hợp).
- Nếu có test liên quan thì chạy test gần vùng sửa trước.
