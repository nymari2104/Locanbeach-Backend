-- ============================================
-- OCEAN BREEZE RESORT - DATABASE INITIALIZATION
-- Hotel Chatbot MVP - Mock Data
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create separate schema for n8n internal data
CREATE SCHEMA IF NOT EXISTS n8n;

-- ══════════════════════════════════════════════
-- 1. KNOWLEDGE BASE (Vector Store for RAG)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    -- Gemini text-embedding-004 outputs 768 dimensions
    embedding vector(768),
    category VARCHAR(100),
    source VARCHAR(255),
    language VARCHAR(10) DEFAULT 'vi', -- 'vi' or 'en'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HNSW index for fast similarity search
CREATE INDEX IF NOT EXISTS idx_knowledge_embedding
ON knowledge_documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_knowledge_category
ON knowledge_documents(category);

CREATE INDEX IF NOT EXISTS idx_knowledge_language
ON knowledge_documents(language);

-- ══════════════════════════════════════════════
-- 2. CHAT MEMORY (Conversation History)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    platform VARCHAR(50) NOT NULL DEFAULT 'n8n_chat',
    platform_user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    language VARCHAR(10) DEFAULT 'vi',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session
ON chat_messages(session_id, created_at DESC);

-- ══════════════════════════════════════════════
-- 3. HOTEL DATA (Structured Data)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS room_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    description TEXT,
    description_vi TEXT,
    max_guests INT DEFAULT 2,
    size_sqm INT,
    base_price DECIMAL(12,0) NOT NULL,
    weekend_price DECIMAL(12,0),
    holiday_price DECIMAL(12,0),
    amenities JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hotel_services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    description_vi TEXT,
    price DECIMAL(12,0),
    operating_hours VARCHAR(100),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS hotel_policies (
    id SERIAL PRIMARY KEY,
    policy_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    title_vi VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    content_vi TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 4. SIMILARITY SEARCH FUNCTION
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION search_knowledge(
    query_embedding vector(768),
    match_threshold FLOAT DEFAULT 0.65,
    match_count INT DEFAULT 5,
    filter_category VARCHAR DEFAULT NULL,
    filter_language VARCHAR DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    metadata JSONB,
    category VARCHAR,
    language VARCHAR,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        kd.id,
        kd.content,
        kd.metadata,
        kd.category,
        kd.language,
        (1 - (kd.embedding <=> query_embedding))::FLOAT AS similarity
    FROM knowledge_documents kd
    WHERE
        (1 - (kd.embedding <=> query_embedding)) > match_threshold
        AND (filter_category IS NULL OR kd.category = filter_category)
        AND (filter_language IS NULL OR kd.language = filter_language)
    ORDER BY kd.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- ══════════════════════════════════════════════
-- 5. MOCK DATA - OCEAN BREEZE RESORT
-- ══════════════════════════════════════════════

-- Room Types
INSERT INTO room_types (name, name_vi, description, description_vi, max_guests, size_sqm, base_price, weekend_price, holiday_price, amenities) VALUES
(
    'Standard Sea View',
    'Phòng Tiêu Chuẩn Hướng Biển',
    'Cozy standard room with stunning sea view, private balcony, and king-size bed. Perfect for couples seeking a romantic getaway.',
    'Phòng tiêu chuẩn ấm cúng với tầm nhìn biển tuyệt đẹp, ban công riêng và giường king-size. Hoàn hảo cho các cặp đôi.',
    2, 28,
    800000, 1000000, 1200000,
    '["WiFi miễn phí/Free WiFi", "Điều hòa/AC", "Tivi 43 inch", "Minibar", "Ban công hướng biển/Sea-view balcony", "Két an toàn/Safe box", "Máy sấy tóc/Hair dryer"]'
),
(
    'Deluxe Ocean Front',
    'Phòng Deluxe Mặt Biển',
    'Spacious deluxe room directly facing the ocean with a large bathtub, separate living area, and premium amenities.',
    'Phòng deluxe rộng rãi nằm ngay mặt biển, bồn tắm lớn, khu vực phòng khách riêng biệt và tiện nghi cao cấp.',
    3, 42,
    1500000, 1800000, 2200000,
    '["WiFi miễn phí/Free WiFi", "Điều hòa/AC", "Smart TV 55 inch", "Minibar đầy đủ/Full minibar", "Bồn tắm/Bathtub", "Phòng khách riêng/Separate living area", "Dịch vụ phòng 24h/24h room service", "Áo choàng tắm/Bathrobe", "Máy pha cà phê/Coffee machine"]'
),
(
    'Family Suite',
    'Suite Gia Đình',
    'Spacious family suite with 2 bedrooms, kitchenette, kids play corner, and ocean-view terrace. Ideal for families.',
    'Suite rộng rãi dành cho gia đình với 2 phòng ngủ, bếp nhỏ, góc vui chơi trẻ em và sân thượng nhìn ra biển.',
    5, 65,
    2500000, 3000000, 3500000,
    '["WiFi miễn phí/Free WiFi", "2 phòng ngủ/2 bedrooms", "Bếp nhỏ/Kitchenette", "2 Smart TV", "Máy giặt/Washing machine", "Góc vui chơi trẻ em/Kids play corner", "Sân thượng riêng/Private terrace", "Dịch vụ trông trẻ/Babysitting (on request)"]'
),
(
    'Presidential Suite',
    'Suite Tổng Thống',
    'The most luxurious suite with panoramic ocean views, private jacuzzi, grand living room, and dedicated butler service.',
    'Suite sang trọng nhất với tầm nhìn biển toàn cảnh, jacuzzi riêng, phòng khách lớn và dịch vụ butler riêng.',
    4, 95,
    5000000, 6000000, 7500000,
    '["WiFi miễn phí/Free WiFi", "Jacuzzi riêng/Private jacuzzi", "Smart TV 75 inch", "Phòng khách lớn/Grand living room", "Butler service", "Minibar cao cấp/Premium minibar", "Xe đưa đón sân bay/Airport transfer", "Ban công panorama/Panoramic balcony", "Bàn làm việc/Work desk", "Hệ thống âm thanh Bose/Bose sound system"]'
);

-- Hotel Services
INSERT INTO hotel_services (name, name_vi, category, description, description_vi, price, operating_hours) VALUES
('Breakfast Buffet', 'Buffet Sáng', 'dining', 'International breakfast buffet with Vietnamese and Western cuisine', 'Buffet sáng đa dạng với các món Việt Nam và quốc tế, hải sản tươi sống', 200000, '06:30 - 10:00'),
('Seafood Restaurant - The Blue Coral', 'Nhà Hàng Hải Sản - The Blue Coral', 'dining', 'Fresh seafood restaurant with ocean view, reservation recommended', 'Nhà hàng hải sản tươi sống, view biển, khuyến nghị đặt bàn trước', 0, '11:00 - 22:00'),
('Sky Bar', 'Sky Bar', 'dining', 'Rooftop bar with cocktails, sunset views, and live music on weekends', 'Quầy bar trên sân thượng với cocktail, view hoàng hôn và nhạc sống cuối tuần', 0, '16:00 - 00:00'),
('Ocean Spa & Wellness', 'Ocean Spa & Wellness', 'spa', 'Full-service spa with traditional Vietnamese massage, herbal therapy, and beauty treatments', 'Spa trọn gói với massage truyền thống Việt Nam, liệu pháp thảo dược và chăm sóc sắc đẹp', 500000, '09:00 - 21:00'),
('Infinity Pool', 'Hồ Bơi Vô Cực', 'facility', 'Infinity pool overlooking the ocean, free for all guests, poolside bar available', 'Hồ bơi vô cực nhìn ra biển, miễn phí cho khách lưu trú, có quầy bar cạnh hồ bơi', 0, '06:00 - 21:00'),
('Private Beach', 'Bãi Biển Riêng', 'facility', 'Private beach area with sun loungers, umbrellas, and beach towels provided', 'Khu bãi biển riêng với ghế tắm nắng, ô che và khăn tắm biển miễn phí', 0, '06:00 - 18:00'),
('Fitness Center', 'Phòng Gym', 'facility', 'Modern gym with ocean views, personal trainer available upon request', 'Phòng gym hiện đại view biển, có huấn luyện viên cá nhân theo yêu cầu', 0, '06:00 - 22:00'),
('Island Hopping Tour', 'Tour Khám Phá Đảo', 'tour', 'Full-day island tour including lunch, snorkeling, and kayaking', 'Tour đảo trọn ngày bao gồm ăn trưa, lặn biển ngắm san hô và chèo kayak', 800000, '07:00 - 17:00'),
('Sunset Fishing Trip', 'Tour Câu Cá Hoàng Hôn', 'tour', 'Evening fishing trip with BBQ dinner on the boat', 'Chuyến câu cá buổi chiều kèm tiệc BBQ trên thuyền', 600000, '15:00 - 19:00'),
('Airport Transfer', 'Đưa Đón Sân Bay', 'transport', 'Private car airport transfer service, available 24/7', 'Dịch vụ đưa đón sân bay bằng xe riêng, hoạt động 24/7', 300000, '24/7'),
('Motorbike Rental', 'Thuê Xe Máy', 'transport', 'Motorbike rental for exploring the area, helmet included', 'Cho thuê xe máy khám phá khu vực, bao gồm mũ bảo hiểm', 150000, '07:00 - 20:00'),
('Laundry Service', 'Dịch Vụ Giặt Ủi', 'other', 'Same-day laundry and ironing service, delivered to your room', 'Giặt ủi trong ngày, giao trả tận phòng', 50000, '07:00 - 19:00'),
('Kids Club', 'Câu Lạc Bộ Trẻ Em', 'facility', 'Supervised kids activities including arts & crafts, games, and outdoor play', 'Các hoạt động dành cho trẻ em có người giám sát: thủ công, trò chơi, hoạt động ngoài trời', 0, '08:00 - 17:00');

-- Hotel Policies
INSERT INTO hotel_policies (policy_type, title, title_vi, content, content_vi) VALUES
('checkin', 'Check-in Policy', 'Chính sách nhận phòng',
 'Check-in from 14:00 (2 PM). Early check-in from 12:00 available for 200,000 VND surcharge (subject to availability). Please present valid ID/passport upon check-in.',
 'Nhận phòng từ 14:00. Nhận phòng sớm từ 12:00 phụ thu 200.000đ (tùy tình trạng phòng trống). Vui lòng xuất trình CCCD/hộ chiếu khi nhận phòng.'),

('checkout', 'Check-out Policy', 'Chính sách trả phòng',
 'Check-out before 12:00 (noon). Late check-out until 14:00 available for 200,000 VND surcharge. After 14:00, an additional night will be charged.',
 'Trả phòng trước 12:00. Trả phòng muộn đến 14:00 phụ thu 200.000đ. Sau 14:00 tính thêm 1 đêm.'),

('cancellation', 'Cancellation Policy', 'Chính sách hủy phòng',
 'Cancel 48+ hours before: 100% refund. Cancel 24-48 hours before: 50% refund. Cancel less than 24 hours or no-show: no refund.',
 'Hủy trước 48h: hoàn 100%. Hủy trước 24h-48h: hoàn 50%. Hủy trong ngày hoặc không đến (no-show): không hoàn tiền.'),

('pet', 'Pet Policy', 'Chính sách thú cưng',
 'Small pets under 10kg are welcome with a 200,000 VND/night surcharge. Please inform us when booking. Pets must be leashed in common areas.',
 'Chấp nhận thú cưng dưới 10kg, phụ thu 200.000đ/đêm. Vui lòng thông báo trước khi đặt phòng. Thú cưng phải được dắt dây ở khu vực chung.'),

('smoking', 'Smoking Policy', 'Chính sách hút thuốc',
 'Smoking is strictly prohibited in all rooms. Designated smoking areas are located on the ground floor terrace and rooftop. Violation may result in a 500,000 VND cleaning fee.',
 'Nghiêm cấm hút thuốc trong phòng. Khu vực hút thuốc bố trí tại sảnh tầng trệt và sân thượng. Vi phạm có thể bị phụ thu 500.000đ phí vệ sinh.'),

('payment', 'Payment Methods', 'Phương thức thanh toán',
 'We accept: Cash (VND), Bank Transfer, Visa/Mastercard, MoMo, ZaloPay. A 50% deposit is required for online bookings. Full payment is due upon check-in.',
 'Chấp nhận: Tiền mặt (VND), Chuyển khoản ngân hàng, Visa/Mastercard, MoMo, ZaloPay. Đặt cọc 50% khi đặt phòng online. Thanh toán đủ khi nhận phòng.'),

('children', 'Children Policy', 'Chính sách trẻ em',
 'Children under 6: free (sharing parents bed). Children 6-12: 200,000 VND/night with extra bed. Children above 12: charged as adult.',
 'Trẻ em dưới 6 tuổi: miễn phí (ngủ chung giường bố mẹ). Trẻ 6-12 tuổi: 200.000đ/đêm kèm giường phụ. Trên 12 tuổi: tính như người lớn.'),

('wifi', 'WiFi', 'WiFi',
 'Complimentary high-speed WiFi is available throughout the resort. Network: OceanBreeze_Guest. Password is provided at check-in.',
 'WiFi tốc độ cao miễn phí trong toàn bộ khuôn viên resort. Mạng: OceanBreeze_Guest. Mật khẩu được cung cấp khi nhận phòng.');

-- ══════════════════════════════════════════════
-- VERIFICATION
-- ══════════════════════════════════════════════
-- You can run these queries to verify:
-- SELECT count(*) FROM room_types;        -- Should return 4
-- SELECT count(*) FROM hotel_services;    -- Should return 13
-- SELECT count(*) FROM hotel_policies;    -- Should return 8
