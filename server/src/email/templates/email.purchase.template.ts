import { OrderDocument } from "src/orders/schemas/order.schema";
import { User } from "src/users/schemas/user.schema";

export const purchaseSuccessTemplate = (
  user: User,
  orderId: string,
  date: string
) => `
    <!DOCTYPE html>
    <html>    
    <head>
      <title>Gracias por su compra en <b>Oh my veggie</b></title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 1em;
          line-height: 1.5;
          color: #333;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #444;
          margin-top: 0;
          margin-bottom: 10px;
        }

        p {
          margin-top: 0;
          margin-bottom: 1rem;
          text-align: justify;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .icon-store {
          width: 40%;
          padding: 5%;

        }

        @media (max-width: 600px) {
          .icon-store {
            width: 80%;
            padding: 5%;

          }
        }

        .icon-container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 50%;
          cursor: pointer;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h6>Estimado/a <b>${user.name}</b>,</h6>
        <p>Nos complace informarle que hemos recibido su compra a traves de nuestra pagina!
        <p>Su orden es la numero: ${orderId} </p>
        <p>La misma fue realizada el dia: ${date} </p>
        <p>Usted puede consultar su historial de compras directamente desde su perfil de usuario en <b>Ohmyveggie</b></>
        <br>
        <p>Saludos cordiales</p> 
        <img src="logo-p-500.png" style="max-width: 200px; display: block; margin: 20px auto;">
      </div>
      <footer style="margin-top: 20px; font-size: 0.8em; color: #666;">
      <p>Oh my veggie - Todos los derechos reservados.</p>
      <p><a href="mailto:contacto@ohmyveggie.com">contacto@ohmyveggie.com</a></p>
      </footer>
      </body>
    </html>
    `;
