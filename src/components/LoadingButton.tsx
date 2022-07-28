import { Button, Spinner } from "react-bootstrap";

const LoadingButton: React.FC<{
  children: React.ReactNode;
  isLoading: boolean;
  disabled: boolean;
}> = ({ children, isLoading, disabled = false }) => {
  return (
    <Button variant="primary" type="submit" disabled={disabled || isLoading}>
      {children}{" "}
      {isLoading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </Button>
  );
};

export default LoadingButton;
