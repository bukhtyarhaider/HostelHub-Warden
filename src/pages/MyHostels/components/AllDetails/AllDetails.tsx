import {
  hostelDetailsDescriptionData,
  hostelDetailsTableData,
} from "../../../../content";
import CustomGallery from "../CustomGallery/CustomGallery";
import DetailsTable from "../DetailsTable/DetailsTable";
import styles from "./AllDetails.module.scss";

const AllDetails = () => {
  return (
    <div className={styles.allDetailsContainer}>
      <CustomGallery
        title={"Downing Hostel"}
        subTitle={"Student Accommodation"}
        images={[
          "https://picsum.photos/200",
          "https://picsum.photos/240",
          "https://picsum.photos/230",
          "https://picsum.photos/220",
        ]}
      />

      <DetailsTable tableData={hostelDetailsTableData} />

      <div className={styles.description}>
        <h2>{hostelDetailsDescriptionData.title}</h2>
        {hostelDetailsDescriptionData.description.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
    </div>
  );
};

export default AllDetails;
