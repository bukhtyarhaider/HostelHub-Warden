import { Modal, Table, Tabs, Button } from "antd";
import styles from "./AllResidents.module.scss";
import { residentsData } from "../../../../content";
import { useState } from "react";
import { deleteIcon, viewIcon } from "../../../../assets";
import CustomButton from "../../../../components/CustomButton/CustomButton";

const AllResidents = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null); // State to manage selected resident

  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  const handleViewResident = (resident) => {
    setSelectedResident(resident); // Set the selected resident
  };

  const handleBackToTable = () => {
    setSelectedResident(null); // Clear selected resident to show table again
  };

  const columns = [
    { title: "Warden ID", dataIndex: "wardenId", key: "wardenId" },
    { title: "Warden Name", dataIndex: "wardenName", key: "wardenName" },
    { title: "Hostel Name", dataIndex: "hostelName", key: "hostelName" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, resident) => {
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
        <div className={styles.residentDetailContainer}>
          <CustomButton
            title="Back to Residents List"
            variant="outline"
            onClick={handleBackToTable}
            size={"small"}
          />
          <br />
          <h2 className={styles.title}>Resident Detail</h2>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Personal Information" key="1">
              <div className={styles.cardsContainer}>
                <div className={styles.card}>
                  <h4 className={styles.cardTitle}>Resident Details</h4>
                  <div className={styles.detail}>
                    <h5>Full Name:</h5>
                    <p>{selectedResident.wardenName}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Email:</h5>
                    <p>{selectedResident.email}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Phone Number:</h5>
                    <p>{selectedResident.phoneNumber}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Current Status:</h5>
                    <p>{selectedResident.status}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Room Number:</h5>
                    <p>{selectedResident.roomNumber}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Room Price:</h5>
                    <p>{selectedResident.roomPrice}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Duration:</h5>
                    <p>{selectedResident.duration}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Join Date:</h5>
                    <p>{selectedResident.joinDate}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>End Date:</h5>
                    <p>{selectedResident.endDate}</p>
                  </div>
                </div>

                <div className={styles.card}>
                  <h4 className={styles.cardTitle}>Resident Documents</h4>
                  {selectedResident.documents.map((doc, index) => (
                    <div key={index}>
                      {doc.name && (
                        <div className={styles.detail}>
                          <div>
                            <p>CNIC Front Side</p>
                            <p>{doc.name}</p>
                          </div>
                          <CustomButton
                            title={"Download"}
                            variant={"filled"}
                            size={"medium"}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Payment Details" key="2">
              <div className={styles.cardsContainer}>
                <div className={styles.card}>
                  <h4 className={styles.cardTitle}>Current Month Status</h4>
                  <div className={styles.detail}>
                    <h5>Total Amount:</h5>
                    <p>{selectedResident.totalAmount}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Due Date:</h5>
                    <p>{selectedResident.dueDate}</p>
                  </div>
                  <div className={styles.detail}>
                    <h5>Status:</h5>
                    <p
                      className={`${
                        selectedResident.paymentStatus === "Unpaid"
                          ? styles.red
                          : styles.green
                      }`}
                    >
                      {selectedResident.paymentStatus}
                    </p>
                  </div>

                  <CustomButton
                    title={"Mark Payment As Done"}
                    variant={"filled"}
                    size={"medium"}
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
                  dataSource={selectedResident.paymentHistory}
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
            dataSource={residentsData}
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
    </div>
  );
};

export default AllResidents;
