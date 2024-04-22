import { User } from "src/users/schemas/user.schema";

export const purchaseSuccessTemplate = (user: User) => `
    <!DOCTYPE html>
    <html>
    
    <head>
      <title>Gracias por su compra en ${"Oh my vegie"}</title>
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
        <p>Estimade ${user.name} ,</p>
        <p>Nos complace informarle que su compra ha sido exitosa a traves de nuestra pagina!: ohmyveggie.com.</p>
        <p>Usted puede consultar su historial de compras directamente desde su perfil de usuario en Ohmyveggie</>
        <ul>
          <li>Saludos cordiales.</li> 
      </div>
    </body>

    </html>
    `