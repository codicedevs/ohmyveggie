import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { ShippingDetails } from "../../interfaces";
import { useAuth, useCartActions, useTypedSelector } from "../../hooks";
import CheckoutSteps from "../CheckoutSteps";
import { useRouter } from "next/router";
import Message from "../Message";

const Shipping = () => {
  // useAuth();

  const router = useRouter();

  const {
    data: { shippingDetails },
    error,
  } = useTypedSelector((state) => state.cart);
  const { saveShippingAddress } = useCartActions();
  console.log("shipping details", shippingDetails);

  const [shippingAddress, setShippingAddress] =
    useState<ShippingDetails>(shippingDetails);
  const [message, setMessage] = useState<string | null | string[]>(error);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const { address, postalCode } = shippingAddress;

    // if (
    //   address.length < 1 ||
    //   country.length < 1 ||
    //   city.length < 1 ||
    //   postalCode.length < 1
    // ) {
    //   setMessage('All fields are required.');

    //   return null;
    // }

    // setShippingAddress({     // Pais hardcodeado
    //   ...shippingAddress,
    //   country: 'Argentina',
    //   // city: 'Rosario',
    //   // postalCode: '2000',
    //   // address: 'pp'
    // })

    console.log("shipping adress", shippingAddress);

    saveShippingAddress(shippingAddress);

    router.push("/placeorder");
  };

  function addressCode(e: any) {
    let selectedCity = e.target.value;
    console.log("---------->", selectedCity);
    // setShippingAddress({ ...shippingAddress, city: selectedCity });

    //-- de acuerdo a la localidad setea el código
    let zipCode = "2000";
    // if(selectedCity === 'funes') {
    //   zipCode = '2132'
    // } else if (selectedCity === 'fisherton') {
    //     zipCode = '2001'
    // }

    console.log("Shipping Address con ciudad", shippingAddress);

    setShippingAddress({
      ...shippingAddress,
      postalCode: zipCode,
      city: selectedCity,
      country: "Argentina",
    });
  }

  function handlerTimeZone(e: any) {
    setShippingAddress({ ...shippingAddress });
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <section className="section-3">
        <div className="div-block-24">
          <h1 className="heading-2">Datos del envío</h1>
          {message && (
            <Message variant="danger">
              {Array.isArray(message) ? message[0] : message}
            </Message>
          )}
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="address">
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

            <Form.Group controlId="city" className="py-3">
              <Form.Select
                className="shiptxtfield w-input"
                onChange={(e) => addressCode(e)}
              >
                <option selected>Elija su Ciudad</option>
                <option value="rosario">Rosario</option>
                <option value="funes">Funes</option>
                <option value="fisherton">Fisherton</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="postalCode">
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

            <Form.Group controlId="timeZone" className="py-3">
              <Form.Select
                className="shiptxtfield w-input"
                placeholder="Franja horaria"
                onChange={(e) => handlerTimeZone(e)}
              >
                <option selected>En caso de no existir stock disponible</option>
                <option value="horario1">Que Oh My Veggie elija con que reemplazar</option>
                <option value="horario2">Llamada telefonica</option>
                <option value="horario3">Cancelen el pedido y devuelvan el dinero</option>
              </Form.Select>
            </Form.Group>

            <div >
            <div style={{display:'flex', justifyContent: 'center'}}>

            <h4 style={{justifyContent: 'center'}}>Horario de entrega</h4>
            </div>
            <div className="btn-group j-c d-flex" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-secondary">
                De 9 a 12
              </button>
              <button type="button" className="btn btn-secondary">
                De 12 a 15
              </button>
              <button type="button" className="btn btn-secondary">
                De 15 a 18
              </button>
            </div>
              </div>  
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

/*<FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      {message && (
        <Message variant="danger">
          {Array.isArray(message) ? message[0] : message}
        </Message>
      )}

      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={shippingAddress.address}
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="py-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={shippingAddress.city}
            onChange={e =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={shippingAddress.postalCode}
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                postalCode: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="py-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={shippingAddress.country}
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer> */
