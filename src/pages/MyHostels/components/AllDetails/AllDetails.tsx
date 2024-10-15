import { useEffect, useState } from "react";
import CustomGallery from "../CustomGallery/CustomGallery";
import DetailsTable from "../DetailsTable/DetailsTable";
import styles from "./AllDetails.module.scss";
import { getHostelDetails } from "../../../../services/firebase";
import { Hostel } from "../../../../types/types";
import { Loader } from "../../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const AllDetails = () => {
  const navigate = useNavigate();
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
      <div className={styles.top}>
        <h2></h2>
        <button
          onClick={() => {
            navigate("/add-hostel", {
              state: { edit: true, hostelDetails: hostelData },
            });
          }}
        >
          Edit Hostel
        </button>
      </div>
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
