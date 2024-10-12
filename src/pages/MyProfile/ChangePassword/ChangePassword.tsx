import React, { useState } from "react";
import styles from "./ChangePassword.module.scss";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { updateProfilePassword } from "../../../services/firebase";
import { Loader } from "../../../components/Loader/Loader";

const ChangePassword = () => {
  const [errors, setErrors] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setIsDisabled(true);
        await updateProfilePassword(formData.newPassword).catch();
        setIsDisabled(false);
      } catch (error: any) {
        setIsDisabled(false);
        setErrors({ firebaseError: error.message, ...errors });
        throw new Error(error.message);
      }
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.heading}>User Profile</h2>

      <h3 className={styles.subHeading}>Change Password</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Current Password</label>
          <div className={styles.input}>
            <CustomInput
              type="text"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            {errors.currentPassword && (
              <div className="error">{errors.currentPassword}</div>
            )}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>New Password</label>
          <div className={styles.input}>
            <CustomInput
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && (
              <div className="error">{errors.newPassword}</div>
            )}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Confirm New Password</label>
          <div className={styles.input}>
            <CustomInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword ||
              (errors.firebaseError && (
                <div className="error">
                  {errors.firebaseError
                    ? errors.firebaseError
                    : errors.confirmPassword}
                </div>
              ))}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            disabled={isDisabled}
            type="submit"
            className={styles.saveButton}
          >
            Save Changes
          </button>
        </div>
      </form>
      {<Loader hide={!isDisabled} />}
    </div>
  );
};

export default ChangePassword;
