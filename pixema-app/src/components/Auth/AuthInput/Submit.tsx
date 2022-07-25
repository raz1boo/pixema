interface SubmitPrors {
  className: string;
  type: string;
  value: string;
}

const Submit = ({ className, type, value }: SubmitPrors) => {
  return (
    <>
      <input className={className} type={type} value={value} />
    </>
  );
};

export default Submit;
