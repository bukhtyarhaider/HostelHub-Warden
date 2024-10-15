import React from "react";
import { Select, Input } from "antd";
import styles from "./HostelDetails.module.scss";
import CustomInput from "../../../components/CustomInput/CustomInput";

const { Option } = Select;
const { TextArea } = Input;

interface HostelDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

const HostelDetails: React.FC<HostelDetailsProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.hostelDetailsContainer}>
      <h3 className={styles.heading}>Hostel Information</h3>

      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <label>Hostel Name</label>
          <div className={styles.input}>
            <CustomInput
              type="text"
              name="name"
              placeholder="Hostel name"
              label=""
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
        </div>

        {/* Hostel Location */}
        <div className={styles.inputContainer}>
          <label>Hostel Location</label>
          <div className={styles.input}>
            <CustomInput
              type="text"
              name="location"
              placeholder="Hostel location"
              label=""
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <div className="error">{errors.location}</div>}
          </div>
        </div>

        {/* Email */}
        <div className={styles.inputContainer}>
          <label>Email</label>
          <div className={styles.input}>
            <CustomInput
              type="email"
              name="email"
              placeholder="downing@yahoo.com"
              label=""
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
        </div>

        {/* Contact Number */}
        <div className={styles.inputContainer}>
          <label>Contact Number</label>
          <div className={styles.input}>
            <CustomInput
              type="tel"
              name="contactNumber"
              placeholder="+1 (206) 248 1299"
              label=""
              value={formData.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <div className="error">{errors.contactNumber}</div>
            )}
          </div>
        </div>

        {/* Hostel Type */}
        <div className={styles.inputContainer}>
          <label>Hostel Type</label>
          <div className={styles.input}>
            <Select
              defaultValue={formData.type}
              style={{ width: "100%" }}
              onChange={(value) => handleSelectChange("hostelType", value)}
            >
              <Option value="Student">Student</Option>
              <Option value="Staff">Staff</Option>
              <Option value="Visitor">Visitor</Option>
            </Select>
          </div>
        </div>

        {/* Hostel Description */}
        <div className={styles.inputContainer}>
          <label>Hostel Description</label>
          <div className={styles.input}>
            <TextArea
              name="description"
              placeholder="Type here..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default HostelDetails;
