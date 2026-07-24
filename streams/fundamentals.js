//Netflix $ Spotfy

//Importação de clientes via CSV (Excel)
//1gb - 1.000.000
// POST / upload import.csv

// 100s -> Inserções n banco de dados

// 10mbs/s -> 10.000

//Redable Streams / Writable Streams



/*process.stdin
    .pipe(process.stdout)*/

//tudo o que eu digito no terminal, ele digita de novo (repete). 

//process.stdin é uma duplex stream. Tudo o que estou recebendo como entrada eu estou encaminhando para uma saída.

//stdin é uma stream de entrada (stream de leitura)
//stdout é uma stream de saída (stream de escrita)


//Como construir streams do zero

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

     setTimeout(()=> {
        if (i > 100) {
            this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
     }, 1000)
    

    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable{
        _write(chunk, encoding, callback) {
            console.log(Number(chunk.toString()) * 10)
            callback()
        }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())