const cron = require('node-cron');
let times = 0;
cron.schedule('1-59/5 * * * * *', () => {
    times++;
    console.log('Tick cada 5 segundos: Prueba de tags 2', times);
});

console.log('Inicio');