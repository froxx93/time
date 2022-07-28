import { useState } from "react";
import { Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from "./LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import Customer, { customerSchema } from "@/domains/customer";

const CustomerForm: React.FC<{
  onSubmit: SubmitHandler<Customer>;
}> = ({ onSubmit }) => {
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmitFull: SubmitHandler<Customer> = async (customer) => {
    setLoading(true);
    await onSubmit(customer);
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitFull)}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          disabled={isLoading}
          {...register("name")}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name && (
            <div key={`field-error-name`} className="fieldError">
              {errors.name.message}
            </div>
          )}
        </Form.Control.Feedback>
      </Form.Group>

      <LoadingButton
        isLoading={isLoading}
        disabled={!!Object.keys(errors).length}
      >
        Submit
      </LoadingButton>
    </Form>
  );
};

export default CustomerForm;
