import Link from "next/link";

import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <h1>HUBusca</h1>
        </Link>
      </div>
      <ul className={styles.link_items}>
        <li>
          <Link href="/historic">Histórico</Link>
        </li>
      </ul>
    </nav>
  );
}
