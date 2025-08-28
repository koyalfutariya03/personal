"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/BlogPage/Components/Breadcrumb.module.css";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className={styles.breadcrumb}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={index} className={isLast ? styles.active : ""}>
              {!isLast ? <Link href={href}>{decodeURIComponent(segment)}</Link> : decodeURIComponent(segment)}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
