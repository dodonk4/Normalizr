// const {options2} = require('./knexConfig');
const fs = require('fs');
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
module.exports = class Mensajeria{
    constructor(archivo){
        this.archivo = archivo;
        

    }
    async obtenerTodos (){
        try {



        const content = await fs.promises.readFile(this.archivo);
        let stringed = content.toString('utf8');
        let parseado = JSON.parse(stringed);

          

          const authorSchema = new schema.Entity('authors',{idAttribute: 'email'});

          const mensajeSchema = new schema.Entity('texts', {
            author: authorSchema
          });
          

          const util = require('util')
          
          function print(objeto) {
            console.log(util.inspect(objeto, false, 12, true))
          }
          
          print(parseado)
          console.log(JSON.stringify(parseado).length)
          
          
          const normalizedData = normalize(parseado, [parseado]);
          print(normalizedData)
          console.log(JSON.stringify(normalizedData).length)
          

          const denormalizedData = denormalize(normalizedData.result, [parseado], normalizedData.entities);
          print(denormalizedData)
          console.log(JSON.stringify(denormalizedData).length)
          


        } catch (error) {
            console.log(`fallo la operacion obtenerTodos: ${error.message}`)
        }
    }
    async insertarMensajesIndividuales(objeto){
        try {
            let leido = await fs.promises.readFile(this.archivo);
            let stringed = leido.toString('utf8');
            let parseado = JSON.parse(stringed);
            parseado.push(objeto);
            let stringeado = JSON.stringify(parseado);
            await fs.promises.writeFile(this.archivo, JSON.stringify(parseado), 'utf-8');

        } catch (error) {
            console.log(`fallo la operacion insertarMensajesIndividuales: ${error.message}`)
        }     
    }
}


