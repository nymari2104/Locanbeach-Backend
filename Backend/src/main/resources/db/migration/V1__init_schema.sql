-- V1__init_schema.sql
-- The House Resort Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================
-- ENUMS
-- =========================================
CREATE TYPE accommodation_type AS ENUM ('ROOM', 'CAMPING', 'GLAMPING');
CREATE TYPE accommodation_status AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');
CREATE TYPE operational_status AS ENUM ('VACANT', 'OCCUPIED', 'CLEANING', 'MAINTENANCE');
CREATE TYPE booking_status AS ENUM ('PENDING_DEPOSIT', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'COMPLETED', 'CANCELLED');
CREATE TYPE service_group AS ENUM ('SPA', 'RESTAURANT', 'ENTERTAINMENT', 'UTILITY');
CREATE TYPE service_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE combo_event_type AS ENUM ('COMBO', 'EVENT');
CREATE TYPE user_role AS ENUM ('ADMIN', 'STAFF');

-- =========================================
-- USERS
-- =========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMPTZ
);

-- =========================================
-- ACCOMMODATION CATEGORIES
-- =========================================
CREATE TABLE accommodation_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    type accommodation_type NOT NULL,
    description TEXT,
    base_price DECIMAL(12,2) NOT NULL,
    max_guests INT NOT NULL,
    area_sqm DECIMAL(8,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- ACCOMMODATIONS
-- =========================================
CREATE TABLE accommodations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES accommodation_categories(id),
    code VARCHAR(30) UNIQUE NOT NULL,
    metadata JSONB,
    status accommodation_status NOT NULL DEFAULT 'ACTIVE',
    operational_status operational_status NOT NULL DEFAULT 'VACANT',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- AMENITIES
-- =========================================
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category_amenities (
    category_id UUID REFERENCES accommodation_categories(id),
    amenity_id UUID REFERENCES amenities(id),
    PRIMARY KEY (category_id, amenity_id)
);

-- =========================================
-- IMAGES
-- =========================================
CREATE TABLE category_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES accommodation_categories(id),
    url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    uploaded_by UUID REFERENCES users(id),
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- BOOKINGS
-- =========================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    accommodation_id UUID NOT NULL REFERENCES accommodations(id),
    confirmed_by UUID REFERENCES users(id),
    guest_name VARCHAR(100) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    guest_email VARCHAR(100),
    checkin_date DATE NOT NULL,
    checkout_date DATE NOT NULL,
    guests_count INT NOT NULL DEFAULT 1,
    total_amount DECIMAL(12,2) NOT NULL,
    deposit_amount DECIMAL(12,2),
    status booking_status NOT NULL DEFAULT 'PENDING_DEPOSIT',
    notes TEXT,
    cancelled_at TIMESTAMPTZ,
    cancelled_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- BOOKING STATUS HISTORY
-- =========================================
CREATE TABLE booking_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    changed_by_user_id UUID REFERENCES users(id),
    old_status booking_status,
    new_status booking_status NOT NULL,
    note TEXT,
    changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SERVICES
-- =========================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    "group" service_group NOT NULL,
    description TEXT,
    price DECIMAL(12,2),
    operating_hours VARCHAR(50),
    status service_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES services(id),
    url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    uploaded_by UUID REFERENCES users(id),
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- COMBOS & EVENTS
-- =========================================
CREATE TABLE combos_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    type combo_event_type NOT NULL,
    description TEXT,
    price DECIMAL(12,2),
    start_date DATE,
    end_date DATE,
    status service_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE combo_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    combo_id UUID NOT NULL REFERENCES combos_events(id),
    url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    uploaded_by UUID REFERENCES users(id),
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- BOOKING JUNCTION TABLES
-- =========================================
CREATE TABLE booking_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    service_id UUID NOT NULL REFERENCES services(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(12,2) NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE booking_combos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    combo_id UUID NOT NULL REFERENCES combos_events(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(12,2) NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
