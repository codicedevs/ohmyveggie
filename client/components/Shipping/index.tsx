import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import { ShippingDetails } from "../../interfaces";
import { useAuth, useCartActions, useTypedSelector } from "../../hooks";
import CheckoutSteps from "../CheckoutSteps";
import { useRouter } from "next/router";
import Message from "../Message";
import { validatePhone } from "../../utils";

const arrayOption = [
  {
    key: "option1",
    description: "Que Oh My Veggie elija con que reemplazar"
  },
  {
    key: "option2",
    description: "Recibir llamada de Oh my Veggie"
  },
  {
    key: "option3",
    description: "Cancelen el pedido y devuelvan el dinero"
  },
]

const Shipping = () => {
  const router = useRouter();
  const {
    data: { shippingDetails },
    error,
  } = useTypedSelector((state) => state.cart);
  const { saveShippingAddress } = useCartActions();
  const [shippingAddress, setShippingAddress] =
    useState<ShippingDetails>(shippingDetails);

  const [message, setMessage] = useState<string | null | string[]>(error);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const { address, timeDeliver, zoneDeliver, stockOption, telephone } = shippingAddress;
    if (
      
      address.length < 1 ||
      timeDeliver.length < 1 ||
      zoneDeliver.length < 1 ||
      stockOption.length < 1 ||
      !validatePhone(telephone)
    ) {
      setMessage('Debe completar todos los datos');
      
      return null;
    }

    saveShippingAddress(shippingAddress);
    router.push("/placeorder");
  };

  function handleStock(e: any) {
    let selectedOption = e.target.value

    setShippingAddress(prevShippingAddress => ({
      ...prevShippingAddress,
      stockOption: selectedOption
    }));
  }

  function addressCode(e: any) {
    let selectedCity = e.target.value;

    //-- de acuerdo a la localidad setea el código
    let zipCode = "2000";
    if (selectedCity === 'funes') {
      zipCode = '2132'
    } else if (selectedCity === 'fisherton') {
      zipCode = '2001'
    }

    setShippingAddress(prevShippingAddress => ({
      ...prevShippingAddress,
      postalCode: zipCode,
      zoneDeliver: selectedCity,
      country: "Argentina",
    }));
  }
  useEffect(() => {
  }, [shippingAddress])

  async function handlerTimeZone(e: any) {
    let timeZone = e.target.id
    setShippingAddress({
      ...shippingAddress,
      timeDeliver: timeZone
    });
  }

  return (
    <FormContainer>
      <section className="section-3">
        <div className="div-block-24">
          <h1 className="heading-2">Datos del envío</h1>
          {message && (
            <Message variant="danger">
              {Array.isArray(message) ? message[0] : message}
            </Message>
          )}
          <Form onSubmit={onSubmitHandler}>

            <Form.Group controlId="address" className="py-3">
              <Form.Control
                className="shiptxtfield w-input"
                type="text"
                placeholder="Dirección"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="phone" className="py-3">
              <Form.Control
                className="shiptxtfield w-input"
                type="number"
                placeholder="Telefono"
                value={shippingAddress.telephone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    telephone: Number(e.target.value),
                  })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="py-3">
              <Form.Select
                className="shiptxtfield w-input"
                onChange={(e) => addressCode(e)}
              >
                <option selected disabled hidden>Elija su Ciudad</option>
                <option value="rosario">Rosario</option>
                <option value="funes">Funes</option>
                <option value="fisherton">Fisherton</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="postalCode" className="py-3">
              <Form.Control
                className="shiptxtfield w-input"
                value={shippingAddress.postalCode}
                placeholder="Codigo Postal"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            
            <div >
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
                <div style={{display: 'flex'}}>

                <Form.Check
                  inline
                  type="radio"
                  label="Envío"
                  onClick={(e) => handlerTimeZone(e)}
                  id='Envío'
                  name='timeZone'
                />
                <p style={{fontWeight:400}}>(A coordinar)</p>
                </div>
                <Form.Check
                  inline
                  type="radio"
                  label="Retira por local"
                  onClick={(e) => handlerTimeZone(e)}
                  id='Retira por local'
                  name='timeZone'
                />
                </div>
            </div>
            <Form.Group controlId="timeZone" className="py-3 mt-3">
              <p style={{fontWeight: 500, color: 'red'}}>En caso de no existir stock disponible</p>
              <Form.Select
                className="shiptxtfield w-input"
                placeholder="Franja horaria"
                onChange={(e) => handleStock(e)}
              >
                <option selected disabled hidden>Elegir opción</option>
                {arrayOption.map((option) => <option key={option.key}>{option.description}</option>)}
              </Form.Select>
            </Form.Group>
            <br />
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "15px" }}
            >
              Continuar
            </Button>
            <div style={{ height: 50 }}></div>
          </Form>
        </div>
      </section>
    </FormContainer>
  );
};

export default Shipping;

