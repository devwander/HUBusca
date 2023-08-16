import styles from "@/styles/ListRepos.module.css";
import CardRepo from "./CardRepo";

interface ReporData {
  name: string;
  language: string | null;
  description: string | null;
  created_at: string;
  pushed_at: string;
  html_url: string;
}

export default function ListRepos({ data }: any) {
  return (
    <main className={styles.list_repos_container}>
      <h2>Repositórios públicos</h2>
      <div className={styles.list_repos}>
        {data.map((repo: any, index: number) => (
          <CardRepo data={repo} key={index} />
        ))}
      </div>
    </main>
  );
}
