import Image from "next/image";

import styles from "@/styles/CardUser.module.css";
import { useRouter } from "next/router";

interface GitHubUserData {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
}

interface Props {
  data: GitHubUserData;
}

export default function CardUser({ data }: Props) {
  const router = useRouter();

  function handleProfile() {
    router.push({
      pathname: `user/${data.login}`,
      query: router.query,
    });
  }

  return (
    <div onClick={handleProfile} className={styles.card_container}>
      <Image
        className={styles.user_image}
        src={data.avatar_url}
        width={50}
        height={50}
        alt="avatar user"
      />
      <div className={styles.data}>
        <p>
          <span>username:</span> {data.login}
        </p>
        <p>
          <span>nome:</span> {data.name}
        </p>
        <p>
          <span>localização:</span> {data.location}
        </p>
      </div>
    </div>
  );
}
