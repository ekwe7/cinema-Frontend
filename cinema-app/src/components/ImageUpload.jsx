import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function ImageUpload({ value, onChange, height = 160, label = "Upload Image" }) {
  const inputRef = useRef();

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <div className="img-upload-wrap" style={{ height }}>
        {value && <img src={value} alt="preview" className="img-upload-preview" />}
        {!value && (
          <div className="img-upload-placeholder">
            <FontAwesomeIcon icon={faCloudArrowUp} style={{ fontSize: 28, color: "var(--text-muted)", marginBottom: 4 }} />
            <span>Click to upload</span>
          </div>
        )}
        {value && (
          <div className="img-upload-overlay">
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "white", fontSize: 22 }} />
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="img-upload-input"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}
