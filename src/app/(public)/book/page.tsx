import styles from "./page.module.css";
import Link from "next/link";

export default function Book() {
  return (
    <div className={styles.container} style={{ paddingTop: "2rem", paddingBottom: "var(--spacing-section-gap)" }}>
      {/* Hero / Filter Section */}
      <section className={styles.heroFilterSection}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            Tìm kiếm <br />
            <span className={styles.italic}>Không gian</span> của bạn
          </h1>
          <p className={styles.description}>
            Khám phá các lựa chọn lưu trú độc đáo tại Lộc An Beach. Từ phòng tiêu chuẩn đến villa cao cấp, chúng tôi mang đến trải nghiệm nghỉ dưỡng hoàn hảo.
          </p>
        </div>

        <div className={styles.filterCard}>
          <form className={styles.formGrid}>
            {/* Date Pickers */}
            <div className={styles.formGroup}>
              <label className={`mono-text ${styles.label}`}>Nhận phòng</label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>calendar_today</span>
                <input className={styles.input} type="date" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={`mono-text ${styles.label}`}>Trả phòng</label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>calendar_today</span>
                <input className={styles.input} type="date" />
              </div>
            </div>

            {/* Guests */}
            <div className={styles.formGroup}>
              <label className={`mono-text ${styles.label}`}>Số lượng khách</label>
              <div className={styles.selectWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>group</span>
                <select className={styles.select}>
                  <option>1 Người lớn, 0 Trẻ em</option>
                  <option>2 Người lớn, 0 Trẻ em</option>
                  <option>2 Người lớn, 1 Trẻ em</option>
                  <option>2 Người lớn, 2 Trẻ em</option>
                  <option>Gia đình / Nhóm</option>
                </select>
                <span className={`material-symbols-outlined ${styles.selectArrow}`}>expand_more</span>
              </div>
            </div>

            {/* Room Type */}
            <div className={styles.formGroup}>
              <label className={`mono-text ${styles.label}`}>Loại phòng</label>
              <div className={styles.selectWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>bed</span>
                <select className={styles.select}>
                  <option>Tất cả các loại</option>
                  <option>Ocean View Suite</option>
                  <option>Garden Villa</option>
                  <option>Standard Double</option>
                </select>
                <span className={`material-symbols-outlined ${styles.selectArrow}`}>expand_more</span>
              </div>
            </div>

            <button className={`mono-text ${styles.searchButton}`} type="button">
              <span className="material-symbols-outlined">search</span>
              <span>Tìm kiếm phòng</span>
            </button>
          </form>
        </div>
      </section>

      {/* Room Listing - Asymmetric Bento Grid */}
      <section>
        <div className={styles.resultsHeader}>
          <h2 className="headline-lg">Kết quả tìm kiếm</h2>
          <span className="mono-text" style={{ color: "var(--color-steel-secondary)" }}>Hiển thị 3 kết quả</span>
        </div>

        <div className={styles.resultsGrid}>
          {/* Featured Room (Spans 2 columns on large screens) */}
          <div className={`${styles.roomCard} ${styles.featuredCard}`}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.roomImage}
                alt="Ocean View Premium Suite"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5MX3M9UvbdZ7ZzvvGEeB4qTV6FrJnkocBj8c-h15LalVqr5IcxNQI24VZPmqf_lFoWghPJbYuWx_OByBd3dbDTkNfZjztNWLDLXEZ5oUQc6sYgYlyh_IlaFtBPBzW6RkNQSlnzzrx78uOhSoUvsSvJZ8P3PRaW_TNj1xKDI_Isf-taIy8HSiiDdZzrHXRQMfRBAnUSDqJNaJ9vNt2QLbBRPYKaAtvAi04Bz6OkG5lDbQ2boWzLG7Z"
              />
              <div className={`mono-text ${styles.featuredBadge}`}>Phổ biến nhất</div>
            </div>
            <div className={styles.roomDetails}>
              <div>
                <h3 className={styles.roomName}>Ocean View Premium Suite</h3>
                <div className={`mono-text ${styles.roomSpecs}`}>
                  <span className={styles.specItem}>
                    <span className={`material-symbols-outlined ${styles.specIcon}`}>square_foot</span> 45m²
                  </span>
                  <span className={styles.specItem}>
                    <span className={`material-symbols-outlined ${styles.specIcon}`}>bed</span> 1 Giường King
                  </span>
                  <span className={styles.specItem}>
                    <span className={`material-symbols-outlined ${styles.specIcon}`}>group</span> Tối đa 2 khách
                  </span>
                </div>
                <div className={styles.amenities}>
                  <span className="material-symbols-outlined" title="Wifi miễn phí">wifi</span>
                  <span className="material-symbols-outlined" title="Tầm nhìn hướng biển">waves</span>
                  <span className="material-symbols-outlined" title="Ban công riêng">balcony</span>
                </div>
              </div>
              <div className={styles.roomActions}>
                <div className={styles.priceWrapper}>
                  <span className={styles.price}>3,500,000₫</span>
                  <span className="mono-text" style={{ color: "var(--color-steel-secondary)", marginLeft: "0.25rem" }}>/ đêm</span>
                </div>
                <Link href="/rooms/ocean-view-suite">
                  <button className={`mono-text ${styles.selectButton}`}>
                    <span>Chọn phòng</span>
                    <span className={styles.arrow}>&rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Standard Room 1 */}
          <div className={styles.roomCard}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.roomImage}
                alt="Garden Deluxe Double"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjI6ayn79y9xDAAc3zNNj5KRPktLrQCQBlQHRNqvfVQsC_uwPhL6MmtIxnY8Y8bUAQiHSq0P1MPJQWYTv-Jp5FZ6SHsK9vsfY82WzDcf1gBBTOVWOI45pTI7-XPpgpHC32dQFLPwwWsTC9xD1y-0MBjAU7kRt8we9bjinrreFxGbUAPHcPcDeS97cEscQR2TceR1KKmXS3r8hzRsxFrrINjXqZJzj299zhocLgVB1WHjt8Aei9bciT"
              />
            </div>
            <div className={styles.roomDetails}>
              <div>
                <h3 className={styles.roomName}>Garden Deluxe Double</h3>
                <div className={`mono-text ${styles.roomSpecs}`}>
                  <span className={styles.specItem}>
                    <span className={`material-symbols-outlined ${styles.specIcon}`}>square_foot</span> 30m²
                  </span>
                  <span className={styles.specItem}>
                    <span className={`material-symbols-outlined ${styles.specIcon}`}>group</span> 2 khách
                  </span>
                </div>
                <div className={styles.amenities}>
                  <span className="material-symbols-outlined" title="Wifi miễn phí">wifi</span>
                  <span className="material-symbols-outlined" title="Hướng sân vườn">local_florist</span>
                  <span className="material-symbols-outlined" title="Bồn tắm">bathtub</span>
                </div>
              </div>
              <div className={styles.roomActions}>
                <div className={styles.priceWrapper}>
                  <span className={styles.price}>1,800,000₫</span>
                  <span className="mono-text" style={{ color: "var(--color-steel-secondary)", marginLeft: "0.25rem" }}>/ đêm</span>
                </div>
                <Link href="/rooms/garden-deluxe">
                  <button className={`mono-text ${styles.selectButton}`}>
                    <span>Chọn phòng</span>
                    <span className={styles.arrow}>&rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Standard Room 2 */}
          <div className={styles.roomCard}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.roomImage}
                alt="Family Connecting Room"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3D6xJlqpl53PO955reRpGJUg0QxAsFfH0MKavseLdbJgcwei0aQ09XO3ov-vLytTeTzrq6agNJwsxPQ47qptDCHhCVuhwTqpfp_aGt_CdWQZkw7tdv_nBSLmGyxcD1LZrro1gx99cg1nHlczteeCxSGiwMDgQYeSgR5AFxLa04rG3ugmuEDxrjBjj3o24z2FvatiNoOdVDZBN2VnTk0QZDz7yXnIBy9FhI3FeyjuEvIggl_gym-u7"
              />
            </div>
            <div className={styles.roomDetails}>
              <div>
                <h3 className={styles.roomName}>Family Connecting Room</h3>
                <div className={`mono-text ${styles.roomSpecs}`}>
                  <span className={styles.specItem}>
                    <span className={`material-symbols-outlined ${styles.specIcon}`}>square_foot</span> 55m²
                  </span>
                  <span className={styles.specItem}>
                    <span className={`material-symbols-outlined ${styles.specIcon}`}>group</span> 4 khách
                  </span>
                </div>
                <div className={styles.amenities}>
                  <span className="material-symbols-outlined" title="Wifi miễn phí">wifi</span>
                  <span className="material-symbols-outlined" title="Hướng sân vườn">local_florist</span>
                  <span className="material-symbols-outlined" title="Phòng kết nối">groups</span>
                </div>
              </div>
              <div className={styles.roomActions}>
                <div className={styles.priceWrapper}>
                  <span className={styles.price}>4,200,000₫</span>
                  <span className="mono-text" style={{ color: "var(--color-steel-secondary)", marginLeft: "0.25rem" }}>/ đêm</span>
                </div>
                <Link href="/rooms/family-connecting">
                  <button className={`mono-text ${styles.selectButton}`}>
                    <span>Chọn phòng</span>
                    <span className={styles.arrow}>&rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
