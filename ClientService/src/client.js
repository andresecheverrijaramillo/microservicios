import dotenv from 'dotenv';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

dotenv.config()

const PROTO_PATH = process.env.PROTO_PATH;
const REMOTE_HOST = process.env.REMOTE_HOST;



// definir atributos para la conexion con el servidor
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

console.info("Consumer service is started...");

// se crea el constructor para crear conexiones con el servidor
const productService = grpc.loadPackageDefinition(packageDefinition).ProductService;

function main(){

  const idProduct = 1;
  var products = [];

  // se crea la coexion con el servidor
  const client = new productService(REMOTE_HOST,grpc.credentials.createInsecure());

  client.AddProduct({id_product: idProduct} ,  (err, data) => {

    if(err){
      console.log(err);
    } else {
      console.log('Response received from remote service:', data); // API response
      products.push(idProduct)
      console.log(products)
    }
   });

   const idProduct2 = 2;

   client.AddProduct({id_product: idProduct2} , (err, data) => {

    if(err){
      console.log(err);
    } else {
      console.log('Response received from remote service:', data); // API response
      products.push(idProduct2)
      console.log(products)
    }
   });

   const idProduct3 = 3;

   client.AddProduct({id_product: idProduct3} , (err, data) => {

    if(err){
      console.log(err);
    } else {
      console.log('Response received from remote service:', data); // API response
      products.push(idProduct3)
      console.log(products)
    }
   });

   client.DeleteProduct({id_product: idProduct2} , (err, data) => {

    if(err){
      console.log(err);
    } else {
      console.log('Response received from remote service:', data); // API response
      products = products.filter(function(value, index, arr){ 
        return value !== idProduct2;
      });
      console.log(products)
    }
   });

   client.BuyProducts({product_ids:products} , (err,data) => {
    if(err){
        console.log(err);
    } else {
        console.log('Response received from remote service:', data); // API response
    }
   })

};

main();