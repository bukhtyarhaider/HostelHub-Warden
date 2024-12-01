import { useEffect, useState } from "react";
import { Modal } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./HostelNotices.module.scss";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { fetchNotices, saveNotice } from "../../../../services/firebase";
import { Loader } from "../../../../components/Loader/Loader";
import NotFound from "../../../../components/NotFound/NotFound";

const HostelNotices = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };

  const submitNotice = async () => {
    try {
      await saveNotice(title, editorContent);
      setTitle("");
      setEditorContent("");
      toggleModal();
      fetchAllNotices();
    } catch (error: any) {
      console.error("Error submitting notice:", error);
    }
  };

  const fetchAllNotices = async () => {
    setIsLoading(true);
    try {
      const fetchedNotices = await fetchNotices();
      setNotices(fetchedNotices);
    } catch (error: any) {
      console.error("Error fetching notices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotices();
  }, []);

  return (
    <div className={styles.hostelNoticesContainer}>
      <div className={styles.top}>
        <h2>All Notices</h2>
        <button onClick={toggleModal}>Add New Notice</button>
      </div>

      {notices.length ? (
        <div className={styles.cardsContainer}>
          {notices.map((data) => (
            <div key={data.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{data.title}</h2>
              <br />
              <div dangerouslySetInnerHTML={{ __html: data.body }} />
              <br />
              <p className={styles.date}>
                {new Date(data.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "20px" }}>
          <NotFound
            title="No Notice Found"
            message="You have not submitted any hostel notices yet."
          />
        </div>
      )}

      <Modal
        title="Add New Notice"
        open={isModalOpen}
        onOk={submitNotice}
        onCancel={toggleModal}
        okText="Add"
      >
        <CustomInput
          type="text"
          placeholder="Enter Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <ReactQuill
          value={editorContent}
          onChange={handleEditorChange}
          style={{ height: "250px" }}
        />
        <br />
      </Modal>
      <Loader hide={!isLoading} />
    </div>
  );
};

export default HostelNotices;
