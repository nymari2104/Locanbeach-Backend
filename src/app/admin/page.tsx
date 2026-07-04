import styles from "./page.module.css";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <p className={`mono-text ${styles.preTitle}`}>Tổng quan hệ thống</p>
          <h1 className={styles.title}>Bảng điều khiển</h1>
        </div>
        <div className={styles.actions}>
          <button className={`mono-text ${styles.buttonOutline}`}>
            <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>calendar_month</span>
            Tháng này
          </button>
          <button className={`mono-text ${styles.buttonPrimary}`}>
            <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>download</span>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className={styles.bentoGrid}>
        {/* Stat 1: Occupancy */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.iconWrapper} ${styles.primaryIcon}`}>
              <span className="material-symbols-outlined">hotel</span>
            </div>
            <span className={`mono-text ${styles.trendBadge}`}>
              <span className={`material-symbols-outlined ${styles.trendIcon}`}>trending_up</span> +12%
            </span>
          </div>
          <div>
            <p className={`mono-text ${styles.statLabel}`}>Tỷ lệ lấp đầy</p>
            <h3 className={styles.statValue}>85%</h3>
          </div>
        </div>

        {/* Stat 2: Revenue */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.iconWrapper} ${styles.tertiaryIcon}`}>
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className={`mono-text ${styles.trendBadge}`}>
              <span className={`material-symbols-outlined ${styles.trendIcon}`}>trending_up</span> +8%
            </span>
          </div>
          <div>
            <p className={`mono-text ${styles.statLabel}`}>Doanh thu tháng (VND)</p>
            <h3 className={styles.statValue}>342M</h3>
          </div>
        </div>

        {/* Stat 3: Upcoming Events */}
        <div className={`${styles.statCard} ${styles.accentCard}`}>
          <div className={styles.accentBg1}></div>
          <div className={styles.accentBg2}></div>
          <div className={styles.statHeader} style={{ position: "relative", zIndex: 10 }}>
            <div className={`${styles.iconWrapper} ${styles.accentIconWrapper}`}>
              <span className="material-symbols-outlined">celebration</span>
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 10 }}>
            <p className={`mono-text ${styles.accentLabel}`}>Sự kiện sắp tới</p>
            <h3 className={styles.statValue} style={{ color: "var(--color-on-primary)" }}>4</h3>
            <p className={styles.accentDesc}>Pool Party vào T7 tuần này</p>
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Biểu đồ doanh thu</h3>
              <p className={`mono-text`} style={{ fontSize: "0.75rem", color: "var(--color-steel-secondary)" }}>
                7 ngày qua
              </p>
            </div>
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined" style={{ color: "var(--color-steel-secondary)", fontSize: "1.25rem" }}>
                more_horiz
              </span>
            </button>
          </div>
          <div className={styles.chartArea}>
            <div className={styles.chartBarWrapper}>
              <div className={styles.chartBar} style={{ height: "40%" }}></div>
              <span className={`mono-text ${styles.barLabel}`}>T2</span>
            </div>
            <div className={styles.chartBarWrapper}>
              <div className={styles.chartBar} style={{ height: "55%" }}></div>
              <span className={`mono-text ${styles.barLabel}`}>T3</span>
            </div>
            <div className={styles.chartBarWrapper}>
              <div className={`${styles.chartBar} ${styles.activeBar}`} style={{ height: "85%" }}></div>
              <span className={`mono-text ${styles.barLabel} ${styles.activeBarLabel}`}>T4</span>
            </div>
            <div className={styles.chartBarWrapper}>
              <div className={styles.chartBar} style={{ height: "60%" }}></div>
              <span className={`mono-text ${styles.barLabel}`}>T5</span>
            </div>
            <div className={styles.chartBarWrapper}>
              <div className={styles.chartBar} style={{ height: "70%" }}></div>
              <span className={`mono-text ${styles.barLabel}`}>T6</span>
            </div>
            <div className={styles.chartBarWrapper}>
              <div className={styles.chartBar} style={{ height: "95%" }}></div>
              <span className={`mono-text ${styles.barLabel}`}>T7</span>
            </div>
            <div className={styles.chartBarWrapper}>
              <div className={styles.chartBar} style={{ height: "80%" }}></div>
              <span className={`mono-text ${styles.barLabel}`}>CN</span>
            </div>
          </div>
        </div>

        {/* Yêu cầu mới */}
        <div className={styles.bookingsCard}>
          <div className={styles.bookingsHeader}>
            <h3 className={styles.bookingsTitle}>Yêu cầu mới</h3>
            <Link href="/admin/bookings" className={`mono-text ${styles.seeAllLink}`}>
              Xem tất cả
            </Link>
          </div>
          <div className={styles.bookingsList}>
            {/* Booking 1 */}
            <div className={styles.bookingItem}>
              <div className={styles.avatarCircle}>N</div>
              <div className={styles.bookingMeta}>
                <p className={styles.customerName}>Nguyễn Văn A</p>
                <p className={`mono-text ${styles.bookingDetails}`}>Villa Sea View • 2 đêm</p>
              </div>
              <span className={styles.unreadDot}></span>
            </div>
            {/* Booking 2 */}
            <div className={styles.bookingItem}>
              <div className={styles.avatarCircle}>T</div>
              <div className={styles.bookingMeta}>
                <p className={styles.customerName}>Trần Thị B</p>
                <p className={`mono-text ${styles.bookingDetails}`}>Standard Room • 1 đêm</p>
              </div>
              <span className={styles.unreadDot}></span>
            </div>
            {/* Booking 3 */}
            <div className={styles.bookingItem}>
              <div className={styles.avatarCircle}>L</div>
              <div className={styles.bookingMeta}>
                <p className={styles.customerName}>Lê Hoàng C</p>
                <p className={`mono-text ${styles.bookingDetails}`}>Family Suite • 3 đêm</p>
              </div>
              <span className={styles.unreadDot}></span>
            </div>
          </div>
          <button className={`mono-text ${styles.updateButton}`}>
            <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>refresh</span>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
