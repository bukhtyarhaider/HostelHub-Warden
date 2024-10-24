import React, { useState } from "react";
import { Select } from "antd";
import styles from "./ProfileInfo.module.scss";
import { avatar, cameraIcon } from "../../../assets";
import CustomInput from "../../../components/CustomInput/CustomInput";
import {
  updateUserProfile,
  uploadProfileImage,
} from "../../../services/firebase";
import { Loader } from "../../../components/Loader/Loader";

const { Option } = Select;

const ProfileInfo: React.FC<any> = ({ userData, setUserData }) => {
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Remove error for the specific field
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: "",
    }));

    setUserData({ ...userData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    // Remove error for the specific field
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: "",
    }));

    setUserData({ ...userData, [name]: value });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!userData.displayName) {
      newErrors.displayName = "Full Name is required";
    }

    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!userData.phoneNumber) {
      newErrors.phoneNumber = "Contact Number is required";
    } else if (!/^\+?\d{10,13}$/.test(userData.phoneNumber)) {
      newErrors.phoneNumber = "Contact Number is invalid";
    }

    if (!userData.currentAddress) {
      newErrors.currentAddress = "Current Address is required";
    }

    if (!userData.currentState) {
      newErrors.currentState = "Current State is required";
    }

    return newErrors;
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmitting(true);
      try {
        let profileImageUrl = "";

        if (profileImage) {
          profileImageUrl = await uploadProfileImage(
            profileImage,
            userData.email
          );
        } else {
          profileImageUrl = userData.photoURL;
        }

        await updateUserProfile(
          userData.fullName,
          userData.phoneNumber,
          userData.currentAddress,
          userData.currentState,
          profileImageUrl
        );
        alert("Profile updated successfully!");
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Failed to update profile: ${error.message}`);
        } else {
          alert("Failed to update profile due to an unknown error.");
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.heading}>User Profile</h2>
      <div className={styles.profilePictureContainer}>
        {!!profileImage || userData.photoURL ? (
          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : userData.photoURL
            }
            alt="Profile"
            className={styles.profilePicture}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {!!userData?.fullName ? userData?.fullName?.charAt(0) : "Warden"}
          </div>
        )}
        <div className={styles.cameraIcon}>
          <label htmlFor="profileImage">
            <img
              src={cameraIcon}
              alt="Camera Icon"
              style={{ cursor: "pointer" }}
            />
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onImageChange}
          />
        </div>
      </div>

      <h3 className={styles.subHeading}>User Information</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Full Name</label>
          <div className={styles.input}>
            <CustomInput
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={userData.displayName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <div className="error">{errors.displayName}</div>
            )}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Email</label>
          <div className={styles.input}>
            <CustomInput
              type="email"
              name="email"
              disabled={true}
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Contact Number</label>
          <div className={styles.input}>
            <CustomInput
              type="text"
              name="phoneNumber"
              placeholder="Contact Number"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Current Address</label>
          <div className={styles.input}>
            <CustomInput
              type="text"
              name="currentAddress"
              placeholder="Current Address"
              value={userData.currentAddress}
              onChange={handleChange}
            />
            {errors.currentAddress && (
              <div className="error">{errors.currentAddress}</div>
            )}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Current State</label>
          <div className={styles.input}>
            <Select
              value={userData.currentState}
              style={{ width: "100%" }}
              onChange={(value) => handleSelectChange("currentState", value)}
            >
              <Option value="Punjab">Punjab</Option>
              <Option value="Sindh">Sindh</Option>
              <Option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</Option>
              <Option value="Balochistan">Balochistan</Option>
            </Select>
            {errors.currentState && (
              <div className="error">{errors.currentState}</div>
            )}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            disabled={submitting}
            className={
              submitting ? styles.disabledSaveButton : styles.saveButton
            }
          >
            Save Changes
          </button>
        </div>
      </form>
      {<Loader hide={!submitting} />}
    </div>
  );
};

export default ProfileInfo;
