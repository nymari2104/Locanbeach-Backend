# 🏨 Tài Liệu Thiết Kế Use Cases & Đặc Tả API - The House Resort

Tài liệu này tổng hợp toàn bộ các Use Cases (kịch bản sử dụng) thực tế từ giao diện Frontend đã phát triển, làm cơ sở để thiết kế các endpoint API ở Backend cho hệ thống quản lý và vận hành **The House - Lộc An Beach**.

---

## 1. Phân Hệ Khách Hàng (Public User Flow)

### 1.1 Quản Lý Phòng & Tìm Kiếm (Rooms & Search)
* **Use Case 1.1.1: Xem danh sách phòng**
  - **Mô tả:** Khách truy cập xem danh sách tất cả các hạng phòng đang hoạt động (`Active`) trên hệ thống.
  - **API đề xuất:** `GET /api/v1/rooms?status=active`
* **Use Case 1.1.2: Lọc tìm phòng trống (Booking Search)**
  - **Mô tả:** Khách nhập ngày nhận phòng (Check-in), trả phòng (Check-out) và số lượng khách (Người lớn, trẻ em) để tìm các phòng còn trống và phù hợp sức chứa.
  - **API đề xuất:** `GET /api/v1/rooms/search?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&guests=N`
* **Use Case 1.1.3: Xem chi tiết phòng**
  - **Mô tả:** Khách click vào một phòng cụ thể để xem thông tin chi tiết, mô tả, danh sách ảnh stack và giá tiền cụ thể.
  - **API đề xuất:** `GET /api/v1/rooms/{id}`

### 1.2 Đặt Phòng & Đơn Hàng (Booking & Checkout)
* **Use Case 1.2.1: Tạo đơn đặt phòng mới (Create Booking)**
  - **Mô tả:** Khách điền thông tin cá nhân, chọn phòng và xác nhận đặt phòng. Đơn đặt phòng ban đầu ở trạng thái Chờ đặt cọc.
  - **API đề xuất:** `POST /api/v1/bookings`
    - *Body:* `{ roomId, checkin, checkout, guestName, guestPhone, guestEmail, guestsCount, depositAmount }`
* **Use Case 1.2.2: Xem chi tiết hóa đơn/đơn đặt phòng**
  - **Mô tả:** Khách hoặc hệ thống truy xuất lại chi tiết đặt phòng sau khi hoàn tất để thanh toán hoặc kiểm tra trạng thái.
  - **API đề xuất:** `GET /api/v1/bookings/{id}`
* **Use Case 1.2.3: Xử lý thanh toán đặt cọc (Deposit Payment Callback)**
  - **Mô tả:** Nhận callback từ các cổng thanh toán (MoMo, ZaloPay, Thẻ tín dụng...) để chuyển trạng thái đơn đặt phòng từ *Chờ đặt cọc* sang *Đã xác nhận*.
  - **API đề xuất:** `POST /api/v1/bookings/{id}/payment-callback`

### 1.3 Dịch Vụ & Combo (Services & Combos)
* **Use Case 1.3.1: Xem danh sách dịch vụ & tiện ích**
  - **Mô tả:** Khách xem các dịch vụ hiện có tại resort (Spa, Nhà hàng, Giải trí, Tiện ích).
  - **API đề xuất:** `GET /api/v1/services?status=active`
* **Use Case 1.3.2: Xem danh sách combo ưu đãi**
  - **Mô tả:** Khách xem các combo trọn gói (Ví dụ: Combo 3N2Đ).
  - **API đề xuất:** `GET /api/v1/combos?status=active`

---

## 2. Phân Hệ Quản Trị (Admin Dashboard Flow)

### 2.1 Quản Lý Phòng (Admin Room Control)
* **Use Case 2.1.1: Xem danh sách phòng (Tất cả trạng thái)**
  - **Mô tả:** Admin xem tất cả các phòng kèm bộ lọc trạng thái "Hoạt động" (Active) hoặc "Tạm ngưng" (Inactive).
  - **API đề xuất:** `GET /api/v1/admin/rooms?status={active|inactive|all}`
* **Use Case 2.1.2: Thêm phòng mới (Có tải ảnh)**
  - **Mô tả:** Admin tạo phòng mới, tải ảnh lên hệ thống lưu trữ (S3 / Cloudinary) và thiết lập trạng thái hoạt động ban đầu.
  - **API đề xuất:** 
    - Upload ảnh: `POST /api/v1/admin/media/upload` (Trả về image URL)
    - Tạo phòng: `POST /api/v1/admin/rooms`
      - *Body:* `{ name, type, pricePerNight, status, image }`
* **Use Case 2.1.3: Cập nhật thông tin phòng**
  - **Mô tả:** Sửa đổi tên, loại phòng, giá cả hoặc ảnh của một phòng hiện tại.
  - **API đề xuất:** `PUT /api/v1/admin/rooms/{id}`
* **Use Case 2.1.4: Xóa phòng**
  - **Mô tả:** Xóa phòng khỏi cơ sở dữ liệu (hoặc soft delete).
  - **API đề xuất:** `DELETE /api/v1/admin/rooms/{id}`

### 2.2 Quản Lý Sự Kiện & Combo (Admin Event/Combo Control)
* **Use Case 2.2.1: Xem danh sách sự kiện & combo**
  - **API đề xuất:** `GET /api/v1/admin/events-combos?type={event|combo|all}&status={active|inactive|all}`
* **Use Case 2.2.2: Thêm sự kiện hoặc combo mới**
  - **API đề xuất:** `POST /api/v1/admin/events-combos`
    - *Body:* `{ name, type, price, dateRange, status, image }`
* **Use Case 2.2.3: Cập nhật / Xóa sự kiện & combo**
  - **API đề xuất:** `PUT/DELETE /api/v1/admin/events-combos/{id}`

### 2.3 Quản Lý Tiện Ích & Dịch Vụ (Admin Services Control)
* **Use Case 2.3.1: Xem danh sách tiện ích dịch vụ**
  - **API đề xuất:** `GET /api/v1/admin/services?group={spa|restaurant|entertainment|utility|all}&status={active|inactive|all}`
* **Use Case 2.3.2: Thêm dịch vụ mới**
  - **API đề xuất:** `POST /api/v1/admin/services`
    - *Body:* `{ name, group, price, hours, status, image }`
* **Use Case 2.3.3: Cập nhật / Xóa dịch vụ**
  - **API đề xuất:** `PUT/DELETE /api/v1/admin/services/{id}`

---

## 3. Phân Hệ Vận Hành (Staff Operational Flow)

* **Use Case 3.1: Quản lý trạng thái buồng phòng thực tế (Room Status Management)**
  - **Mô tả:** Nhân viên dọn phòng hoặc lễ tân cập nhật trạng thái vận hành thực tế của phòng (Trống - Vacant, Đã đặt - Occupied, Đang dọn dẹp - Cleaning) độc lập với trạng thái cấu hình của Admin.
  - **API đề xuất:** `PATCH /api/v1/staff/rooms/{id}/operational-status`
    - *Body:* `{ operationalStatus: 'vacant' | 'occupied' | 'cleaning' }`
