import { Customer } from "@/server/router/customer";
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { Button, Form, FormControlProps } from "react-bootstrap";

const CustomerForm: React.FC<{ onSubmit: (customer: Customer) => void }> = ({
  onSubmit,
}) => {
  const [name, changeName] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit({
      name,
    } as Customer);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(event) => changeName(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CustomerForm;
