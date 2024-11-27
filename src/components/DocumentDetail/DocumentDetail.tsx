import CustomButton from "../CustomButton/CustomButton";
import { DocumentDetailProps } from "./DocumentDetailProps";
import styles from "./DocumentDetail.module.scss";

export const DocumentDetail: React.FC<DocumentDetailProps> = ({
  title,
  link,
}) => (
  <div className={styles.documnetContainer}>
    <p>{title}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <CustomButton title="Download" variant="outline" size={"small"} />
    </a>
  </div>
);
