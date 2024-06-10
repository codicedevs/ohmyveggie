import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Loader from '../Loader';
import { FormEvent, useEffect, useState } from 'react';
import Message from '../Message';
import {
  useAuth,
  useOrderActions,
  useTypedSelector,
  useUserActions,
} from '../../hooks';
import { UserCredentials } from '../../interfaces';
import Link from 'next/link';

const Profile = () => {
  
  useAuth();
  const initialCredentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  
  const userData = useTypedSelector(state => state.user.data);
  const { error, loading, success } = useTypedSelector(
    state => state.userUpdate
  );

  const userOrders = useTypedSelector(state => state.userOrders);
  
  const { updateUser } = useUserActions();
  const { fetchUserOrders } = useOrderActions();
  
  console.log(userOrders)
  
  const [credentials, setCredentials] =
  useState<UserCredentials>(initialCredentials);
  const [message, setMessage] = useState<string | null | string[]>(error);
  
  useEffect(() => {
    setMessage(error);
  }, [error]);
  
  useEffect(() => {
    if (userData) {
      fetchUserOrders();
      
      setCredentials(credentials => ({
        ...credentials,
        name: userData.name,
        email: userData.email,
      }));
    }
  }, [userData, fetchUserOrders]);
  
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { name, email, password, confirmPassword } = credentials;
    
    if (name.length < 1 && email.length < 1 && password.length < 1) {
      setMessage('Change at least one property.');
      
      return null;
    }
    
    if (password.length > 0 && password !== confirmPassword) {
      setMessage('Passwords do not match');
      
      return null;
    }
    
    setMessage(null);
    
    updateUser({
      name: name.length > 0 ? name : undefined,
      email: email.length > 0 ? email : undefined,
      password: password.length > 0 ? password : undefined,
    });
  };
  
  return (
    <section  style={{padding:"10px", justifyContent: 'center', gap: 30 }}>

    
    <Row style={{flexWrap: 'wrap-reverse'}}>
      <Col md={3}>
        <h4>Perfil de usuario</h4>

        {message && (
          <Message variant="danger">
            {Array.isArray(message) ? message[0] : message}
          </Message>
        )}
        {success && !error && (
          <Message variant="success">Perfil actualizado!</Message>
        )}
        {loading && <Loader />}

        <Form onSubmit={onSubmitHandler} >
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={credentials.name}
              onChange={e =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              style={{fontSize: 12}}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={e =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              style={{fontSize: 12}}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={e =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              style={{fontSize: 12}}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="py-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={credentials.confirmPassword}
              onChange={e =>
                setCredentials({
                  ...credentials,
                  confirmPassword: e.target.value,
                })
              }
              style={{fontSize: 12}}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Actualizar datos
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h3>Mis ordenes</h3>

        {userOrders.loading ? (
          <Loader />
        ) : userOrders.error ? (
          <Message variant="danger">{userOrders.error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm" style={{fontSize: 16}}>
            <thead>
              <tr>
                <th>ID de Orden</th>
                <th>Fecha</th>
                <th>TOTAL</th>
                <th>Pagado</th>
                <th>Entregado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(userOrders.data) && userOrders.data.length > 0 ? (
              userOrders?.data?.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link href={`/orders/${order._id}`} passHref>
                      <Button className="btn-sm" variant="light">
                        Detalle
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
                ) : (
                  <tr>
                  <td colSpan={6}>No hay órdenes disponibles</td>
                </tr>
                )
            }
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
    </section>
  );
};

export default Profile;
