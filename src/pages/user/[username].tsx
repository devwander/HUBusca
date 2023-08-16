import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "@/styles/InfosUser.module.css";
import Loader from "@/components/Loader";
import ListRepos from "@/components/ListRepos";

interface GitHubFullUserData {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  id: number;
  folowers: number;
  public_repos: number;
}

interface ReporData {
  name: string;
  language: string | null;
  description: string | null;
  created_at: string;
  pushed_at: string;
  html_url: string;
}

export default function User() {
  const [fullDataUser, setFullDataUser] = useState<GitHubFullUserData | null>(
    null
  );
  const [dataRepos, setDataRepos] = useState<ReporData | null>(null);
  const router = useRouter();

  const { username } = router.query;

  async function fetchData() {
    try {
      const responseUserInfos: any = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const userData: GitHubFullUserData = {
        login: responseUserInfos.data.login,
        name: responseUserInfos.data.name,
        location: responseUserInfos.data.location,
        avatar_url: responseUserInfos.data.avatar_url,
        id: responseUserInfos.data.id,
        folowers: responseUserInfos.data.followers,
        public_repos: responseUserInfos.data.public_repos,
      };

      const responseReposInfos: any = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      if (userData != null) {
        setFullDataUser(userData);
      }

      if (responseReposInfos.data != null) {
        setDataRepos(responseReposInfos.data);
      }
    } catch (e) {}
  }

  useEffect(() => {
    fetchData();
  }, [router.query]);

  return (
    <main className={styles.infos_container}>
      {fullDataUser ? (
        <>
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

          {dataRepos && <ListRepos data={dataRepos} />}
        </>
      ) : (
        <>
          <Loader />
          <Loader />
        </>
      )}
    </main>
  );
}
