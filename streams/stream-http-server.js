import http from 'node:http'
import { Transform } from 'node:stream'


class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

//tudo no node são streams, todas as portas de entrada e saída no node são streams

// req --> Readable stream
// res --> Writable stream
// ou seja, consigo ler dados da minha requisição e consigo escrever dados na minha resposta para o frontend (p/ quem está fazendo a requisição)

const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
      buffers.push(chunk)
    }
//Regra do Async/Await => toda função em que usamos await, na função superior na seguinte usamos async

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)


    //return req
    //    .pipe(new InverseNumberStream())
   //     .pipe(res)
})

server.listen(3334) 


//o .pipe()encaminha os dados provindos de uma stream para outra