import React, { useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import styles from "./RoomsDetails.module.scss";
import { Room } from "../../../types/types";

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
  const [roomData, setRoomData] = useState<Room>({
    roomNumber: "",
    type: "Single Room",
    numberOfBeds: 0,
    washroom: 0,
    seatsAvailable: 0,
    price: 0,
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
      type: "Single Room",
      numberOfBeds: 0,
      washroom: 0,
      seatsAvailable: 0,
      price: 0,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Room Number", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "Room Type", dataIndex: "type", key: "type" },
    { title: "Number of Beds", dataIndex: "numberOfBeds", key: "numberOfBeds" },
    { title: "Washrooms", dataIndex: "washroom", key: "washroom" },
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
            value={roomData.type}
            onChange={(value) => handleSelectChange("type", value)}
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
            name="washroom"
            value={roomData.washroom}
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
            name="price"
            value={roomData.price}
            onChange={handleModalChange}
            placeholder="Enter Price/Seat"
          />
        </form>
      </Modal>
    </div>
  );
};

export default RoomsDetails;
