import { useState } from "react";
import styles from "./CustomGallery.module.scss";
import { locationIcon } from "../../../../assets";
import { CustomGalleryProps } from "./CustomGalleryProps";

const CustomGallery: React.FC<CustomGalleryProps> = ({
  title,
  subTitle,
  images,
  location,
}) => {
  const [galleryImages, setGalleryImages] = useState<string[]>(
    images.slice(1, 5)
  );

  function moveToZeroIndex(index: number) {
    if (index < 0 || index >= galleryImages.length) {
      throw new Error("Index out of bounds");
    }

    const updatedImages = [...galleryImages];
    const element = updatedImages.splice(index, 1)[0];
    updatedImages.unshift(element);

    setGalleryImages(updatedImages);
  }

  return (
    <div className={styles.CustomGalleryContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subTitle}>{subTitle}</p>
      </div>
      <div className={styles.top}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img src={galleryImages[0]} alt="Main" />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.topContent}>
            <div className={styles.profileCard}>
              <div className={styles.profile}>
                {/* <div className={styles.profilePicWrapper}>
                  <img src="https://picsum.photos/200" />
                </div> */}
                <div className={styles.profileContent}>
                  <h2>Robert Morris</h2>
                  <p>Hostel Warden</p>
                </div>
              </div>
            </div>
            <div className={styles.LocationCard}>
              <h2>Location</h2>
              <p>
                <span>
                  <img src={locationIcon} />
                </span>
                {location}
              </p>
            </div>
          </div>
          <div className={styles.imagesList}>
            {galleryImages.slice(1).map((image: string, index: number) => (
              <div
                className={styles.imgWrapper}
                onClick={() => {
                  moveToZeroIndex(index + 1); // Adjust index to account for slicing
                }}
                key={index}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomGallery;
