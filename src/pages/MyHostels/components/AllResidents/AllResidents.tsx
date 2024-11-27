import { Modal, Table, Tabs, message } from "antd";
import styles from "./AllResidents.module.scss";
import { useEffect, useState } from "react";
import { deleteIcon, viewIcon } from "../../../../assets";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {
  BookingDetails,
  Reservation,
  ReservationHolder,
} from "../../../../types/types";
import { fetchHostelReservations } from "../../../../services/firebase";
import { Timestamp } from "firebase/firestore";
import { formatTimestamp } from "../../../../utils/utils";
import { Loader } from "../../../../components/Loader/Loader";
import { DocumentDetail } from "../../../../components/DocumentDetail/DocumentDetail";

const AllResidents = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedResident, setSelectedResident] =
    useState<Reservation | null>();
  const [residents, setResidents] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllResidents = async () => {
    setIsLoading(true);
    try {
      const fetchedResidents = await fetchHostelReservations();
      setResidents(fetchedResidents);
      console.log(fetchedResidents);
    } catch (error: any) {
      message.error(`Error fetching resident(s): ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResidents();
  }, []);

  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  const handleViewResident = (resident: Reservation) => {
    if (resident) setSelectedResident(resident);
  };

  const handleBackToTable = () => {
    setSelectedResident(null);
  };

  const columns = [
    {
      title: "ID",
      key: "userId",
      render: (record: { reservationHolder: ReservationHolder }) =>
        record.reservationHolder?.userId.slice(
          record.reservationHolder?.userId.length - 4,
          record.reservationHolder?.userId.length
        ) || "N/A",
    },
    {
      title: "Name",
      key: "fullname",
      render: (record: { reservationHolder: ReservationHolder }) =>
        record.reservationHolder?.fullName || "N/A",
    },
    {
      title: "Email",
      key: "email",
      render: (record: { reservationHolder: ReservationHolder }) =>
        record.reservationHolder?.email || "N/A",
    },

    {
      title: "Room Number",
      key: "roomNumber",
      render: (record: { reservationDetails: BookingDetails }) =>
        record.reservationDetails?.roomNumber || "N/A",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "JoiningDate",
      render: (createdAt: Timestamp) => formatTimestamp(createdAt),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (resident: Reservation) => {
        return (
          <div className={styles.actions}>
            <img
              onClick={() => handleViewResident(resident)}
              src={viewIcon}
              alt="view"
            />
            <img onClick={toggleDeleteModal} src={deleteIcon} alt="delete" />
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.allResidentsContainer}>
      {selectedResident ? (
        <div>
          <div className={styles.topSectionContainer}>
            <h2 className={styles.title}>Resident Detail</h2>
            <CustomButton
              title="Back to Residents List"
              variant="filled"
              onClick={handleBackToTable}
              size={"small"}
            />
          </div>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Personal Information" key="1">
              <div className={styles.cardsContainer}>
                <div className={styles.card}>
                  <h4 className={styles.cardTitle}>Resident Details</h4>
                  <div className={styles.detail}>
                    <h5>Full Name:</h5>
                    <p>{selectedResident.reservationHolder.fullName}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Email:</h5>
                    <p>{selectedResident.reservationHolder.email}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Phone Number:</h5>
                    <p>{selectedResident.reservationHolder.phoneNumber}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Current Status:</h5>
                    <p>{}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Room Number:</h5>
                    <p>{selectedResident.reservationDetails.roomNumber}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Room Price:</h5>
                    <p>{`Rs.${selectedResident.reservationDetails.hostelRent}`}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Duration:</h5>
                    <p>{selectedResident.reservationDetails.stay.duration}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Join Date:</h5>
                    <p>{selectedResident.reservationDetails.stay.startDate}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>End Date:</h5>
                    <p>{selectedResident.reservationDetails.stay.endDate}</p>
                  </div>
                </div>

                <div className={styles.card}>
                  <h4 className={styles.cardTitle}>Resident Documents</h4>
                  {selectedResident.reservationHolder?.documents && (
                    <div>
                      <DocumentDetail
                        title="CNIC Front Side"
                        link={
                          selectedResident.reservationHolder?.documents
                            .cnicFront
                        }
                      />
                      <DocumentDetail
                        title="CNIC Back Side"
                        link={
                          selectedResident.reservationHolder?.documents.cnicBack
                        }
                      />

                      {selectedResident.reservationHolder?.documents
                        ?.studentId && (
                        <DocumentDetail
                          title="Student-Id Card"
                          link={
                            selectedResident.reservationHolder?.documents
                              .studentId
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Payment Details" key="2">
              <div className={styles.cardsContainer}>
                <div className={styles.card}>
                  <h4 className={styles.cardTitle}>Current Month Status</h4>
                  <div className={styles.detail}>
                    <h5>Total Amount:</h5>
                    <p></p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Due Date:</h5>
                    <p></p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Status:</h5>
                    <p className={`${false ? styles.red : styles.green}`}></p>
                  </div>

                  <CustomButton
                    title="Mark Payment As Done"
                    variant="filled"
                    size="medium"
                  />
                </div>
              </div>

              <div className={styles.paymentDetails}>
                <h3>Payment History</h3>
                <Table
                  columns={[
                    { title: "Month", dataIndex: "month", key: "month" },
                    {
                      title: "Payment Amount",
                      dataIndex: "paymentAmount",
                      key: "paymentAmount",
                    },
                    { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
                    {
                      title: "Received Date",
                      dataIndex: "receivedDate",
                      key: "receivedDate",
                    },
                    { title: "Status", dataIndex: "status", key: "status" },
                  ]}
                  dataSource={[]}
                  pagination={false}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      ) : (
        <>
          <h2 className={styles.title}>Hostel Residents</h2>
          <Table
            columns={columns}
            dataSource={residents}
            bordered
            pagination={{ pageSize: 10 }}
          />
        </>
      )}

      {/* Deletion Modal */}
      <Modal
        title="Delete Resident"
        open={isDeleteModalVisible}
        onCancel={toggleDeleteModal}
        footer={[]}
      >
        <div className="modalContent">
          <p className="modalDescription">
            Are you sure you want to delete this resident? Remember all the
            history including payment track of this resident will be removed
            from the system.
            <br />
          </p>

          <div className="buttonsGroup">
            <button onClick={toggleDeleteModal} className="primary">
              Cancel
            </button>
            <button onClick={toggleDeleteModal} className="danger">
              Yes, I'm sure
            </button>
          </div>
        </div>
      </Modal>
      <Loader hide={!isLoading} />
    </div>
  );
};

export default AllResidents;
