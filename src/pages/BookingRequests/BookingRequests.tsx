import { useState, useEffect, SetStateAction } from "react";
import { Tabs, Table, Modal } from "antd";
import styles from "./BookingRequests.module.scss";
import { requestsData } from "../../content";

const BookingRequests = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [filteredData, setFilteredData] = useState(requestsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  const pastRequests = requestsData.filter(
    (resident) => resident.type === "past"
  );
  const activeRequests = requestsData.filter(
    (resident) => resident.type === "active"
  );

  // Function to update filtered data based on active tab
  const updateFilteredData = (key: SetStateAction<string>) => {
    let data = [];
    switch (key) {
      case "1":
        data = activeRequests;
        break;
      case "2":
        data = pastRequests;
        break;
      default:
        data = requestsData;
    }

    // If there's a search term, filter the data
    if (searchTerm) {
      data = data.filter(
        (resident) =>
          resident.candidateName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          resident.selectedHostel
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          resident.hostelType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  };

  const handleTabChange = (key: SetStateAction<string>) => {
    setActiveKey(key);
    updateFilteredData(key);
  };

  const handleSearch = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Update data filtering based on the new search term
    updateFilteredData(activeKey);
  };

  useEffect(() => {
    // Update filtered data when the active key or search term changes
    updateFilteredData(activeKey);
  }, [activeKey]);

  // Function to show the details modal
  const showModal = (resident: SetStateAction<null>) => {
    setSelectedResident(resident);
    setIsModalVisible(true);
  };

  // Function to close the details modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to show the confirmation modal when rejecting a request
  const handleReject = () => {
    setIsModalVisible(false);
    setIsConfirmModalVisible(true);
  };

  // Function to confirm the rejection
  const handleConfirmReject = () => {
    setIsConfirmModalVisible(false);
  };

  // Function to cancel the rejection confirmation
  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  // Dynamic columns based on active tab
  const columns = [
    {
      title: "Candidate Name",
      dataIndex: "candidateName",
      key: "candidateName",
    },
    {
      title: "Request Date",
      dataIndex: "RequestDate",
      key: "RequestDate",
    },
    {
      title: "Requested Type",
      dataIndex: "RequestedType",
      key: "RequestedType",
    },
    {
      title: "Requested Room",
      dataIndex: "RequestedRoom",
      key: "RequestedRoom",
    },
    { title: "Status", dataIndex: "status", key: "status" },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (warden: SetStateAction<null>) => {
        if (activeKey == "1") {
          return (
            <div className={styles.actions}>
              <button onClick={() => showModal(warden)}>View Details</button>
            </div>
          );
        }
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: "ACTIVE REQUESTS",
      children: (
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={filteredData}
            bordered
            pagination={{ pageSize: 10 }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "PAST REQUESTS",
      children: (
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={filteredData}
            bordered
            pagination={{ pageSize: 10 }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.bookingRequestsContainer}>
      {/* Search Bar */}
      <div className={styles.searchSection}>
        <h6 className={styles.heading}>Requests</h6>
        <input
          type="text"
          placeholder="Search hostels, locations"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />

      {/* Details Modal */}
      <Modal
        title="Hostel Application"
        open={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[]}
      >
        <div className="modalContent">
          <div className="cardsContainer">
            <div className="card">
              <h4 className="cardTitle">Candidate Details</h4>
              <div className="detail">
                <h5>Full Name:</h5>
                <p>{selectedResident?.candidateName}</p>
              </div>
              <div className="detail">
                <h5>Email:</h5>
                <p>{selectedResident?.email}</p>
              </div>
              <div className="detail">
                <h5>Phone Number:</h5>
                <p>{selectedResident?.phoneNumber}</p>
              </div>
            </div>

            <div className="card">
              <h4 className="cardTitle">Reservation Details</h4>
              <div className="detail">
                <h5>Selected Hostel:</h5>
                <p>{selectedResident?.selectedHostel}</p>
              </div>
              <div className="detail">
                <h5>Selected Room:</h5>
                <p>{selectedResident?.selectedRoom}</p>
              </div>
              <div className="detail">
                <h5>Hostel Type:</h5>
                <p>{selectedResident?.hostelType}</p>
              </div>
            </div>
          </div>
          <div className="buttonsGroup">
            <button onClick={handleReject} className="danger">
              Reject
            </button>
            <button className="success">Approve</button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        title="Reject Request"
        open={isConfirmModalVisible}
        onCancel={handleConfirmCancel}
        footer={[]}
      >
        <div className="modalContent">
          <p className="modalDescription">
            Are you sure you want to reject this request? Remember you cannot
            revive rejected requests again.
          </p>

          <div className="buttonsGroup">
            <button onClick={handleConfirmCancel} className="primary">
              Cancel
            </button>
            <button onClick={handleConfirmReject} className="success">
              Yes, I'm sure
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingRequests;
