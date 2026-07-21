# 🚀 Hướng Dẫn Cài Đặt & Triển Khai MVP (Local)

## Yêu Cầu Hệ Thống
- **Docker Desktop** đã cài đặt ([Tải tại đây](https://www.docker.com/products/docker-desktop/))
- **Google AI API Key** (miễn phí) ([Lấy tại đây](https://aistudio.google.com/apikey))
- RAM tối thiểu: 4GB (khuyến nghị 8GB)

---

## Bước 1: Cài Đặt Docker Desktop

1. Tải Docker Desktop từ [docker.com](https://www.docker.com/products/docker-desktop/)
2. Cài đặt và khởi động lại máy
3. Mở Docker Desktop, đợi nó chạy xong (icon Docker ở system tray chuyển sang xanh)
4. Verify:
```powershell
docker --version
docker compose version
```

## Bước 2: Lấy Google AI API Key

1. Truy cập [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Đăng nhập tài khoản Google
3. Click **"Create API Key"**
4. Copy API Key
5. Dán API Key vào biến `GOOGLE_AI_API_KEY` trong file `.env`

---

## Bước 3: Cấu Hình Environment

1. Mở file `.env` trong thư mục dự án
2. Cấu hình các biến môi trường cho phù hợp:
```env
GOOGLE_AI_API_KEY=AIzaSy...your_actual_key...
DB_PASSWORD=your_secure_db_password
FB_PAGE_ACCESS_TOKEN=your_facebook_page_access_token
FB_APP_SECRET=your_facebook_app_secret
FB_VERIFY_TOKEN=your_custom_verify_token
```

---

## Bước 4: Khởi Động Hệ Thống

Mở terminal tại thư mục dự án và chạy:

```powershell
cd "d:\Own project\Chatbot"
docker compose up -d
```

Đợi khoảng 1-2 phút để tải images và khởi động. Kiểm tra trạng thái:

```powershell
docker compose ps
```

---

## Bước 4.1: Khởi Động & Lấy URL Cloudflare Tunnel Công Khai 🌐

> Hệ thống sử dụng Cloudflare Tunnel miễn phí (TryCloudflare) để mở cổng local của n8n ra Internet mà không cần mở cổng modem.
>
> ⚠️ **Chú ý quan trọng**: Vì đây là Tunnel dùng thử miễn phí, mỗi lần khởi động lại máy hoặc sau một thời gian dài không sử dụng, Cloudflare có thể ngắt kết nối cũ. Bạn cần thực hiện lấy URL mới theo các bước sau:

1. **Khởi động lại dịch vụ Tunnel** (để đảm bảo lấy session và URL mới nhất):
```powershell
docker restart hotel-chatbot-tunnel
```

2. **Xem logs để lấy URL công khai**:
```powershell
docker logs hotel-chatbot-tunnel
```
Tìm trong đống log hiển thị, bạn sẽ thấy một khung viền hình chữ nhật chứa URL dạng:
```text
+--------------------------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
|  https://fifty-necessarily-earn-going.trycloudflare.com                                    |
+--------------------------------------------------------------------------------------------+
```

3. **Truy cập thử**: Copy đường link đó (ví dụ: `https://fifty-necessarily-earn-going.trycloudflare.com`) dán lên trình duyệt web. Nếu thấy trang đăng nhập của n8n xuất hiện là bạn đã thiết lập Tunnel thành công!

*(URL này cũng chính là URL bạn sẽ điền vào phần **Callback URL** trên Meta Developer Portal ở Bước 10).*

---

## Bước 5: Truy Cập n8n

1. Mở trình duyệt: **http://localhost:5678**
2. Tạo tài khoản admin (lần đầu):
   - Email: admin@example.com (hoặc email của bạn)
   - First Name: Admin
   - Last Name: Hotel
   - Password: (tự chọn, ghi nhớ)
3. Bạn sẽ thấy n8n Dashboard

---

## Bước 6: Thêm Credentials trong n8n

### 6.1 Google Gemini API
1. Vào **Settings** (gear icon) → **Credentials**
2. Click **Add Credential** → Tìm **"Google Gemini (PaLM) Api"** hoặc **"Google AI"**
3. Nhập API Key từ `.env`
4. Save

### 6.2 PostgreSQL
1. **Add Credential** → Tìm **"Postgres"**
2. Điền:
   - **Host**: `postgres` (tên container, KHÔNG phải localhost)
   - **Database**: `hotel_chatbot`
   - **User**: `hotel_admin`
   - **Password**: Mật khẩu của bạn trong `.env`
   - **Port**: `5432`
3. Click **Test** → Phải hiện "Connection successful"
4. Save

---

## Bước 7: Tạo Workflow 1 - Dynamic Knowledge Ingestion

> Workflow này tự động quét tất cả các file tài liệu trong thư mục `knowledge/` trên máy của bạn, giải nén text, tạo vector và nạp vào database. Bất cứ khi nào bạn chỉnh sửa file `.md` trong thư mục này, chỉ cần chạy lại workflow này để cập nhật tri thức.

### Tạo workflow mới:
1. Đặt tên: **"Hotel Knowledge Ingestion (Dynamic)"**
2. Thêm các node theo thứ tự:
   ```
   [Manual Trigger] 
    → [Postgres: Reset Tri Thức] (Xóa dữ liệu cũ trước khi nạp mới)
    → [Read Directory] (Đọc danh sách file trong thư mục)
    → [Read Write File from Disk] (Đọc nội dung từng file)
    → [Postgres PGVector Store (Insert)] (Lưu trữ Vector mới)
   ```

### Chi tiết cấu hình từng node:

#### Node 1: Manual Trigger
- Mặc định, không cần cấu hình gì.

#### Node 2: Postgres (Reset Tri Thức)
- **Operation**: `Execute a SQL Query`
- **Query**: `TRUNCATE TABLE knowledge_documents;`
- **Credentials**: Chọn Postgres credential đã tạo ở Bước 6.

#### Node 3: Read Directory (Đọc thư mục)
- **Path**: `/home/node/knowledge/*` (thêm dấu wildcard `*` để quét mọi file)
- **Options**: Bật **`Detailed Output`** thành `True`.

#### Node 4: Read Write File from Disk (Đọc file)
- **Operation**: `Read File`
- **File Path**: `/home/node/knowledge/{{ $binary.data.fileName }}`
- **Output Binary Field**: `data`

#### Node 5: Postgres PGVector Store (Insert Documents)
- **Table Name**: `knowledge_documents`
- **Vector Column Name**: `embedding`
- **Content Column Name**: `content`
- **Metadata Column Name**: `metadata`
- **Embedding Batch Size**: `1`
- **Sub-node: Default Data Loader** (Gắn vào ô *Document*):
  - **Type of Data**: `Binary`
  - **Binary Property**: `data`
  - **Text Splitting**: `Simple`
- **Sub-node: Embeddings Google Gemini** (Gắn vào ô *Embedding*):
  - **Model**: `models/gemini-embedding-001`
  - **Credentials**: Google Gemini credential đã tạo
- **Sub-node: Recursive Character Text Splitter** (Gắn vào bên cạnh Data Loader):
  - **Chunk Size**: `2000`
  - **Chunk Overlap**: `400`

### ⚡ Chạy nạp tri thức:
1. Click **`Execute workflow`**.
2. Khi hoàn thành, tất cả các file markdown sẽ được nạp sạch sẽ vào Postgres dưới dạng vector 3072 dimensions.

---

## Bước 8: Tạo Workflow 2 - AI Chat Agent (Có RAG + Database Tool)

> Workflow này là bộ não của Chatbot Marina khi chat trực tiếp trên trang thử nghiệm n8n. Marina sẽ vừa truy vấn tài liệu tĩnh (RAG) vừa có công cụ kết nối trực tiếp vào Database thực tế để kiểm tra phòng trống hoặc coupon khi khách hàng yêu cầu.

### Tạo workflow mới: **"Hotel Chatbot Agent"**

```
[Chat Trigger] → [AI Agent]
                      ↑
                [Google Gemini Chat Model] (sub-node)
                      ↑
                [Vector Store Question Answer Tool] (sub-node) → [Postgres PGVector Store (Retrieve)]
                                                                        ↑ [Embeddings Google Gemini]
                      ↑
                [PostgreSQL Tool] (sub-node) (Công cụ truy vấn cơ sở dữ liệu động)
                      ↑
                [Simple Memory] (sub-node)
```

### Cấu hình chi tiết:

#### Node 1: Chat Trigger
- Trọng tâm giao diện trò chuyện của n8n. Không cần chỉnh gì thêm.

#### Node 2: AI Agent
- **Agent Type**: Tools Agent
- **System Message**:
```markdown
You are Marina, the smart, warm, and professional AI concierge for Ocean Breeze Resort - a luxury 4-star beachfront resort.

## Role & Mission
- Assist guests with inquiries regarding room types, rates, amenities, services, policies, and local recommendations.
- Retrieve accurate information from the provided knowledge base to answer questions.
- Maintain a welcoming hospitality tone.

## Strict Rules
1. LANGUAGE DETECTION: Always respond in the language used by the user. If the guest messages in Vietnamese, reply in Vietnamese. If in English, reply in English.

2. MANDATORY LIVE DATABASE CHECK BEFORE ANY BOOKING/RECOMMENDATION: Always prioritize querying the live database via `query_hotel_database` before confirming availability, recommending features, or directing the guest to the booking hotline for ANY room type or service. 
   - TOOL CALL EFFICIENCY: Be precise when calling tools. Only query `query_hotel_database` for active rooms, services, pricing, and operating hours. Only query `hotel_knowledge` (RAG) for static policies (cancellation, check-in), FAQs, recommendations, or guides. Do not call both tools in a single turn unless absolutely necessary.

3. DATA DISCREPANCY & RECONCILIATION: If the database query returns different room types, prices, or services compared to what is written in the static FAQ files (RAG) or earlier in the conversation, always prioritize the live database data.
   - Politely explain to the guest that the resort's room availability, pricing, and services are updated dynamically in real-time on the system.
   - Apologize for any confusion, state the current correct information retrieved from the database, and help the guest choose from the currently active/available rooms or services. Do NOT copy-paste any rigid response templates.

4. OFF-TOPIC HANDLER: If the user asks about general knowledge, software, logic, or topics completely unrelated to Ocean Breeze Resort, travel in the area, or hotel services (e.g., gaming, programming, cooking recipes, general news, downloading Minecraft), politely refuse to answer. Explain that you can only assist with inquiries related to the resort, and guide them back by suggesting topics like room types, spa, dining, or promotions.

5. NO INFORMATION HANDLING (Within scope): If the question is hotel-related but you cannot find the answer in the database or via your database tool, politely explain that you need to double-check this information with the management. Invite the guest to contact the hotline directly at 0901 234 567 for immediate support. Do NOT use static copy-paste templates.

6. CURRENCY FORMATTING: Format Vietnamese Dong with dot separators: e.g., 1.500.000đ.
7. PERSONALITY: Use appropriate emojis (🏖️ 🏨 ✨ 📞 🌊 💆 🍽️) to sound warm and engaging.
8. CONTINUOUS ENGAGEMENT: Always end your response with an open-ended question or suggestion to keep the conversation going.
9. PRONOUNS (Vietnamese): Address yourself as "Marina" or "em" and the guest as "anh/chị". (English: I / You).
10. ESCALATION: For booking requests or urgent issues, direct the guest to call the hotline: 0901 234 567.

11. NO MARKDOWN TABLES: Never use markdown tables (e.g., pipes | and dashes ---) to present information. Facebook Messenger does not support tables, and they will look broken. Always present lists, room types, services, and pricing using clean bullet points, bold text, and newline spacing.
    - Example:
      **Standard Sea View**
      - Giới hạn: 2 khách
      - Giá: 800.000đ
      - Tiện nghi: Ban công hướng biển, minibar, Wi-Fi miễn phí

12. FACEBOOK COMMENT ROUTING & PRIVATE REPLIES: If the incoming request is a Facebook Post Comment (identifiable by the comment ID context or format), determine the user's intent:
    - **Interactive / Social / General Inquiries**: Reply publicly directly as a friendly Facebook Page admin.
    - **High-intent Inquiries (Room availability, booking, pricing, spa packages)**: Do NOT publish room prices or booking details publicly in the comment. Instead, you MUST output a split message using exactly the following prefixes so n8n can parse and send them correctly:
      `PUBLIC: [A friendly public comment response telling the guest that you have sent the details to their Inbox/Direct Message. Include warm emojis.]`
      `PRIVATE: [A comprehensive, personalized direct message to their inbox. List active rooms, rates, amenities, and ask how you can help them book. Keep it clean without markdown tables.]`

## Resort Details
- Name: Ocean Breeze Resort
- Address: 123 Bien Xanh Street, Bien Xanh City
- Hotline: 0901 234 567 / +84 901 234 567
- Email: info@oceanbreezeresort.vn
- Website: www.oceanbreezeresort.vn
```

#### Sub-node 1: Google Gemini Chat Model (hoặc Groq Chat Model)
- **Model**: `gemini-2.0-flash` (hoặc `llama-3.3-70b-specdec` của Groq)
- **Temperature**: `0.3`

#### Sub-node 2: Vector Store Question Answer Tool (RAG Tool)
- **Node Name**: Đổi thành `hotel_knowledge`
- **Description of Data**: `Use this tool to search for information about Ocean Breeze Resort, including room types, pricing, amenities, services, policies, promotions, nearby locations, and frequently asked questions (FAQs).`
- **Vector Store**: Postgres PGVector Store (Retrieve mode, Table: `knowledge_documents`, Top K: `10`)
- **Embeddings**: Embeddings Google Gemini (`models/gemini-embedding-001`)

#### Sub-node 3: PostgreSQL Tool (Live DB Tool)
- Gắn một node **`PostgreSQL`** vào phần **Tools** của AI Agent.
- **Node Name**: Đổi thành `query_hotel_database`
- **Description**:
  `Use this tool to run read-only SQL SELECT queries on the hotel database to check live room pricing, room availability, services details, or policies.
  
  Available tables:
  1. room_types:
     - id (int)
     - name (varchar)
     - name_vi (varchar) - Vietnamese name
     - description_vi (text) - Detailed description
     - max_guests (int) - Max guests allowed
     - size_sqm (int) - Room size in square meters
     - base_price (decimal) - Nightly rate in VND
     - weekend_price (decimal)
     - holiday_price (decimal)
     - amenities (jsonb) - List of room amenities
     - is_active (boolean) - Active status of room type (true = active, false = inactive/disabled)
  2. hotel_services:
     - name (varchar)
     - name_vi (varchar)
     - category (varchar)
     - description_vi (text)
     - price (decimal)
     - operating_hours (varchar)
     - is_active (boolean) - Active status (true = active, false = inactive/disabled)
  3. hotel_policies:
     - policy_type (varchar) - 'checkin', 'checkout', 'cancellation', etc.
     - title_vi (varchar)
     - content_vi (text)

  Rules:
  - ONLY execute SELECT queries. Never update or delete.
  - If a guest asks for recommendations, choose based on max_guests or price.
  - Return the results clearly.`
- **Credentials**: Chọn PostgreSQL credential đã tạo ở Bước 6.

#### Sub-node 4: Simple Memory
- Chọn **Window Buffer Memory** (Session Window: `10`, Key: `sessionId`).

---

## Bước 9: Test Chatbot! 🎉

### Test Knowledge Ingestion:
1. Mở workflow **"Hotel Knowledge Ingestion"**
2. Click **"Test workflow"** (nút play)
3. Đợi chạy xong → Check tất cả nodes đều xanh (success)

### Test Chat Agent:
1. Mở workflow **"Hotel Chatbot Agent"**
2. Click **"Chat"** (nút chat ở góc dưới phải)
3. Thử hỏi các thông tin tĩnh để xem RAG hoạt động.

---

## 🛑 Xử Lý Sự Cố / Troubleshooting

### Docker không start được
```powershell
docker info
# Restart tất cả
docker compose down
docker compose up -d
```

### Reset hoàn toàn
```powershell
docker compose down -v   # Xóa cả volumes (mất hết data!)
docker compose up -d     # Tạo mới từ đầu
```

---

## 📊 Kiểm Tra Database

Bạn có thể kết nối trực tiếp vào PostgreSQL:

```powershell
docker exec -it hotel-chatbot-db psql -U hotel_admin -d hotel_chatbot
```

Các câu lệnh kiểm tra:
```sql
SELECT count(*) FROM room_types;           -- Expected: 4
SELECT count(*) FROM hotel_services;       -- Expected: 13
SELECT count(*) FROM hotel_policies;       -- Expected: 8
SELECT count(*) FROM knowledge_documents;  -- Expected: ~23 (after ingestion)
\q
```

---

## 📊 Quản Lý Database Bằng Giao Diện Web (Adminer)

Hệ thống đã được tích hợp sẵn công cụ **Adminer** để bạn dễ dàng quản lý, xem và sửa dữ liệu qua giao diện Web.
Truy cập: **`http://localhost:8080`**
Thông tin đăng nhập:
- **System**: `PostgreSQL`
- **Server**: `postgres`
- **Username**: `hotel_admin`
- **Database**: `hotel_chatbot`

---

## Bước 10: Tích Hợp Tự Động Trả Lời Trên Facebook Messenger & Comments 💬

> Hệ thống sử dụng **Cloudflare Tunnel (cloudflared)** để mở cổng local của n8n ra internet một cách cực kỳ ổn định.
> Để lấy địa chỉ URL công khai, bạn chạy lệnh sau trong terminal:
> ```powershell
> docker logs hotel-chatbot-tunnel
> ```
> Tìm dòng chứa URL dạng: `https://xxxxxx.trycloudflare.com`. Dùng URL này làm địa chỉ HTTPS để kết nối Fanpage Facebook với n8n.

### Phần A: Cấu hình trên Meta Developer Portal (Facebook Developer)

1. **Tạo Ứng dụng**:
   - Truy cập: https://developers.facebook.com → Đăng nhập tài khoản.
   - Click **My Apps** → **Create App** → Chọn loại **Business** (hoặc *Other* -> *Business*).
   - Điền tên hiển thị ứng dụng và bấm **Create App**.

2. **Thêm sản phẩm Messenger**:
   - Trong dashboard ứng dụng, tìm mục **Messenger** → Bấm **Set Up**.

3. **Liên kết Trang Fanpage & Lấy Page Token**:
   - Trong menu trái, click **Messenger** → **API Setup**.
   - Tại mục **Configure tokens**, click **Add or remove Pages** để cấp quyền cho Trang Fanpage của bạn.
   - Copy mã token này và dán vào biến **`FB_PAGE_ACCESS_TOKEN`** trong file `.env`.

4. **Lấy App Secret**:
   - Menu trái, click **App settings** → **Basic**.
   - Copy **App Secret** dán vào biến **`FB_APP_SECRET`** trong file `.env`.
   - Đặt một chuỗi làm **Verify Token** (ví dụ: `ocean_breeze_verify_token_2025`) và dán vào **`FB_VERIFY_TOKEN`** trong file `.env`.

5. **Khởi động lại Docker** để cập nhật các token mới vào n8n:
   ```powershell
   docker compose up -d
   ```

---

### Phần B: Xây dựng Workflow Tự Động Trả Lời Trên n8n (Cấu hình Dual-Agent)

Tạo một workflow mới đặt tên là: **"Facebook Chatbot Connector"** trên n8n. Chúng ta sẽ gộp chung cổng nhận Webhook GET và POST để tránh lỗi định tuyến, sau đó dùng node Switch chia làm 2 nhánh Agent xử lý tin nhắn và bình luận song song.

#### 1. Sơ đồ tổng quan Workflow
```
                                         ┌──► [SQL Session] ──► [Inbox Agent] ──► [Send AI Response (HTTP)] ──► [Send Room Cards (Code)] ──► [HTTP Request (Zernio Cards)]
                                         │                           │
                                         │                     (Output Parser)
[Webhook (GET, POST)] ──► [Switch Node] ┤
                                         │
                                         └──► [Social AI Agent] ──► [Parse response] ──► [Router] ──► [HTTP Requests: Comment/Inbox]
```

---

#### 2. Cấu hình chi tiết các Node chung:

##### Node 1: Webhook (Cổng nhận dữ liệu duy nhất)
- **HTTP Methods**: Chọn cả **`GET`** và **`POST`**.
- **Path**: Điền **`facebook-messenger`**
- **Respond**: Chọn **`Using 'Respond to Webhook' Node`** (vì luồng GET cần node phản hồi động).

##### Node 2: Code (Process client message)
- Đọc thông tin từ Messenger: bóc tách `senderId`, `messageText`, `accountId`, `conversationId`, `type` (message hoặc comment).

##### Node 3: Switch (Chia nhánh)
- Rẽ nhánh dựa trên `type`: `message` đi sang luồng tư vấn Inbox Agent, `comment` đi sang luồng Social AI Agent.

---

## Bước 11: Cấu Hình Tìm Phòng Trống & Gửi Card Carousel (Generic Template) Qua Zernio

Đây là kiến trúc tối ưu nhất giúp AI Agent có thể tra cứu trực tiếp phòng trống thời gian thực từ Backend API, sau đó tách biệt tin nhắn Text (gửi đi trước) và các Thẻ hình ảnh phòng trống (gửi đi sau dưới dạng Generic Template Carousel qua Zernio API).

### 1. Cấu hình Custom Tool `search_available_rooms`
Node Custom Tool này giúp AI Agent giao tiếp với Backend API. Nó chỉ làm nhiệm vụ lấy dữ liệu thô dạng JSON chứ không trực tiếp gửi card (tránh việc block n8n sandbox):
- **Name:** `search_available_rooms`
- **Description:** `Use this tool to search for available room types/categories for a specific check-in date, check-out date, and optionally the number of guests. Always call this tool when a guest asks about room availability or wants to check if any rooms are free today, tomorrow, or a specific period.`
- **Input Schema (JSON Schema):**
  ```json
  {
    "type": "object",
    "properties": {
      "checkinDate": {
        "type": "string",
        "description": "Ngày nhận phòng định dạng ISO YYYY-MM-DDTHH:mm:ss. Ví dụ: 2026-07-25T14:00:00"
      },
      "checkoutDate": {
        "type": "string",
        "description": "Ngày trả phòng định dạng ISO YYYY-MM-DDTHH:mm:ss. Ví dụ: 2026-07-26T12:00:00"
      },
      "guestsCount": {
        "type": "integer",
        "description": "Số lượng khách lưu trú. Mặc định là 2.",
        "default": 2
      },
      "minPrice": {
        "type": "number",
        "description": "Giá phòng tối thiểu khách yêu cầu. Để trống nếu không yêu cầu."
      },
      "maxPrice": {
        "type": "number",
        "description": "Giá phòng tối đa khách yêu cầu. Để trống nếu không yêu cầu."
      },
      "accommodationType": {
        "type": "string",
        "description": "Loại hình lưu trú. Chỉ chấp nhận: ROOM, CAMPING, GLAMPING. Để trống nếu tìm tất cả.",
        "enum": ["ROOM", "CAMPING", "GLAMPING"]
      },
      "categoryId": {
        "type": "string",
        "description": "UUID của hạng phòng cụ thể nếu khách chỉ định rõ. Để trống nếu muốn tìm tất cả."
      }
    },
    "required": [
      "checkinDate",
      "checkoutDate"
    ]
  }
  ```
- **Javascript Code:**
  ```javascript
  const backendIP = "192.168.1.177"; // IP máy Host Windows chạy backend
  // Phân tích tham số, gọi API Backend http://192.168.1.177:8080/api/v1/search/accommodations
  // Trả về chuỗi JSON.stringify() chứa mảng rooms (categoryId, categoryName, basePrice, availableRoomsCount, imageUrl)
  ```

### 2. Cấu hình Output Parser `Structured Output DM Message`
Gắn vào **Inbox Agent** để phân tách văn bản trả lời và cấu trúc dữ liệu phòng trống:
- **Auto-Fix Format:** Bật (màu xanh) để n8n tự động sửa định dạng nếu LLM sinh lỗi JSON.
- **Input Schema:**
  ```json
  {
    "type": "object",
    "properties": {
      "replyText": {
        "type": "string",
        "description": "Nội dung phản hồi bằng chữ gửi cho khách hàng (Tóm tắt các phòng tìm thấy kèm giá tiền bằng tiếng Việt tự nhiên, ấm áp)."
      },
      "rooms": {
        "type": "string",
        "description": "Chuỗi JSON của mảng danh sách các phòng nhận được từ tool search_available_rooms. Hãy copy nguyên si chuỗi JSON mảng rooms nhận được từ tool. Nếu không gọi tool, hãy trả về '[]'."
      },
      "checkinDate": { "type": "string" },
      "checkoutDate": { "type": "string" },
      "guestsCount": { "type": "integer" }
    },
    "required": [
      "replyText"
    ]
  }
  ```

### 3. Gửi Tin Nhắn Text trước (`Send AI Response`)
Node HTTP Request này gửi tin nhắn chữ `{{ $json.output.replyText }}` tới Zernio API để khách hàng nhận được tin nhắn trả lời nhanh nhất.

### 4. Xử lý tạo Card trượt (`Send Room Cards`)
Node Code JavaScript nhận dữ liệu sau khi gửi text thành công:
- Đọc mảng `rooms` (hỗ trợ cả JSON string và mảng đối tượng).
- Tạo mảng `elements` chứa thông tin phòng, link ảnh và nút bấm chuyển hướng.
- **Quan trọng về nút bấm (Zernio Facebook Webview Redirect):**
  - Để nút bấm mở trình duyệt / webview dẫn về website thay vì gửi tin nhắn text thông thường, nút bấm bắt buộc phải cấu hình **`"type": "url"`** và đường dẫn **`url`** phải được mã hóa URL chuẩn bằng `encodeURIComponent()`.
  - Tên miền website được cấu hình là: `https://locanbeach.vercel.app`.
  - Ví dụ nút bấm:
    ```json
    "buttons": [{
      "type": "url",
      "title": "Xem & Đặt Phòng",
      "url": "https://locanbeach.vercel.app/rooms/categoryId?checkin=...&checkout=...&guests=..."
    }]
    ```
- Trả ra đối tượng `zernioBody`.

### 5. Gửi Card Carousel (`HTTP Request`)
Node HTTP Request cuối cùng thực hiện POST `zernioBody` lên Zernio API `https://zernio.com/api/v1/inbox/conversations/{conversationId}/messages` để hiển thị danh sách phòng trượt ngang trực quan cho khách hàng trên Facebook Messenger.

---

### ⚠️ Lưu ý quan trọng khi triển khai & Test
* **Domain Whitelisting:** Facebook yêu cầu bạn phải thêm tên miền `https://locanbeach.vercel.app` vào danh sách **Whitelisted Domains** trong cài đặt Trang Fanpage (Page Settings -> Advanced Messaging) để đảm bảo nút bấm trên Messenger hoạt động mở webview chuẩn xác.
* **Database Connection:** Backend Spring Boot chạy ở Host Windows nên container n8n cần kết nối qua IP mạng nội bộ của Host (e.g. `192.168.1.177`) để gọi API kiểm tra phòng trống.
