import styles from "@/styles/Loader.module.css";

export default function Loader() {
  return (
    <main className={styles.loader_container}>
      <div className={styles.loader}></div>
    </main>
  )
}