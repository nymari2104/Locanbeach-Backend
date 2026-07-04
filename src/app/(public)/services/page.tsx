import styles from "./page.module.css";

export default function Services() {
  return (
    <div className={styles.container} style={{ paddingTop: "2rem", paddingBottom: "var(--spacing-section-gap)" }}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Dịch vụ tại The House</h1>
        <p className={styles.subtitle}>
          Chúng tôi mang đến những dịch vụ cao cấp, được thiết kế riêng nhằm tạo ra những khoảnh khắc đáng nhớ trong kỳ nghỉ của bạn.
        </p>
      </section>

      {/* Services Grid */}
      <section className={styles.grid}>
        {/* Service 1: Wedding */}
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Tiệc cưới bờ biển"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwJBlhW9sAXliBgNRRj-Q9pE2lJPMmk8vKnUcFKSY9L9bq5RFsZ0DqtFy7z5bEUJqLXUqtPYB6PRveqozNF7leXkzPEOkgffhXRXFNIRbBOXXVSMfnDuC3GvMnVJFsAWniIhRVikV8gfGwZZTARCaWCYKJSYNhRIq3RISyCezoaIFvBN8prD2BcEEj_czLw0YBkYf45bGBOHWcznHC9sbtRTJdxq93yTNxInh59na5w_RVQ8PSBJyZ"
            />
          </div>
          <div className={styles.content}>
            <div>
              <h2 className={styles.cardTitle}>Tiệc cưới bên bờ biển</h2>
              <p className={styles.cardDesc}>
                Không gian lãng mạn, tinh tế cho ngày trọng đại dưới ánh hoàng hôn thơ mộng của Lộc An Beach.
              </p>
              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Sức chứa lên tới 150 khách
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Trang trí hoa tươi cao cấp
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Thực đơn ẩm thực biển đa dạng
                </li>
              </ul>
            </div>
            <button className={`mono-text ${styles.button}`}>Liên hệ đặt tiệc</button>
          </div>
        </div>

        {/* Service 2: Team Building */}
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Team building"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIxQBNPEniQ4lVy0qjv8s514zFEHazUiRJkYEVYu-5sofsjyWmmO5FpftA1c5KtU7IAmqH1AcBwb0JWZfiHNzUuvT7gUd2Y8j8fL_StJSycdh3z1YcO78PTlat_aRFNF7mKSySWv9CxltbScBX9VfNP4n4zXnty0aiR5Mh4r_o5xPJF0zvjXuJpxjTSPGuIp3TmXhAwdQE9wN_iFBRehmyiYdAmonacLw4fh_AzuCVOjjyQ6_ldYzR"
            />
          </div>
          <div className={styles.content}>
            <div>
              <h2 className={styles.cardTitle}>Team Building & Sự kiện doanh nghiệp</h2>
              <p className={styles.cardDesc}>
                Gắn kết đội ngũ trong không gian thiên nhiên khoáng đạt với các hoạt động ngoài trời hấp dẫn.
              </p>
              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Sân cỏ & Bãi biển riêng rộng rãi
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Hệ thống âm thanh, ánh sáng hiện đại
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Gói ăn tối BBQ hải sản ngoài trời
                </li>
              </ul>
            </div>
            <button className={`mono-text ${styles.button}`}>Nhận báo giá</button>
          </div>
        </div>

        {/* Service 3: Spa & Wellness */}
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Spa & Wellness"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgV7NUHLB1QsZ3N2qQTgSrRtMhbAIofx6kppgWvM7D0ENULujikfp9g-a_THuCarOqZzg0cT2arTytxBFNmrPLzmgFX6l4yVzMgAMDKPtIFJx0DhJI0XDAlk49c5WZdH40bdV36jPIEllfh6rbknATwh6GPcUuXL6j9jm20_Jr_aqF8yc_yOU7W-1TvHzcmPA8LEElEA_7aCHYRpS3kpbB-SB7snPEJUw3lFu9bgL0w2hmXgSC1Y7y"
            />
          </div>
          <div className={styles.content}>
            <div>
              <h2 className={styles.cardTitle}>Spa & Trị liệu sức khỏe</h2>
              <p className={styles.cardDesc}>
                Tận hưởng dịch vụ trị liệu cá nhân hóa, giúp phục hồi năng lượng trong không gian tĩnh lặng tuyệt đối.
              </p>
              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Massage đá nóng và thảo dược
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Không gian trị liệu hướng vườn tĩnh lặng
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Sử dụng tinh dầu organic 100%
                </li>
              </ul>
            </div>
            <button className={`mono-text ${styles.button}`}>Đặt lịch ngay</button>
          </div>
        </div>

        {/* Service 4: Dining */}
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Ẩm thực"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjT4JHdoPg1bdAO7fHLPj6l-lgiDOSvuQeJirUHNpjDSZ_ZqHAL2vRJyYP9uSNHX2YsWsUg0nhweQKAtXN9PgjmGRr2K84d0p065IJWR7z8k8OFzbqO_UTUb4E4vNQ_xWebxDcFVYEkZjLOvNo4G7rVEd-kSOC6GVbRyiugI-MT3b6zju8rpNAsUYZmdbsTGBcJ-4-HWPgGaMuJ7t5YyTLv-SL95vteB_utAFq9ypy_9ZOm-joKMqq"
            />
          </div>
          <div className={styles.content}>
            <div>
              <h2 className={styles.cardTitle}>Ẩm thực & Nhà hàng Ocean</h2>
              <p className={styles.cardDesc}>
                Khám phá bản đồ ẩm thực đặc sắc kết hợp tinh hoa địa phương và quốc tế bên tiếng sóng rì rào.
              </p>
              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Hải sản tươi sống đánh bắt trong ngày
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Không gian nhà hàng mở hướng biển
                </li>
                <li className={styles.detailItem}>
                  <span className={`material-symbols-outlined ${styles.icon}`}>check_circle</span>
                  Menu cocktail phong phú
                </li>
              </ul>
            </div>
            <button className={`mono-text ${styles.button}`}>Xem thực đơn</button>
          </div>
        </div>
      </section>
    </div>
  );
}
