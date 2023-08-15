import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "@/styles/InfosUser.module.css";
import Loader from "@/components/Loader";

interface GitHubFullUserData {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  id: number;
  folowers: number;
  public_repos: number;
}

interface UserData {
  userData: GitHubFullUserData;
}

export default function User() {
  const [fullDataUser, setFullDataUser] = useState<GitHubFullUserData | null>(
    null
  );
  const router = useRouter();
  const { username } = router.query;

  async function fetchData() {
    try {
      const response: any = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const userData: GitHubFullUserData = {
        login: response.data.login,
        name: response.data.name,
        location: response.data.location,
        avatar_url: response.data.avatar_url,
        id: response.data.id,
        folowers: response.data.followers,
        public_repos: response.data.public_repos,
      };

      if (userData != null) {
        setFullDataUser(userData);
      }
    } catch (e) {}
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className={styles.infos_container}>
      {fullDataUser ? (
        <div className={styles.profile}>
          <Image
            className={styles.user_image}
            src={fullDataUser.avatar_url}
            width={150}
            height={150}
            alt="avatar user"
          />

          <div className={styles.user_main_infos}>
            <h1>{fullDataUser.name}</h1>
            <p>{fullDataUser.login}</p>
            <p>id: {fullDataUser.id}</p>
          </div>

          <div className={styles.user_minor_infos}>
            <p>Seguidores: {fullDataUser.folowers}</p>
            <p>Repositórios públicos: {fullDataUser.public_repos}</p>
          </div>
        </div>
      ): <Loader />}
    </main>
  );
}
