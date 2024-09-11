import { useState } from "react";
import { Modal } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { noticesData } from "../../../../content";
import styles from "./HostelNotices.module.scss";

const HostelNotices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  return (
    <div className={styles.hostelNoticesContainer}>
      <div className={styles.top}>
        <h2>All Notices</h2>
        <button onClick={toggleModal}>Add New Notice</button>
      </div>

      <div className={styles.cardsContainer}>
        {noticesData.map((data, index) => (
          <div key={index} className={styles.card}>
            <h2 className={styles.cardTitle}>{data.title}</h2>
            <p className={styles.description}>{data.description}</p>
            <p className={styles.date}>{data.date}</p>
          </div>
        ))}
      </div>

      <Modal
        title="Add New Notice"
        open={isModalOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        okText="Add"
      >
        <ReactQuill value={editorContent} onChange={handleEditorChange} />
      </Modal>
    </div>
  );
};

export default HostelNotices;
