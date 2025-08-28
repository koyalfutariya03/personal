"use client";
import ParallaxScroll from "@/components/HomePage/ParallaxScroll";
import styles from "@/styles/HomePage/Achievements.module.css";

const images = [
  "https://i.imgur.com/rZohnIF.jpg",
  "https://i.imgur.com/vt6WzGJ.jpg",
  "https://i.imgur.com/UZSH8He.jpg",
  "https://i.imgur.com/AQjU01z.jpg",
  "https://i.imgur.com/iPTLXnY.jpg",
  "https://i.imgur.com/your4dg.jpg",
  "https://i.imgur.com/ZN86VMR.jpg",
  "https://i.imgur.com/qhMS713.jpg",
  "https://i.imgur.com/KJ5KL2n.jpg",
  "https://i.imgur.com/ADghQbm.jpg",
  "https://i.imgur.com/8FfQnL9.jpg",
  "https://i.imgur.com/ZXHDRNs.jpg",
  "https://i.imgur.com/iNrXB47.jpg",
  "https://i.imgur.com/GgPrUXL.jpg",
  "https://i.imgur.com/N9jG1Ir.jpg",
  "https://i.imgur.com/MjScSi9.jpg",
  "https://i.imgur.com/0eKfhXd.jpg",
  "https://i.imgur.com/xz6STYH.jpg",
  "https://i.imgur.com/FXN1ezN.jpg"
];


const Achievement = () => {
  return (
    <section id="achievements" className={styles.achievements}>
      <h2>Our Achievements</h2>
      <div className={styles.titleUnderline}></div>
      <ParallaxScroll images={images} />
    </section>
  );
};

export default Achievement;
