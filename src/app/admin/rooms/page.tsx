import styles from "./page.module.css";

export default function AdminRooms() {
  return (
    <div>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <p className={`mono-text ${styles.preTitle}`}>Tổng quan</p>
          <h1 className={styles.title}>Danh sách phòng</h1>
        </div>
        <div className={styles.statsText}>
          <p className="mono-text">24/30 Phòng trống</p>
        </div>
      </header>

      {/* Filters Section */}
      <section className={styles.filtersSection}>
        <div className={styles.filterTabs}>
          <button className={`mono-text ${styles.tab}`}>Tất cả</button>
          <button className={`mono-text ${styles.tab} ${styles.activeTab}`}>Trống</button>
          <button className={`mono-text ${styles.tab}`}>Đã đặt</button>
          <button className={`mono-text ${styles.tab}`}>Đang dọn dẹp</button>
        </div>
        <div className={styles.selectWrapper}>
          <span className={`material-symbols-outlined ${styles.selectIcon}`}>filter_list</span>
          <select className={styles.select}>
            <option>Loại phòng: Tất cả</option>
            <option>Deluxe Ocean View</option>
            <option>Standard Garden</option>
            <option>Penthouse Suite</option>
          </select>
          <span className={`material-symbols-outlined ${styles.selectArrow}`}>expand_more</span>
        </div>
      </section>

      {/* Room Grid (Bento Layout) */}
      <section className={styles.grid}>
        {/* Room Card 1 */}
        <article className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Room 101"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzWvpCsujE0gUdYCAMms926CDG6fi2vNOn06xIBtxSmWZDdQ9oOeYm3sHs0M_3INXeGLZTdPLfaa8rG1zPmqZrmSO-k9Npu3H77Y98xJPMPQBq6JN6EeeTgceGCcrdV711q-OjCJRec0FLDh4CE1M4L3FSppdewyoRFORhsJSPpWC-kYdx7HGrrZ74rmPcM58idM-j6amNsPBIkwdSgH1j682rSmP_j2onCkkjBfdVRiv_9S3Uf2rm"
            />
            <div className={`${styles.badge} ${styles.badgeVacant}`}>
              <span className="mono-text">Trống</span>
            </div>
          </div>
          <div className={styles.cardDetails}>
            <div>
              <h3 className={styles.roomName}>P.101</h3>
              <p className={styles.roomType}>Deluxe Ocean View</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.iconButton}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>edit</span>
              </button>
              <button className={`${styles.iconButton} ${styles.deleteBtn}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>delete</span>
              </button>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <p className={`mono-text ${styles.priceLabel}`}>Giá mỗi đêm</p>
            <p className={`mono-text ${styles.priceValue}`}>2,500,000 VND</p>
          </div>
        </article>

        {/* Room Card 2 */}
        <article className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Room 102"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVrfEMm_64wjGSfcJ89wbsphQ2QBo9RIo3zl2bqqMMtBl3SiVNVqGaeuxsmloTiRSY7iVCxcAh10Ou3ZUbirEctbW7Pw9pH3gZy69V6b1l1bdfVoXOEE32w8Gi04GwrQM6PitilCL9mp9VoY248HLTz4TpbY0zB18fXrbNXnb1eKOYP1ZotJLgOSRWqTXHjgOjbvazyvbTtWLK7ShQzOw07h7RYplzud_X0__sZtQ1Nx1QBD_rkV6r"
            />
            <div className={`${styles.badge} ${styles.badgeOccupied}`}>
              <span className="mono-text">Đã đặt</span>
            </div>
          </div>
          <div className={styles.cardDetails}>
            <div>
              <h3 className={styles.roomName}>P.102</h3>
              <p className={styles.roomType}>Standard Garden</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.iconButton}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>edit</span>
              </button>
              <button className={`${styles.iconButton} ${styles.deleteBtn}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>delete</span>
              </button>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <p className={`mono-text ${styles.priceLabel}`}>Giá mỗi đêm</p>
            <p className={`mono-text ${styles.priceValue}`}>1,800,000 VND</p>
          </div>
        </article>

        {/* Room Card 3 */}
        <article className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Room 301"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyR9mfIQ7tfteUMNYUvph10Uk-2Uq1mf1WkBJGTynaOB2uX5nQfLUb3TGQr046-vQegB7OOC9xlKvvJYSNhY2D7kdhT92MsAKyf_nsXVOVG5JO_JqJpqDXoRVjnDpnzJfd2DQ0NVjZCvcgdKQ5HgDo6ZB3q_bJxBzZgSpQ1mzA6jA9WlpP896GwPFgvKfrTgUm0DSAs1CU6Gfy-vGAMPWlVsDsa4fYR0H0UeIg3mYs8RhZIYN_s0_4"
            />
            <div className={`${styles.badge} ${styles.badgeCleaning}`}>
              <span className="mono-text">Đang dọn dẹp</span>
            </div>
          </div>
          <div className={styles.cardDetails}>
            <div>
              <h3 className={styles.roomName}>P.301</h3>
              <p className={styles.roomType}>Penthouse Suite</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.iconButton}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>edit</span>
              </button>
              <button className={`${styles.iconButton} ${styles.deleteBtn}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>delete</span>
              </button>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <p className={`mono-text ${styles.priceLabel}`}>Giá mỗi đêm</p>
            <p className={`mono-text ${styles.priceValue}`}>8,500,000 VND</p>
          </div>
        </article>

        {/* Room Card 4 */}
        <article className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              alt="Room 103"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMH66fcmIRATTUTI_cuX14cCJ9H4e74W8OObldV7_UMRHo8dgIhX_FVX8yuKV4AkSLx7XlPGhXOn6PCOaQsFql2J64EbxaUqPrNePz3MnT_B7vskvTejLX24ti37rnfWgSpDUbSISnlz43V7aAE7rVds1bEd91FMxVmK4MYJs_fGgb14EuztcEPUUvaUyj47ZK0VmD6a4foTPsSpkJ7f1jX6Yb4wUUVcHKcvYGmN1a9Nq9iUfFcZbg"
            />
            <div className={`${styles.badge} ${styles.badgeVacant}`}>
              <span className="mono-text">Trống</span>
            </div>
          </div>
          <div className={styles.cardDetails}>
            <div>
              <h3 className={styles.roomName}>P.103</h3>
              <p className={styles.roomType}>Standard Garden</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.iconButton}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>edit</span>
              </button>
              <button className={`${styles.iconButton} ${styles.deleteBtn}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>delete</span>
              </button>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <p className={`mono-text ${styles.priceLabel}`}>Giá mỗi đêm</p>
            <p className={`mono-text ${styles.priceValue}`}>1,800,000 VND</p>
          </div>
        </article>
      </section>
    </div>
  );
}
