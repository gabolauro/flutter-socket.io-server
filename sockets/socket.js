const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Heroes del silencio' ) );
bands.addBand( new Band( 'Metalica' ) );
bands.addBand( new Band( 'Bon jovi' ) );

// Sockets messages
io.on('connection', client => {
   console.log('Cliente conectado');

   client.emit('active-bands', bands.getBands())

   client.on('vote-band', (payload) => {
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands())
   })

   client.on('add-band', (payload) => {
      console.log('Recibido', payload);
      bands.addBand( new Band( payload.name ) )
      io.emit('active-bands', bands.getBands())
   })

   client.on('remove-band', (payload) => {
      console.log('Recibido', payload);
      bands.deleteBand( payload.id )
      io.emit('active-bands', bands.getBands())
   })

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
     });

     client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } )
     });

     client.on('emitir-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload)
      //   console.log('Recibido', payload);
        client.broadcast.emit('nuevo-mensaje', payload)
     })

});