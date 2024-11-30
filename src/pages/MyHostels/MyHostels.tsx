import { ReactSVG } from "react-svg";
import styles from "./MyHostels.module.scss";
import { Tabs } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import AllDetails from "./components/AllDetails/AllDetails";
import HostelNotices from "./components/HostelNotices/HostelNotices";
import AllResidents from "./components/AllResidents/AllResidents";
import { getWardenStatistics } from "../../services/firebase";
import {
  totalHostelsIcon,
  totalRequestsIcon,
  totalResidentsIcon,
  totalRevenueIcon,
} from "../../assets";
import { abbreviateNumber } from "../../utils/utils";

const MyHostels = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [stats, setStats] = useState<any>([
    {
      label: "Total Rooms",
      value: "0",
      icon: totalHostelsIcon,
    },
    {
      label: "Total Residents",
      value: "0",
      icon: totalResidentsIcon,
    },
    {
      label: "New Requests",
      value: "0",
      icon: totalRequestsIcon,
    },
    {
      label: "Total Revenue",
      value: "0",
      icon: totalRevenueIcon,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const fetchAllStats = async () => {
    setIsLoading(true);
    try {
      const fetchStats = await getWardenStatistics();

      const statisticsData = [
        {
          label: "Total Rooms",
          value: abbreviateNumber(fetchStats.totalRooms),
          icon: totalHostelsIcon,
        },
        {
          label: "Total Residents",
          value: abbreviateNumber(fetchStats.totalResidents),
          icon: totalResidentsIcon,
        },
        {
          label: "New Requests",
          value: abbreviateNumber(fetchStats.newRequests),
          icon: totalRequestsIcon,
        },
        {
          label: "Total Revenue",
          value: abbreviateNumber(fetchStats.totalRevenue),
          icon: totalRevenueIcon,
        },
      ];

      setStats(statisticsData);
    } catch (error: any) {
      console.error("Error fetching notices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  return (
    <div className={styles.myHostelsContainer}>
      <div className={styles.statsSection}>
        {stats.map((data: any) => (
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
