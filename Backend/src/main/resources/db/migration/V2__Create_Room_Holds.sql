CREATE TABLE IF NOT EXISTS room_holds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    accommodation_id UUID NOT NULL REFERENCES accommodations(id),
    checkin_date DATE NOT NULL,
    checkout_date DATE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_room_holds_accommodation_id ON room_holds(accommodation_id);
CREATE INDEX idx_room_holds_expires_at ON room_holds(expires_at);
