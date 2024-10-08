import React, { useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import styles from "./RoomsDetails.module.scss";

interface RoomsDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

const { Option } = Select;

const RoomsDetails: React.FC<RoomsDetailsProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomType: "",
    numberOfBeds: "",
    washrooms: "",
    seatsAvailable: "",
    pricePerSeat: "",
  });

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setRoomData({ ...roomData, [name]: value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Add new room data to formData
    const updatedRooms = [...formData.rooms, roomData];
    setFormData({ ...formData, rooms: updatedRooms });

    // Clear roomData state and close modal
    setRoomData({
      roomNumber: "",
      roomType: "",
      numberOfBeds: "",
      washrooms: "",
      seatsAvailable: "",
      pricePerSeat: "",
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Room Number", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "Room Type", dataIndex: "roomType", key: "roomType" },
    { title: "Number of Beds", dataIndex: "numberOfBeds", key: "numberOfBeds" },
    { title: "Washrooms", dataIndex: "washrooms", key: "washrooms" },
    {
      title: "Seats Available",
      dataIndex: "seatsAvailable",
      key: "seatsAvailable",
    },
    {
      title: "Room Price/Seat",
      dataIndex: "pricePerSeat",
      key: "pricePerSeat",
    },
  ];

  return (
    <div className={styles.roomsDetailsContainer}>
      <h3 className={styles.heading}>Rooms Details</h3>

      {/* Table for displaying room details */}
      <Table
        dataSource={formData.rooms}
        columns={columns}
        pagination={false}
        rowKey="roomNumber"
        className={styles.table}
      />

      {/* Button to trigger modal */}
      <Button
        type="primary"
        onClick={showModal}
        className={styles.addRoomButton}
      >
        Add Another Room
      </Button>

      {/* Modal for adding a new room */}
      <Modal
        title="Add New Room"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className={styles.modalForm}>
          <label>Room Number</label>
          <Input
            name="roomNumber"
            value={roomData.roomNumber}
            onChange={handleModalChange}
            placeholder="Enter Room Number"
          />

          <label>Room Type</label>
          <Select
            value={roomData.roomType}
            onChange={(value) => handleSelectChange("roomType", value)}
            style={{ width: "100%" }}
          >
            <Option value="Single Room">Single Room</Option>
            <Option value="Double Room">Double Room</Option>
            <Option value="Bunker">Bunker</Option>
          </Select>

          <label>Number of Beds</label>
          <Input
            name="numberOfBeds"
            value={roomData.numberOfBeds}
            onChange={handleModalChange}
            placeholder="Enter Number of Beds"
          />

          <label>Washrooms</label>
          <Input
            name="washrooms"
            value={roomData.washrooms}
            onChange={handleModalChange}
            placeholder="Enter Number of Washrooms"
          />

          <label>Seats Available</label>
          <Input
            name="seatsAvailable"
            value={roomData.seatsAvailable}
            onChange={handleModalChange}
            placeholder="Enter Seats Available"
          />

          <label>Price/Seat</label>
          <Input
            name="pricePerSeat"
            value={roomData.pricePerSeat}
            onChange={handleModalChange}
            placeholder="Enter Price/Seat"
          />
        </form>
      </Modal>
    </div>
  );
};

export default RoomsDetails;
