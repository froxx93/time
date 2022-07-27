import { Customer } from "@/server/router/customer";
import { FormEventHandler, useState } from "react";
import { Form } from "react-bootstrap";
import LoadingButton from "./LoadingButton";

const CustomerForm: React.FC<{
  onSubmit: (customer: Customer) => Promise<void>;
}> = ({ onSubmit }) => {
  const [name, changeName] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setButtonLoading(true);
    await onSubmit({
      name,
    } as Customer);
    setButtonLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(event) => changeName(event.target.value)}
          disabled={isButtonLoading}
        />
      </Form.Group>

      <LoadingButton isLoading={isButtonLoading}>Submit</LoadingButton>
    </Form>
  );
};

export default CustomerForm;
