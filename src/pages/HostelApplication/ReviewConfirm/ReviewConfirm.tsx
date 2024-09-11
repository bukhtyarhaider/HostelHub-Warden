import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "./ReviewConfirm.module.scss";

interface ReviewConfirmProps {
  formData: any;
}

const ReviewConfirm: React.FC<ReviewConfirmProps> = ({ formData }) => {
  // State to store image URLs
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    // Generate image URLs from the file objects in formData.images
    if (formData.images) {
      const imageUrls = formData.images.map((image: File) =>
        URL.createObjectURL(image)
      );
      setGalleryImages(imageUrls);
    }
  }, [formData.images]);

  function moveToZeroIndex(index: number) {
    if (index < 0 || index >= galleryImages.length) {
      throw new Error("Index out of bounds");
    }

    const updatedImages = [...galleryImages]; // Create a copy of the current images
    const element = updatedImages.splice(index, 1)[0]; // Remove the element at the specified index
    updatedImages.unshift(element); // Insert the removed element at the beginning

    setGalleryImages(updatedImages); // Update the state with the new array
  }

  const columns = [
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
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
      dataIndex: "roomPrice",
      key: "roomPrice",
    },
  ];

  const roomData = [
    {
      roomNumber: "DH-01",
      roomType: "Bunker Room",
      numberOfBeds: "04",
      washroom: "01",
      seatsAvailable: "02",
      roomPrice: "$1578",
    },
    // Add more room data as needed...
  ];

  return (
    <div className={styles.reviewConfirmContainer}>
      <div className={styles.hostelDetails}>
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Your Details</h4>
          <div className={styles.detail}>
            <h5>Full Name:</h5>
            <p>{formData.fullName}</p>
          </div>
          <div className={styles.detail}>
            <h5>Email:</h5>
            <p>{formData.email}</p>
          </div>
          <div className={styles.detail}>
            <h5>Phone Number:</h5>
            <p>{formData.phoneNumber}</p>
          </div>
          <div className={styles.detail}>
            <h5>Selected Hostel:</h5>
            <p>{formData.hostelName}</p>
          </div>
          <div className={styles.detail}>
            <h5>Selected Room:</h5>
            <p>{formData.roomNumber}</p>
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
          dataSource={roomData}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default ReviewConfirm;
