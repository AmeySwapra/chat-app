const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
  const genders = ["male", "female"];

  return (
    <div className="flex gap-4">
      {genders.map((gender) => (
        <div key={gender} className="form-control">
          <label
            className={`label gap-2 cursor-pointer ${
              selectedGender === gender ? "selected" : ""
            }`}
          >
            <span className="label-text capitalize">{gender}</span>
            <input
              type="checkbox"
              className="checkbox border-slate-900"
              checked={selectedGender === gender}
              onChange={() => onCheckboxChange(gender)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default GenderCheckBox;
