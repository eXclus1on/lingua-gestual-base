const Input = (props) => {
  const { id, type = "text", children, className, ...rest } = props;

  return (
    <div className={className}>
      <label htmlFor={id}>{children}</label>
      <input type={type} id={id} name={id} {...rest} />
    </div>
  );
};

const FORM_INPUTS = [
  {
    id: "username",
    label: "Nome completo:",
    required: true,
  },
  {
    id: "idFiscal",
    label: "Número de Identificação Fiscal:",
    required: true,
  },
  {
    id: "password",
    type: "password",
    label: "Password:",
    required: true,
  },
  {
    id: "confirm-password",
    type: "password",
    label: "Confirmar Password:",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    required: true,
  },
];

export default Input;