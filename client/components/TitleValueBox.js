import { Form, Container, Row, Col } from 'react-bootstrap'


export default ({ title, value, symbol }) => (
    <div>
        <Container className="border border-primary" style={{ display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Form.Group as={Row} controlId="lpTokenBalance">
              <Form.Label column  style={{minWidth:200}} className="text-start">{title}</Form.Label>
              <Col />
              <Form.Label column  style={{minWidth:200}} className="text-end">
                {value} {symbol}
              </Form.Label>
            </Form.Group>
        </Container>
  
      <style jsx>{`
   
      `}</style>
    </div>
  )


