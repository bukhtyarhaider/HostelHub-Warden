import { useEffect, useState } from "react";
import CustomGallery from "../CustomGallery/CustomGallery";
import DetailsTable from "../DetailsTable/DetailsTable";
import styles from "./AllDetails.module.scss";
import { getHostelDetails } from "../../../../services/firebase";
import { Hostel } from "../../../../types/types"; // Ensure Room is imported
import { Loader } from "../../../../components/Loader/Loader";

const AllDetails = () => {
  const [hostelData, setHostelData] = useState<Hostel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        setIsLoading(true);
        const details = await getHostelDetails();
        setHostelData(details);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHostelDetails();
  }, []);

  return (
    <div className={styles.allDetailsContainer}>
      {hostelData ? (
        <>
          <CustomGallery
            title={hostelData.name ?? ""}
            subTitle={hostelData.type ?? ""}
            images={hostelData.images ?? []}
            location={hostelData.location}
          />
          <DetailsTable tableData={hostelData.rooms ?? []} />
          <div className={styles.description}>
            <h2>Description</h2>
            {hostelData.description}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {<Loader hide={!isLoading} />}
    </div>
  );
};

export default AllDetails;
