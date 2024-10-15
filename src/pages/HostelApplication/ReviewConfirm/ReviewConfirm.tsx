import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "./ReviewConfirm.module.scss";

interface ReviewConfirmProps {
  formData: any;
}

const ReviewConfirm: React.FC<ReviewConfirmProps> = ({ formData }) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (formData.images) {
      const imageUrls = formData.images.map((image: Blob | MediaSource) => {
        if (image instanceof File) {
          return URL.createObjectURL(image);
        } else {
          return image;
        }
      });
      setGalleryImages(imageUrls);
    }
  }, [formData.images]);

  function moveToZeroIndex(index: number) {
    if (index < 0 || index >= galleryImages.length) {
      throw new Error("Index out of bounds");
    }

    const updatedImages = [...galleryImages];
    const element = updatedImages.splice(index, 1)[0];
    updatedImages.unshift(element);

    setGalleryImages(updatedImages);
  }

  const columns = [
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Room Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Number of Beds",
      dataIndex: "numberOfBeds",
      key: "numberOfBeds",
    },
    {
      title: "Washroom",
      dataIndex: "washroom",
      key: "washroom",
    },
    {
      title: "Seats Available",
      dataIndex: "seatsAvailable",
      key: "seatsAvailable",
    },
    {
      title: "Room Price/Seat",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div className={styles.reviewConfirmContainer}>
      <div className={styles.hostelDetails}>
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Your Details</h4>
          <div className={styles.detail}>
            <h5>Name:</h5>
            <p>{formData.name}</p>
          </div>
          <div className={styles.detail}>
            <h5>Email:</h5>
            <p>{formData.email}</p>
          </div>
          <div className={styles.detail}>
            <h5>Phone Number:</h5>
            <p>{formData.contactNumber}</p>
          </div>
          <div className={styles.detail}>
            <h5>Location:</h5>
            <p>{formData.location}</p>
          </div>
          <div className={styles.detail}>
            <h5>Type:</h5>
            <p>{formData.type}</p>
          </div>
        </div>

        <div className={styles.gallery}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              {galleryImages.length > 0 && (
                <img src={galleryImages[0]} alt="Main" />
              )}
            </div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.imagesList}>
              {galleryImages.slice(1).map((image: string, index: number) => (
                <div
                  className={styles.imgWrapper}
                  onClick={() => moveToZeroIndex(index + 1)}
                  key={index}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h4 className={styles.tableTitle}>All Rooms</h4>
        <Table
          columns={columns}
          dataSource={formData.rooms}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default ReviewConfirm;
