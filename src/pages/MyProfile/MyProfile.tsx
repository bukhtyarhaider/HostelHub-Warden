import { Tabs } from "antd";
import styles from "./MyProfile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ChangePassword from "./ChangePassword/ChangePassword";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/firebase";
import { UserData, UserProfile } from "./MyProfileProps";

const MyProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: UserProfile = await getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserData({ error: "Failed to load user data." });
      }
    };

    fetchData();
  }, []);

  const items = [
    {
      key: "1",
      label: "USER INFORMATION",
      children:
        userData && "displayName" in userData ? (
          <ProfileInfo userData={userData} setUserData={setUserData} />
        ) : userData && "error" in userData ? (
          <p>{userData.error}</p>
        ) : (
          <p>Loading...</p>
        ),
    },
    {
      key: "2",
      label: "CHANGE PASSWORD",
      children: <ChangePassword />,
    },
  ];

  return (
    <div className={styles.myProfileContainer}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default MyProfile;
