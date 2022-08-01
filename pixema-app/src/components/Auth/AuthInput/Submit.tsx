interface SubmitPrors {
  className: string;
  type: string;
  value: string;
  onClick: () => void;
}

const Submit = ({ className, type, value, onClick }: SubmitPrors) => {
  return (
    <>
      <input
        className={className}
        type={type}
        value={value}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      />
    </>
  );
};

export default Submit;
