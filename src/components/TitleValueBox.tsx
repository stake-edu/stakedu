import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

interface TitleValueBoxProps {
  title: string;
  value: string | number;
  symbol: string;
}

const TitleValueBox: React.FC<TitleValueBoxProps> = ({
  title,
  value,
  symbol,
}) => (
  <div>
    <Container className="border border-primary">
      <Form.Group as={Row} controlId="lpTokenBalance">
        <Form.Label column style={{ minWidth: 200 }} className="text-start">
          {title}
        </Form.Label>
        <Col />
        <Form.Label column style={{ minWidth: 200 }} className="text-end">
          {value} {symbol}
        </Form.Label>
      </Form.Group>
    </Container>
  </div>
);

export default TitleValueBox;
