import { useState, useEffect } from "react";

import styles from "@/styles/Historic.module.css";
import CardUser from "@/components/CardUser";
import CardNotFoundUsersHistoric from "@/components/CardNotFoundUsersHistoric";
import Link from "next/link";
import { useRouter } from "next/router";

interface GitHubUserData {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
}

export default function Historic() {
  const [usersData, setUsersData] = useState<Array<GitHubUserData> | null>(
    null
  );
  const [clearHistory, setClearHistory] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    if (localStorage.getItem("users")) {
      const users: string | null = localStorage.getItem("users");

      if (users && users != "[]") {
        const userData = JSON.parse(users);
        const dataArray: Array<GitHubUserData> = userData.map((item: string) =>
          JSON.parse(item)
        );
        setUsersData(dataArray.reverse());
      }
    }
  };

  function clearHistoryFunc() {
    localStorage.setItem("users", "[]");
    setClearHistory(true);
    setUsersData(null);
  }

  useEffect(() => {
    fetchData();
  }, [clearHistory]);

  return (
    <main className={styles.historic_container}>
      {usersData && (
        <button className={styles.btn_clear} onClick={clearHistoryFunc}>
          Limpar Histórico
        </button>
      )}

      {usersData !== null ? (
        usersData.map((user: GitHubUserData) => (
          <Link
            key={user.login}
            className={styles.card_link}
            href={`user/${user.login}`}
          >
            <CardUser key={user.login} data={user} />
          </Link>
        ))
      ) : (
        <CardNotFoundUsersHistoric />
      )}
    </main>
  );
}
