import React, { useState } from "react";
import { Steps, message } from "antd";
import styles from "./AddEditHostel.module.scss";
import HostelDetails from "./HostelDetails/HostelDetails";
import CustomButton from "../../components/CustomButton/CustomButton";
import Documents from "./Documents/Documents";
import ReviewConfirm from "./ReviewConfirm/ReviewConfirm";
import RoomsDetails from "./RoomsDetails/RoomsDetails";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const initialFormData = {
  fullName: "John Doe",
  email: "LcH0O@example.com",
  phoneNumber: "1234567890",
  hostelName: "Downing Hostel",
  contactNumber: "",
  hostelLocation: "",
  hostelType: "Student Accommodation",
  hostelId: "142",
  roomNumber: "DH-04",
  roomType: "Single Room",
  hostelRent: "1000",
  stayDuration: "3-months",
  images: [],
};

const AddEditHostel: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<any>({});

  const steps = [
    {
      title: "Hostel Details",
      content: (
        <HostelDetails
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      ),
    },
    {
      title: "Rooms Details",
      content: (
        <RoomsDetails
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      ),
    },
    {
      title: "Upload Images",
      content: (
        <Documents
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      ),
    },
    {
      title: "Review & Create",
      content: <ReviewConfirm formData={formData} />,
    },
  ];

  const validateForm = () => {
    let tempErrors: any = {};

    if (currentStep === 0) {
      // Specific validation for step 1
      if (!formData.hostelName)
        tempErrors.hostelName = "Hostel name is required";
      if (!formData.hostelLocation)
        tempErrors.hostelLocation = "Hostel location is required";
      if (!formData.email) tempErrors.email = "Email is required";
      if (!formData.contactNumber)
        tempErrors.contactNumber = "Contact number is required";
    } else if (currentStep === 1) {
      // Specific validation for step 2
    } else if (currentStep === 2) {
      // Specific validation for step 3
      if (formData.images.length < 4)
        tempErrors.images = "At least 4 images are required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const next = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    message.success("Application Submitted!");
    navigate("/");
  };

  return (
    <>
      <div className={styles.hostelApplicationContainer}>
        <h2 className={styles.heading}>Add Hostel Details</h2>

        <div className={styles.stepper}>
          <Steps current={currentStep} progressDot>
            {steps.map((item, index) => (
              <Step key={index} title={item.title} />
            ))}
          </Steps>
        </div>

        <div className={styles.stepsContent}>{steps[currentStep].content}</div>

        <div className={styles.stepsAction}>
          {currentStep > 0 && (
            <CustomButton
              title="Previous"
              variant="filled"
              size="medium"
              extraWidth
              onClick={() => prev()}
            />
          )}
          {currentStep === steps.length - 1 && (
            <CustomButton
              title="Create Hostel"
              variant="filled"
              size="medium"
              extraWidth
              onClick={() => handleSubmit()}
            />
          )}
          {currentStep < steps.length - 1 && (
            <CustomButton
              title="Next"
              variant="outline"
              size="medium"
              extraWidth
              onClick={() => next()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddEditHostel;
