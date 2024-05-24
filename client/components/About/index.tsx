const About = () => {
  return (
    <section className="aboutsection">
      <h1 className="aboutheading">Nosotros</h1>
      <div className="aboutcolumns w-row" style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <div className="aboutcolumn1 w-col w-col-6 w-col-small-small-stack" style={{width: 350}}>
          <img
            src="/images/Imagen Nosotros.jpg"
            loading="lazy"
            sizes="(max-width: 479px) 94vw, (max-width: 767px) 95vw, (max-width: 991px) 47vw, (max-width: 4666px) 42vw, 1960px"
            alt="nosotros"
          />
        </div>
        <div className="aboutcolumn2 w-col w-col-6 w-col-small-small-stack">
          <blockquote className="block-quote">
            Tenemos como misión acompañarte en un estilo de vida saludable
            facilitándote productos naturales y de excelente calidad. Te
            invitamos a vivir la experiencia Oh My Veggie de manera
            personalizada junto a nuestro equipo que esta para brindar la ayuda
            y orientación necesaria. Comercializamos una enorme cantidad de
            productos que se adaptan a las necesidades de cada uno: sin azúcar,
            sin gluten, veganos y muchos más!
          </blockquote>
        </div>
      </div>
      <div className="aboutdiv41">
        <img
          src="/images/logo.png"
          loading="lazy"
          width={169}
          sizes="169px"
          alt="logo"
          className="aboutlogo"
        />
      </div>
      <p className="aboutparag">
        
        El lugar ideal para todo aquel que busque sentirse bien, promoviendo nuevos hábitos a través de la toma de consciencia.
        <br />
        <br />
        <strong>Somos más que una tienda!</strong>
        
      </p>
    </section>
  );
};

export default About;
