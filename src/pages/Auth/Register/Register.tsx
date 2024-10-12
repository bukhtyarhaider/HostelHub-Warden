import React, { useState } from "react";
import styles from "./Register.module.scss";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import Documents from "./Documents/Documents";

import { successIcon } from "../../../assets";
import { signUp } from "../../../services/firebase";
import { FormData } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";

const initialState: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  hostelName: "",
  hostelAddress: "",
  password: "",
  confirmPassword: "",
  cnicFront: null,
  cnicBack: null,
};

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value as any });
    setErrors({ ...errors, [name]: "" });
  };

  const validateStep1 = () => {
    let valid = true;
    let newErrors: Partial<FormData> = {};

    [
      "fullName",
      "email",
      "phoneNumber",
      "hostelName",
      "hostelAddress",
      "password",
      "confirmPassword",
    ].forEach((field) => {
      if (!formData[field as keyof FormData]) {
        newErrors[field as keyof FormData] = "This field is required";
        valid = false;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    let newErrors: Partial<FormData> = {};

    ["cnicFront", "cnicBack"].forEach((field) => {
      if (!formData[field as keyof FormData]) {
        newErrors[field as keyof FormData] = "This file is required";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      try {
        setIsLoading(true);
        const user = await signUp(formData);
        if (user) setStep(3);
      } catch (error: any) {
        console.error(error);
        alert("Failed to register: " + error.message);
      }
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <div className={styles.registerContainer}>
      {step === 1 && (
        <div className={styles.registerBox}>
          <h2 className={styles.heading}>Glad To See You Here!</h2>
          <p className={styles.subHeading}>
            Please fill in the following details to make an account and start
            using the app.
          </p>
          <form>
            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <label>Full Name</label>
                <div className={styles.input}>
                  <CustomInput
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <div className="error">{errors.fullName}</div>
                  )}
                </div>
              </div>
              <div className={styles.inputContainer}>
                <label>Email</label>
                <div className={styles.input}>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <label>Phone Number</label>
                <div className={styles.input}>
                  <CustomInput
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <div className="error">{errors.phoneNumber}</div>
                  )}
                </div>
              </div>
              <div className={styles.inputContainer}>
                <label>Hostel Name</label>
                <div className={styles.input}>
                  <CustomInput
                    type="text"
                    name="hostelName"
                    placeholder="Hostel Name"
                    value={formData.hostelName}
                    onChange={handleChange}
                  />
                  {errors.hostelName && (
                    <div className="error">{errors.hostelName}</div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label>Hostel Address</label>
              <div className={styles.input}>
                <CustomInput
                  type="text"
                  name="hostelAddress"
                  placeholder="Hostel Address"
                  value={formData.hostelAddress}
                  onChange={handleChange}
                />
                {errors.hostelAddress && (
                  <div className="error">{errors.hostelAddress}</div>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <label>Password</label>
                <div className={styles.input}>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="error">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className={styles.inputContainer}>
                <label>Confirm Password</label>
                <div className={styles.input}>
                  <CustomInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="error">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <button
                type="button"
                className={styles.nextButton}
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </form>

          <div className={styles.registerWrapper}>
            <p className={styles.signInText}>
              Already Have An Account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={`${styles.registerBox} ${styles.registerBox2}`}>
          <h2 className={styles.heading}>Just One Step Away!</h2>
          <p className={styles.subHeading}>
            Please upload the documents, they’ll be used for your verification.
          </p>
          <Documents
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
          <div className={styles.buttonWrapper}>
            <button
              disabled={isLoading}
              type="button"
              className={styles.submitButton}
              onClick={handleNextStep}
            >
              Sign Up
            </button>
          </div>
          <div className={styles.registerWrapper}>
            <p className={styles.signInText}>
              Already Have An Account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.doneBox}>
          <h2 className={styles.heading}>You're Done!</h2>
          <p className={styles.subHeading}>
            Your application has been sent to our admins for review.
          </p>
          <div className={styles.successIcon}>
            <img src={successIcon} />
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.homeButton} onClick={handleSubmit}>
              Go to Sign In
            </button>
          </div>
        </div>
      )}

      {<Loader hide={!isLoading} />}
    </div>
  );
};

export default Register;
