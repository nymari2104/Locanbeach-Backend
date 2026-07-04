import styles from "./page.module.css";

export default function Combos() {
  return (
    <div className={styles.container} style={{ paddingTop: "2rem", paddingBottom: "var(--spacing-section-gap)" }}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Combo Nghỉ Dưỡng</h1>
        <p className={styles.subtitle}>
          Kết hợp hoàn hảo giữa lưu trú đẳng cấp, ẩm thực tinh tế và dịch vụ chăm sóc sức khỏe với mức giá ưu đãi nhất.
        </p>
      </section>

      {/* Combos Grid */}
      <section className={styles.grid}>
        {/* Combo 1 */}
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Gói Trăng Mật Đại Dương"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVI-d-XuOm9s9pVuf9PTim01PDWXa8jKn5tyX2VVdLre7_glyiJkTv8FF3QCFTTGMbDu0WEHd4gBkucYykfq3oEitq57nmz_GfNiDWAsqBGhZ16sZjiAjT93sF7N67haghhYYkSAdsValRzYFxjlkj2hkrVJ79_hdeIyts6WQcgg10hCt-umy7BA5nHQeyfpW-NWNbBYiL8eiCmaBOVSgNXhdqGTUbHKobseMU9USyYKhGtwBaEiRh"
            />
            <span className={styles.badge}>Phổ biến</span>
          </div>
          <div className={styles.content}>
            <div>
              <h2 className={styles.cardTitle}>Gói Trăng Mật Đại Dương</h2>
              <p className={styles.cardDesc}>
                Trải nghiệm 3 ngày 2 đêm tại phòng Suite Hướng Biển + Bữa tối lãng mạn dưới ánh nến tại bãi biển + Massage cặp đôi 60 phút tại Spa.
              </p>
            </div>
            <div className={styles.footer}>
              <span className={styles.price}>5,500,000 ₫</span>
              <button className={`mono-text ${styles.button}`}>Đặt ngay</button>
            </div>
          </div>
        </div>

        {/* Combo 2 */}
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Gói Năng Lượng Đội Nhóm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK6V4s8DGuvriwSZjS2nGm1qbgRDnNn0Ig_mTyUTKpTZsMV5u7nWc90_dB9IKw4VJzGzfg5VkIgSdtNLSYBiOwvkYZ36jetPCx8UZ9JjAeNa3ChGeIt9klofEA98nVKfTjQrn0Bp-cEDJU4p-0q5tkBd5bsPI1azqValtSG6OlzR69ZuXdE3cmwqTQpp5Z0PP7OEGohuDKAmZt3WZ0Vx7bASngUWFb1Hd3_4csvrAu0q2fOXZYOAEF"
            />
          </div>
          <div className={styles.content}>
            <div>
              <h2 className={styles.cardTitle}>Gói Năng Lượng Đội Nhóm</h2>
              <p className={styles.cardDesc}>
                Dành cho đoàn từ 20 người. Bao gồm setup bãi cỏ chơi team building + Hệ thống âm thanh ánh sáng cơ bản + Tiệc nướng BBQ hải sản ngoài trời.
              </p>
            </div>
            <div className={styles.footer}>
              <span className={styles.price}>12,000,000 ₫</span>
              <button className={`mono-text ${styles.button}`}>Đặt ngay</button>
            </div>
          </div>
        </div>

        {/* Combo 3 */}
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Gói Cuối Tuần Tĩnh Lặng"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjT4JHdoPg1bdAO7fHLPj6l-lgiDOSvuQeJirUHNpjDSZ_ZqHAL2vRJyYP9uSNHX2YsWsUg0nhweQKAtXN9PgjmGRr2K84d0p065IJWR7z8k8OFzbqO_UTUb4E4vNQ_xWebxDcFVYEkZjLOvNo4G7rVEd-kSOC6GVbRyiugI-MT3b6zju8rpNAsUYZmdbsTGBcJ-4-HWPgGaMuJ7t5YyTLv-SL95vteB_utAFq9ypy_9ZOm-joKMqq"
            />
          </div>
          <div className={styles.content}>
            <div>
              <h2 className={styles.cardTitle}>Gói Cuối Tuần Tĩnh Lặng</h2>
              <p className={styles.cardDesc}>
                Dành cho người bận rộn cần nghỉ ngơi. Gồm 2 đêm nghỉ tại phòng Garden Deluxe + Lớp học Yoga đón bình minh + Set trà chiều ngắm biển.
              </p>
            </div>
            <div className={styles.footer}>
              <span className={styles.price}>3,200,000 ₫</span>
              <button className={`mono-text ${styles.button}`}>Đặt ngay</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
