import { useEffect, useState } from "react";
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
    formState: { errors: clientErrors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const [errors, setErrors] = useState(clientErrors);

  const onSubmitFull: SubmitHandler<Customer> = async (customer) => {
    setLoading(true);
    try {
      await onSubmit(customer);
    } catch (e: any) {
      // access error data set up in createRouter() in src/server/router/context.ts
      const {
        shape: { data: propName, message },
      } = e;
      setErrors({
        ...errors,
        [propName]: {
          message,
        },
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setErrors(clientErrors);
  }, [clientErrors]);

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
        disabled={!!Object.keys(clientErrors).length}
      >
        Submit
      </LoadingButton>
    </Form>
  );
};

export default CustomerForm;
