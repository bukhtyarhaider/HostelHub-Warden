import styles from "./NoHostelFound.module.scss";
import emptyHostelIcon from "../../assets/images/empty-state.png";

const NoHostelFound: React.FC = () => {
  return (
    <div className={styles.noHostelFound}>
      <div className={styles.iconContainer}>
        <img
          src={emptyHostelIcon}
          alt="No Hostel Icon"
          className={styles.icon}
        />
      </div>
      <h2 className={styles.title}>No Hostel Found</h2>
      <p className={styles.message}>
        Type in a different keyword to search better results
      </p>
    </div>
  );
};

export default NoHostelFound;
