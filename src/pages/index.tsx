import CardNotFoundUser from "@/components/CardNotFoundUser";
import CardUser from "@/components/CardUser";
import axios from "axios";
import { useState } from "react";

import styles from "@/styles/Home.module.css";

interface GitHubUserData {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<GitHubUserData | null>(null);
  const [initalSafe, setInitialSafe] = useState(false);
  const [notValueUser, setNotValueUser] = useState(false);

  const fetchData = async () => {
    if (searchValue != "") {
      try {
        const response: any = await axios.get(
          `https://api.github.com/users/${searchValue}`
        );

        const userData: GitHubUserData = {
          login: response.data.login,
          name: response.data.name,
          location: response.data.location,
          avatar_url: response.data.avatar_url,
        };

        let usersStorage = localStorage.getItem("users");

        if (usersStorage) {
          let users: Array<string> = JSON.parse(usersStorage);

          if (users.includes(JSON.stringify(userData))) {
            users = users.filter((item) => {
              return item !== JSON.stringify(userData);
            });
          }

          users.push(JSON.stringify(userData));

          localStorage.setItem("users", JSON.stringify(users));
        } else {
          let users: Array<string> = JSON.parse("[]");

          users.push(JSON.stringify(userData));

          localStorage.setItem("users", JSON.stringify(users));
        }

        return setData(response.data);
      } catch (error) {
        setData(null);
      } finally {
        setInitialSafe(true);
        setNotValueUser(false);
        setSearchValue("");
      }
    } else {
      setNotValueUser(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  return (
    <main className={styles.home_container}>
      <div>
        <input
          type="text"
          placeholder="insira o username"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <button onClick={fetchData}>Pesquisar</button>
      </div>

      {notValueUser && (
        <p className={styles.not_user_alert}>
          *é necessário inserir um username para a pesquisa
        </p>
      )}

      {data ? <CardUser data={data} /> : initalSafe ? <CardNotFoundUser /> : ""}
    </main>
  );
}
