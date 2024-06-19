import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useAdmin, useOrderActions, useTypedSelector, useUserActions } from "../../hooks";
import Loader from "../Loader";
import Message from "../Message";
import Paginate from "../Paginate";
import PaginateOrders from "../PaginateOrders";
import { Typeahead } from "react-bootstrap-typeahead";
import dayjs from "dayjs";

interface OrderListProps {
  pageId?: query;
}

export interface Filter {
  user: {_id?: number};
  createdAt?: {
    $gte?:  string;
    $lte?:  string;
  };
  isPaid?: boolean;
  isDelivered?: boolean;

}

const OrdersList: React.FC<OrderListProps> = ({ pageId }) => {

  useAdmin();

  const [selectedClient, setSelectedClient] = useState<any[]>([])
  const { data, loading, error } = useTypedSelector((state) => state.orders);
  const {data : users} = useTypedSelector((state) => state.users)
  const dataOrder = useTypedSelector((state) => state.order);
  const { fetchOrders } = useOrderActions();
  const {fetchUsers} = useUserActions()
  const user = useTypedSelector((state) => state.user);
  const [filterSelected, setFilterSelected] = useState<Filter>()


  function handleFilterName(value: any) {
    
    if (value.length > 0) {
      const { _id } = value[0];
      setSelectedClient(value);
      setFilterSelected((prevFilter) => ({
        ...prevFilter,
        user: { _id }
      }));
    } else {
      setSelectedClient([]);
      setFilterSelected(prevFilter => ({
        ...prevFilter,
        user: undefined
      }));
    }    
  }
  
  function handleFilterDate(e: any) {
    
    const date = e.target.value
    if(e.target.name === 'desde'){
      setFilterSelected(prevFilter => ({...prevFilter, createdAt: {...prevFilter?.createdAt, $gte: date}}))
    } else if(e.target.name=== 'hasta'){
      setFilterSelected(prevFilter => ({...prevFilter, createdAt: {...prevFilter?.createdAt, $lte: date}}))

    }
    
    console.log('fecha', date, e.target.name)

  }
  function handleFilterPay(e: any) {
    const isPaid = e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined;
    if(isPaid!==null)  setFilterSelected(prevFilter => ({...prevFilter, isPaid}))
  }
  function handleFilterDeliver(e: any) {
    const isDelivered = e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined;

    setFilterSelected(prevFilter => ({...prevFilter, isDelivered}))
  }
  
  function filterForm(e: FormEvent){
    e.preventDefault()
    // setFilterSelected(prevFilter => ({...prevFilter, user: {_id: selectedClient}}))
    fetchOrders(pageId?.toString(), filterSelected)
    return {}
  }

  function clearFilter () {
    setFilterSelected('')
    // setFilterSelected(prev => (
    //   {
    //   user: undefined,
    //   createdAt: {$gte: '', $lte: ''},
    //   isPaid: undefined,
    //   isDelivered: undefined      
    //   })
    //   );
    setSelectedClient([]);
    fetchOrders(pageId?.toString())
  }

  useEffect(()=>{
    fetchUsers()
  }, [])

  useEffect(() => {
    fetchOrders(pageId?.toString());
  }, [fetchOrders, pageId, user.data]);

console.log(filterSelected)
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
                    placeholder="Nombre cliente"
                    selected={selectedClient}
                    minLength={2}
                    emptyLabel="No hay clientes con ese nombre"
                    
                    />
                </div>
               
                <div>
                  
                  <Form.Label>Fecha Desde</Form.Label>
                  <Form.Control 
                      type="date" 
                      placeholder="Ingrese dia" 
                      onChange={handleFilterDate}
                      name='desde'
                      value={filterSelected?.createdAt?.$gte || '' }
                      />
                </div>
                <div>
                  <Form.Label>Fecha Hasta</Form.Label>
                  <Form.Control 
                      type="date" 
                      placeholder="Ingrese dia" 
                      onChange={handleFilterDate}
                      name='hasta'
                      value={filterSelected?.createdAt?.$lte || ''}
                      />
                </div>
                <div>
                  <Form.Label>Estado pago</Form.Label>
                  <Form.Select 
                      placeholder="Estado Pago"
                      value={filterSelected?.isPaid === true ? 'true' : filterSelected?.isPaid === false ? 'false' : ''}
                      onChange={handleFilterPay}
                      >
                    <option value=''> Sin filtro </option>
                    <option key="true" value='true'>Pagado</option>
                    <option key="false" value='false'>Pendiente de pago</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Label>Estado envio</Form.Label>
                  <Form.Select 
                      placeholder="Estado envio"
                      value={filterSelected?.isDelivered === true ? 'true' : filterSelected?.isDelivered === false ? 'false' : ''}
                      onChange={handleFilterDeliver}
                      >
                    <option value=''> Sin filtro </option>
                    <option key="true" value='true'>Enviado</option>
                    <option key="false" value='false'>Sin Enviar</option>
                  </Form.Select>

                </div>
                </div>
                <div className="d-flex justify-content-end">
              <div className="d-flex gap-3">

              <Button type="submit" style={{backgroundColor:'#a2cca6'}}> Filtrar </Button>
              <Button type="button" style={{backgroundColor:'gray'}}onClick={clearFilter}> Limpiar Filtros </Button>
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
                        <i className="fa fa-check" style={{color: 'green'}}></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {_order.isDelivered ? (
                        <i className="fa fa-check" style={{color: 'green'}}></i>
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
