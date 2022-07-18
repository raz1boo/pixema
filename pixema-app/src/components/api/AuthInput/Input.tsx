interface InputPrors {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

const Input = ({ label, type, name, placeholder }: InputPrors) => {
  return (
    <>
      <label>{label}</label>
      <input type={type} name={name} placeholder={placeholder} />
    </>
  );
};

export default Input;
