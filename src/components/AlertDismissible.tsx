import React, { ReactNode, useState } from "react";
import { Alert, AlertProps, Button } from "react-bootstrap";

interface AlertDismissibleProps extends Pick<AlertProps, "variant"> {
  buttonTitle?: string;
  buttonAction?: () => void;
  title: string;
  children: ReactNode;
}

export const AlertDismissible: React.FC<AlertDismissibleProps> = ({
  buttonTitle = "Close",
  buttonAction,
  variant,
  title,
  children,
}) => {
  const [show, setShow] = useState(true);
  const handleButtonAction = buttonAction || (() => setShow(false));

  return (
    <>
      <Alert show={show} variant={variant}>
        <Alert.Heading>{title}</Alert.Heading>
        <p>{children}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleButtonAction} variant={`outline-${variant}`}>
            {buttonTitle}
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default AlertDismissible;
