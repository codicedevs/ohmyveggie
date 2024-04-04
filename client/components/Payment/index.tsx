import FormContainer from '../FormContainer';
import CheckoutSteps from '../CheckoutSteps';
import { Form, Col, Button } from 'react-bootstrap';
import { useState, FormEvent } from 'react';
import { useAuth, useCartActions } from '../../hooks';
import { useRouter } from 'next/router';


const Payment = () => {
  useAuth();

  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const { savePaymentMethod } = useCartActions();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    savePaymentMethod(paymentMethod);

    //router.push('/placeorder');  //******************* lo puse yo  */

  };

  const payType = (e: any) => {
    setPaymentMethod(e.target.value);
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <section className="section-3">

          <div className="div-block-24">
            <h1 className="heading-3">Método de Pago</h1>
            <p>{paymentMethod}</p>
            <Form onSubmit={onSubmitHandler}>

            <form
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="get"
              data-wf-page-id="65f872ed28150826d4601d71"
              data-wf-element-id="fb62ff65-4573-b2d0-9df1-bee19b8724a5"
            >
              <div className="div-block-40">
                <Form.Check
                  className="py-3"
                  type="radio"
                  label="Tarjeta crédito/débito"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  //checked
                  //onChange={e => setPaymentMethod(e.target.value)}
                  onClick={payType}
                ></Form.Check>
                <Form.Check
                  className="py-3"
                  type="radio"
                  label="Efectivo"
                  id="Cash"
                  name="paymentMethod"
                  value="Cash"
                  //checked
                  //onChange={e => setPaymentMethod(e.target.value)}
                  onClick={payType}
                ></Form.Check>
              </div>
            </form>

            
            <Button type="submit" variant="primary">
              Continuar
            </Button>
        </Form>
        </div>
      </section>

        
    </FormContainer>
  );
};

export default Payment;

/* <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="py-3"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>*/
