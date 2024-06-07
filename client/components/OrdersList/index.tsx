import Link from 'next/link';
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAdmin, useOrderActions, useTypedSelector } from '../../hooks';
import Loader from '../Loader';
import Message from '../Message';
import { proshopAPI } from '../../lib';
import Paginate from '../Paginate';
import PaginateOrders from '../PaginateOrders';
interface OrderListProps {
  pageId? : query
}
const OrdersList: React.FC<OrderListProps> = ({pageId}) => {
  useAdmin();

  const { data, loading, error } = useTypedSelector(state => state.orders);
  const dataOrder = useTypedSelector(state => state.order);
  const { fetchOrders } = useOrderActions();
  const user = useTypedSelector(state => state.user);
  
  useEffect(() => {
    
    fetchOrders(pageId?.toString());
    }, [fetchOrders, pageId, user.data]);
    
    console.log(data)
  

  return (
    <>
        <section className='d-flex row' style={{paddingLeft: 40, paddingRight: 40, justifyContent: 'center', gap: 30, fontWeight: 600}}>


      <h1>Ordenes</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID de la orden</th>
              <th>Cliente</th>
              <th>Fecha de orden</th>
              <th>TOTAL</th>
              <th>Pagado</th>
              <th>Entregado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map(_order => (
              <tr key={_order._id}>
                <td>{_order._id}</td>
                <td>{_order.user?.name }</td>
                <td>{_order.createdAt?.substring(0, 10)}</td>
                <td>${_order.totalPrice}</td>
                <td>
                  {_order.isPaid ? (
                    _order.paidAt?.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {_order.isDelivered ? (
                    _order.deliveredAt?.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link href={`/orders/${_order._id}`} passHref>
                    <Button variant="light" className="btn-sm" title='Detalle'>
                      Detalle
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    <PaginateOrders pages={data?.pages} page={data?.page} isAdmin={true} />
      </section>
    </>
  );
};

export default OrdersList;
