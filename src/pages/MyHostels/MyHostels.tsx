import { ReactSVG } from "react-svg";
import styles from "./MyHostels.module.scss";
import { statisticsData } from "../../content";
import { Tabs } from "antd";
import { SetStateAction, useState } from "react";
import AllDetails from "./components/AllDetails/AllDetails";
import HostelNotices from "./components/HostelNotices/HostelNotices";
import AllResidents from "./components/AllResidents/AllResidents";

const MyHostels = () => {
  const [activeKey, setActiveKey] = useState("1");
  const handleTabChange = (key: SetStateAction<string>) => {
    setActiveKey(key);
  };
  const items = [
    {
      key: "1",
      label: "All Details",
      children: <AllDetails />,
    },
    {
      key: "2",
      label: "Hostel Notices",
      children: <HostelNotices />,
    },
    {
      key: "3",
      label: "All Residents",
      children: <AllResidents />,
    },
  ];

  return (
    <div className={styles.myHostelsContainer}>
      <div className={styles.statsSection}>
        {statisticsData.map((data) => (
          <div className={styles.statBox}>
            <div className={styles.left}>
              <ReactSVG src={data.icon} />
            </div>
            <div className={styles.right}>
              <h4>{data.label}</h4>
              <h3>{data.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
    </div>
  );
};

export default MyHostels;
