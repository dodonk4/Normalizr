const faker = require('faker');

// const tablaProductosRandom = document.getElementById('tablaProductosRandom');
// document.write(tablaProductosRandom.id)
// const name = faker.name.findName();

tablero = ()=>{
    // let productos = ``; //PARA MOSTRAR COMO HTML
    let productos = [];
    for (let i = 0; i < 5; i++) {
        const name = faker.commerce.productName();
        const price = faker.commerce.price();
        // const photo = faker.image.abstract();
        let producto = `${name} $${price} <img src="${faker.image.business()}?random=${Math.round(Math.random() * 1000)}" width="100px" height="100px"><br>`;
        // productos += producto; //PARA MOSTRAR COMO HTML
        productos.push(producto); 
    }
        
    return productos;
};

module.exports = tablero
