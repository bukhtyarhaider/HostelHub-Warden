import React from "react";
import styles from "./Documents.module.scss";
import { uploadIcon } from "../../../../assets";

interface DocumentsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
}

const documentsData = [
  {
    label: "CNIC Front Side",
    required: true,
    name: "cnicFront",
  },
  {
    label: "CNIC Back Side",
    required: true,
    name: "cnicBack",
  },
];

const UploadSection: React.FC<{
  data: any;
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
}> = ({ data, formData, setFormData, errors, setErrors }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div
      className={`${styles.uploadSection} ${
        formData[data.name] ? styles.fileSelected : ""
      }`}
    >
      <label className={styles.label}>
        {data.label} {data.required && <span>*</span>}
      </label>
      <div className={styles.uploadBox}>
        <input
          type="file"
          id={data.name}
          name={data.name}
          accept=".pdf"
          onChange={handleFileChange}
        />
        <label htmlFor={data.name}>
          {formData[data.name] ? (
            <div className={styles.fileName}>{formData[data.name].name}</div>
          ) : (
            <>
              <img src={uploadIcon} alt="upload" />
              <div className={styles.uploadPrompt}>
                Drag / Drop your image here or <span>choose file</span>
              </div>
              <div className={styles.uploadNote}>
                Only pdfs below 25 mbs are allowed *
              </div>
            </>
          )}
        </label>
        {errors[data.name] && (
          <div className={styles.error}>{errors[data.name]}</div>
        )}
      </div>
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
