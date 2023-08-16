import Link from "next/link";

import styles from "@/styles/CardRepo.module.css";

interface Data {
  name: string;
  language: string | null;
  description: string | null;
  created_at: string;
  pushed_at: string;
  html_url: string;
}

interface RepoData {
  data: Data;
}

export default function CardRepo({ data }: RepoData) {
  return (
    <Link target="_blank" href={data.html_url} className={styles.repo_link}>
      <main className={styles.repo_container}>
        <div className={styles.card_infos}>
          <div className={styles.card_main_infos}>
            <h1>{data.name}</h1>
            {data.language && (
              <p>
                <span>Linguagem: </span>
                {data.language}
              </p>
            )}
          </div>
          <div className={styles.card_date_infos}>
            <p>
              <span>Criado em:</span> {data.created_at}
            </p>
            <p>
              <span>Último push:</span> {data.pushed_at}
            </p>
          </div>
        </div>

        <div className={styles.card_description}>
          {data.description ? (
            <>
              <span>Descrição: </span>
              {data.description}
            </>
          ) : (
            "Sem descrição."
          )}
        </div>
      </main>
    </Link>
  );
}
