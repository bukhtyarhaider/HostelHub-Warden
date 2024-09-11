import React, { useState } from "react";
import styles from "./Documents.module.scss";
import { uploadIcon } from "../../../assets";

interface DocumentsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
}

const documentsData = [
  {
    label: "Upload All Images",
    required: true,
    name: "images",
  },
];

const UploadSection: React.FC<{
  data: any;
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
}> = ({ data, formData, setFormData, errors, setErrors }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages = Array.from(files);
      const imageUrls = newImages.map((file) => URL.createObjectURL(file));

      // Append new images to the existing images list
      setFormData({
        ...formData,
        [data.name]: [...(formData[data.name] || []), ...newImages],
      });
      setImagePreviews([...imagePreviews, ...imageUrls]);

      setErrors({ ...errors, [data.name]: "" });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files);
      const imageUrls = newImages.map((file) => URL.createObjectURL(file));

      setFormData({
        ...formData,
        [data.name]: [...(formData[data.name] || []), ...newImages],
      });
      setImagePreviews([...imagePreviews, ...imageUrls]);

      setErrors({ ...errors, [data.name]: "" });
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = formData[data.name].filter(
      (_: any, i: number) => i !== index
    );

    setImagePreviews(updatedPreviews);
    setFormData({ ...formData, [data.name]: updatedFiles });
  };

  return (
    <div className={`${styles.uploadSection}`}>
      <label className={styles.label}>
        {data.label} {data.required && <span>*</span>}
      </label>
      <div
        className={`${styles.uploadBox} ${
          imagePreviews.length ? styles.fileSelected : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={data.name}
          name={data.name}
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <label htmlFor={data.name}>
          <>
            <img src={uploadIcon} alt="upload" />
            <div className={styles.uploadPrompt}>
              Drag / Drop your image here or <span>choose image</span>
            </div>
            <div className={styles.uploadNote}>
              Only images below 25 MBs are allowed *
            </div>
          </>
        </label>
        {errors[data.name] && (
          <div className={styles.error}>{errors[data.name]}</div>
        )}
      </div>

      {imagePreviews.length > 0 && (
        <div className={styles.imageListContainer}>
          {imagePreviews.map((preview, index) => (
            <div className={styles.imageListItem} key={index}>
              <img
                src={preview}
                alt={`uploaded-preview-${index}`}
                className={styles.imagePreview}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className={styles.removeImageButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Documents: React.FC<DocumentsProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  return (
    <div className={styles.documentsContainer}>
      <h2 className={styles.heading}>Add Hostel Details</h2>

      <form className={styles.form}>
        {documentsData.map((data) => (
          <UploadSection
            data={data}
            key={data.label}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        ))}
      </form>
    </div>
  );
};

export default Documents;
