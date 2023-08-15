import styles from "@/styles/CardNotFoundUser.module.css";

export default function CardNotFoundUser() {
  return (
    <div className={styles.card_container}>
      <p>Não foi possível localizar o usuário!</p>
    </div>
  );
}
