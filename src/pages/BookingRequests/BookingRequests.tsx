import { useState, useEffect } from "react";
import { Tabs, Table, Modal, message } from "antd";
import styles from "./BookingRequests.module.scss";
import { BookingApplication } from "../../types/types";
import {
  fetchHostelBookingApplicationRequests,
  updateBookingApplicationStatus,
} from "../../services/firebase";
import { Loader } from "../../components/Loader/Loader";
import { Timestamp } from "firebase/firestore";
import { formatTimestamp } from "../../utils/utils";
import { DocumentDetail } from "../../components/DocumentDetail/DocumentDetail";

const BookingRequests = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [filteredData, setFilteredData] = useState<BookingApplication[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BookingApplication>();
  const [bookingApplicationRequests, setBookingApplicationRequests] = useState<
    BookingApplication[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookingRequestsData = async () => {
      setIsLoading(true);
      try {
        const requests = await fetchHostelBookingApplicationRequests();
        setBookingApplicationRequests(requests);
        setFilteredData(
          requests.filter((request) => request.status === "pending")
        );
      } catch (err) {
        message.error(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingRequestsData();
  }, []);

  const pastRequests = bookingApplicationRequests.filter(
    (request) => request.status !== "pending"
  );
  const activeRequests = bookingApplicationRequests.filter(
    (request) => request.status === "pending"
  );

  // Function to update filtered data based on active tab
  const updateFilteredData = (key: string) => {
    let data = [];
    switch (key) {
      case "1":
        data = activeRequests;
        break;
      case "2":
        data = pastRequests;
        break;
      default:
        data = bookingApplicationRequests;
    }

    // If there's a search term, filter the data
    if (searchTerm) {
      data = data.filter((request) =>
        request.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  };

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    updateFilteredData(key);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const showModal = (resident: BookingApplication | undefined) => {
    setSelectedRequest(resident);
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
  const handleConfirmReject = async () => {
    if (selectedRequest) {
      setIsConfirmModalVisible(false);
      setIsLoading(true);
      try {
        await updateBookingApplicationStatus(selectedRequest.id, "rejected");
        const updatedBookingApplication = bookingApplicationRequests.map(
          (request) =>
            request.id === selectedRequest.id
              ? ({ ...request, status: "rejected" } as BookingApplication)
              : request
        );

        setBookingApplicationRequests(updatedBookingApplication);
        updateFilteredData(activeKey); // Ensure filtered data is updated
        message.success("Request is successfully rejected");
      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleApprove = async () => {
    if (selectedRequest) {
      setIsModalVisible(false);
      setIsLoading(true);
      try {
        await updateBookingApplicationStatus(selectedRequest.id, "approved");
        const updatedBookingApplication = bookingApplicationRequests.map(
          (request) =>
            request.id === selectedRequest.id
              ? ({ ...request, status: "approved" } as BookingApplication)
              : request
        );

        setBookingApplicationRequests(updatedBookingApplication);
        updateFilteredData(activeKey); // Ensure filtered data is updated
        message.success("Request is successfully approved");
      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to cancel the rejection confirmation
  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const columns = [
    {
      title: "Candidate Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "RequestDate",
      render: (createdAt: Timestamp) => formatTimestamp(createdAt),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Room Number",
      key: "roomNumber",
      render: (record: { booking: { roomNumber: any } }) =>
        record.booking?.roomNumber || "N/A",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: BookingApplication) => (
        <div className={styles.actions}>
          <button onClick={() => showModal(record)}>View Details</button>
        </div>
      ),
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
                <p>{selectedRequest?.fullName}</p>
              </div>
              <div className="detail">
                <h5>Email:</h5>
                <p>{selectedRequest?.email}</p>
              </div>
              <div className="detail">
                <h5>Phone Number:</h5>
                <p>{selectedRequest?.phoneNumber ?? "N/A"}</p>
              </div>
            </div>

            <div className="card">
              <h4 className="cardTitle">Reservation Details</h4>
              <div className="detail">
                <h5>Selected Hostel:</h5>
                <p>{selectedRequest?.hostel.name}</p>
              </div>
              <div className="detail">
                <h5>Hostel Type:</h5>
                <p>{selectedRequest?.hostel.type}</p>
              </div>
              <div className="detail">
                <h5>Selected Room:</h5>
                <p>{selectedRequest?.booking.roomNumber}</p>
              </div>
              <div className="detail">
                <h5>Room Rent:</h5>
                <p>{`Rs. ${selectedRequest?.booking.hostelRent}`}</p>
              </div>

              <div className="detail">
                <h5>Stay Duration:</h5>
                <p>{selectedRequest?.booking.stay.duration}</p>
              </div>
              <div className="detail">
                <h5>Start Date:</h5>
                <p>{selectedRequest?.booking.stay.startDate}</p>
              </div>
              <div className="detail">
                <h5>End Date:</h5>
                <p>{selectedRequest?.booking.stay.endDate}</p>
              </div>
            </div>

            <div className="card">
              <h4 className="cardTitle">Resident Documents</h4>
              {selectedRequest?.documents && (
                <div>
                  <DocumentDetail
                    title="CNIC Front Side"
                    link={selectedRequest.documents.cnicFront}
                  />
                  <DocumentDetail
                    title="CNIC Back Side"
                    link={selectedRequest.documents.cnicBack}
                  />

                  {selectedRequest?.documents?.studentId && (
                    <DocumentDetail
                      title="Student-Id Card"
                      link={selectedRequest.documents.studentId}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {selectedRequest?.status === "pending" ? (
            <div className="buttonsGroup">
              <button onClick={handleReject} className="danger">
                Reject
              </button>
              <button onClick={handleApprove} className="success">
                Approve
              </button>
            </div>
          ) : null}
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
      <Loader hide={!isLoading} />
    </div>
  );
};

export default BookingRequests;
