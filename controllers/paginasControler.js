import { Testimonial } from '../models/Testimoniales.js';
import { Viaje } from '../models/Viaje.js';


const paginaInicio = async (req, res) => { //req=peticion res=lo que responde express  
    
    //Consultar 3 viajes del modelo Viaje y testimoniales

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3}) );
    promiseDB.push( Testimonial.findAll({ limit: 3} ) );

    try {

        const resultado = await Promise.all( promiseDB );

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes : resultado[0],
            testimoniales : resultado[1]
        });
        
    } catch (error) {
        console.log(error);
    }
    
    
}

const paginaNosotros = (req, res) => { //req=peticion res=lo que responde express  

    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { 
    //Consultar base de datos
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });

}

// Muesra un viaje por su slug
const paginaDetalleViaje = async (req, res) => { 
    
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne( { where : { slug }});

        res.render('viaje', {
            pagina: 'Información viaje',
            viaje
        });

    } catch (error) {
        console.log(error);
    }

    

}

const paginaTestimoniales = async (req, res) => { 

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
        
    } catch (error) {
        console.log(error);
    }

    
}




export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}