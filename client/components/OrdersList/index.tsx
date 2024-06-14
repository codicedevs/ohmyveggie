import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useAdmin, useOrderActions, useTypedSelector, useUserActions } from "../../hooks";
import Loader from "../Loader";
import Message from "../Message";
import { proshopAPI } from "../../lib";
import Paginate from "../Paginate";
import PaginateOrders from "../PaginateOrders";
import { Typeahead } from "react-bootstrap-typeahead";

interface OrderListProps {
  pageId?: query;
}

export interface Filter {
  user: {_id?: number};
  date: string;
  isPaid?: boolean;
  isDelivered?: boolean;

}

const OrdersList: React.FC<OrderListProps> = ({ pageId }) => {

  useAdmin();

  const [selectedClient, setSelectedClient] = useState('')
  const { data, loading, error } = useTypedSelector((state) => state.orders);
  const {data : users} = useTypedSelector((state) => state.users)
  const dataOrder = useTypedSelector((state) => state.order);
  const { fetchOrders } = useOrderActions();
  const {fetchUsers} = useUserActions()
  const user = useTypedSelector((state) => state.user);
  const [filterSelected, setFilterSelected] = useState<Filter>()


  function handleFilterName(value: any) {
    const _id = value[0]._id
    setFilterSelected(prevFilter => ({...prevFilter, user: { _id} }))
  }
  function handleFilterDate(e: any) {
    const date = '$gte: ' + e.target.value
    setFilterSelected(prevFilter => ({...prevFilter, date}))
  }
  function handleFilterPay(e: any) {
    const isPaid = e.target.value 
    setFilterSelected(prevFilter => ({...prevFilter, isPaid}))
  }
  function handleFilterDeliver(e: any) {
    const isDelivered = e.target.value 
    setFilterSelected(prevFilter => ({...prevFilter, isDelivered}))
  }
  
  function filterForm(e: FormEvent){
    e.preventDefault()
    setFilterSelected(prevFilter => ({...prevFilter, name: selectedClient}))
    fetchOrders(pageId?.toString(), filterSelected)
    return {}
  }

  function clearFilter () {
    setFilterSelected(undefined);
    setSelectedClient([]);
  
    fetchOrders(pageId?.toString())
  }

  useEffect(()=>{
    fetchUsers()
  }, [])

  useEffect(() => {
    fetchOrders(pageId?.toString());
  }, [fetchOrders, pageId, user.data]);


  return (
    <>
      <section
        className="d-flex row"
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          justifyContent: "center",
          gap: 30,
          fontWeight: 600,
        }}
      >
        <h1>Ordenes</h1>

        <Form onSubmit={filterForm}>
              <Form.Group
                className="d-flex row gap-3"
                controlId="exampleForm.ControlInput1"
                >
              
                <div className="d-flex column gap-3">

                <div>
                  <Form.Label className="w-25">Cliente</Form.Label>
                  <Typeahead
                    id="client-autocomplete"
                    options={users}
                    labelKey="name"
                    onChange={handleFilterName}
                    selected={selectedClient}
                    placeholder="Nombre cliente"
                    minLength={2}
                    emptyLabel="No hay clientes con ese nombre"
                    />
                </div>
                <div>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control 
                      type="date" 
                      placeholder="Ingrese dia" 
                      onChange={handleFilterDate}
                      />
                </div>
                <div>
                  <Form.Label>Estado pago</Form.Label>
                  <Form.Select 
                      placeholder="Nombre cliente"
                      value={filterSelected?.isPaid === 'true' ? 'true' : filterSelected?.isPaid === 'false' ? 'false' : 'Sin Filtro'}
                      onChange={handleFilterPay}
                      >
                    <option selected> Sin filtro </option>
                    <option key="true" value='true'>Pagado</option>
                    <option key="false" value='false'>Pendiente de pago</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Label>Estado envio</Form.Label>
                  <Form.Select 
                      placeholder="Nombre cliente"
                      value={filterSelected?.isDelivered === 'true' ? 'true' : filterSelected?.isDelivered === 'false' ? 'false' : 'Sin Filtro'}
                      onChange={handleFilterDeliver}
                      >
                    <option selected> Sin filtro </option>
                    <option key="true" value='true'>Enviado</option>
                    <option key="false" value='false'>Sin Enviar</option>
                  </Form.Select>

                </div>
                </div>
                <div className="d-flex justify-content-end">
              <div className="d-flex gap-3">

              <Button type="submit"> Filtrar </Button>
              <Button type="button" onClick={clearFilter}> Borrar Filtros </Button>
              </div>
                </div>
              </Form.Group>
            </Form>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID de la orden</th>
                  <th>Cliente</th>
                  <th>Fecha de orden</th>
                  <th>Tipo de envio</th>
                  <th>TOTAL</th>
                  <th>Pagado</th>
                  <th>Entregado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders?.map((_order) => (
                  <tr key={_order._id}>
                    <td>{_order._id}</td>
                    <td>{_order.user?.name}</td>
                    <td>{_order.createdAt?.substring(0, 10)}</td>
                    <td>{_order.shippingDetails.timeDeliver}</td>
                    <td>${_order.totalPrice}</td>
                    <td>
                      {_order.isPaid ? (
                        _order.paidAt?.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {_order.isDelivered ? (
                        _order.deliveredAt?.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link href={`/orders/${_order._id}`} passHref>
                        <Button
                          variant="light"
                          className="btn-sm"
                          title="Detalle"
                        >
                          Detalle
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        <PaginateOrders pages={data?.pages} page={data?.page} isAdmin={true} />
      </section>
    </>
  );
};

export default OrdersList;
