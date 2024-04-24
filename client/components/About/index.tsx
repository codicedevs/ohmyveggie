
const About = () => {
    return (
        <section className="aboutsection">
            <h1 className="aboutheading">Nosotros</h1>
            <div className="aboutcolumns w-row">
                <div className="aboutcolumn1 w-col w-col-6 w-col-small-small-stack">
                    <img
                        src="/images/hero2.jpg"
                        loading="lazy"
                        sizes="(max-width: 479px) 94vw, (max-width: 767px) 95vw, (max-width: 991px) 47vw, (max-width: 4666px) 42vw, 1960px"
                        alt="nosotros"
                    />
                </div>
                <div className="aboutcolumn2 w-col w-col-6 w-col-small-small-stack">
                    <blockquote className="block-quote">
                        En el año 2008 en la ciudad de La Plata nace la idea de armar una tienda
                        saludable. Tras detectar la oportunidad de que sería un rubro con mucho
                        crecimiento en los próximos años, se decide abrir la primer tienda. Al
                        año se inauguran dos tiendas más y en febrero del 2018, nació en Neuquén
                        el concepto de “Oh My Veggie” buscando una atención más personalizada y
                        promoviendo un estilo en cuanto a imagen innovadora y distinta.
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
                <strong>
                    Nuestra Filosofía
                    <br />‍
                </strong>
                <br />
                Creemos que la comida debe ser nutritiva, deliciosa y ética. Por ello, en Oh
                My Veggie, nos comprometemos a utilizar ingredientes frescos, locales y de
                la más alta calidad. Nuestros productos están seleccionados para explorar la
                riqueza de la cocina vegana, presentando platos inspirados en sabores de
                todo el mundo, desde clásicos reconfortantes hasta innovaciones culinarias.
                <br />
                <br />
                <strong>Compromiso con la Sostenibilidad</strong>
                <br />‍<br />
                La sostenibilidad es el núcleo de nuestra operación. Nos esforzamos por
                minimizar nuestro impacto ambiental a través de prácticas como el
                compostaje, el uso de envases biodegradables y la colaboración con
                proveedores locales que comparten nuestra visión de un futuro más verde.
                <br />
                <br />
                <strong>Visitanos</strong>
                <br />‍<br />
                Encontranos en el Fisherton Plaza Chic Mall y vení a experimentar la magia
                de la comida vegana. Estamos emocionados de darte la bienvenida y compartir
                nuestra pasión por la comida saludable, deliciosa y respetuosa con el
                planeta.
            </p>
        </section>   
  );
}

export default About
