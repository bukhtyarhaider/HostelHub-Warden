import React from "react";
import styles from "./NotFound.module.scss";
import emptyHostelIcon from "../../assets/images/empty-state.png";
import { NotFoundProps } from "./NotFoundProps";

const NotFound: React.FC<NotFoundProps> = ({
  title = "No Hostel Found",
  message = "Type in a different keyword to search better results",
  iconSrc = emptyHostelIcon,
}) => {
  return (
    <div className={styles.notFound}>
      <div className={styles.iconContainer}>
        <img src={iconSrc} alt="No Hostel Icon" className={styles.icon} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default NotFound;
