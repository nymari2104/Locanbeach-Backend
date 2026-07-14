-- V5__add_missing_tables_and_columns.sql
-- Tạo các bảng và cột còn thiếu để Hibernate schema validation pass

-- =========================================
-- GUESTS (Guest Profiles)
-- =========================================
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    dob DATE,
    gender VARCHAR(20),
    nationality VARCHAR(50),
    id_type VARCHAR(30),
    id_number VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100),
    preferences TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- BOOKING_GUESTS (N-N giữa bookings và guests)
-- =========================================
CREATE TABLE IF NOT EXISTS booking_guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    guest_id UUID NOT NULL REFERENCES guests(id),
    is_primary BOOLEAN DEFAULT false,
    face_image_url TEXT,
    id_card_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Thêm cột còn thiếu vào bookings
-- =========================================
ALTER TABLE bookings
    ALTER COLUMN checkin_date TYPE TIMESTAMPTZ USING checkin_date::TIMESTAMPTZ,
    ALTER COLUMN checkout_date TYPE TIMESTAMPTZ USING checkout_date::TIMESTAMPTZ;

ALTER TABLE bookings
    ADD COLUMN IF NOT EXISTS actual_checkin_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS actual_checkout_at TIMESTAMPTZ;
