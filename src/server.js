/**
 * O server vai servir para gerar dados
 */

import http from 'http';
import { Readable } from 'stream';

import { randomUUID } from 'crypto'

//generator function
function * run() {
    for (let index = 0; index <= 99; index++) {
        const data = {
            id: randomUUID(),
            name: `João-${index}`
        }
        yield data;
    }

    /**
     * O yield, cada vez que eu chamo ele
     * ele retorna o dado para quem o chamou. E você só pode
     * usa-lo se tiver o * na funcao
     */

}


async function handler(request, response) {
    //quero gerar dados
    const readable = new Readable(
        {
            read() {
                for (const data of run()) {
                    console.log(`sending`, data);
                    this.push(JSON.stringify(data) + "\n");
                }
                //para informar que os dados acabaram
                this.push(null)
            }
        }
    )

    //é quem vai gerenciar os dados para mim
    readable
        .pipe(response)
}

http.createServer(handler)
    .listen(3000)
    .on("listening", () => console.log('server running at 3000'));