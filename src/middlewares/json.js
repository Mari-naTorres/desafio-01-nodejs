export async function json(req, res){
    const buffers = []

    for await (const chunk of req){
     buffers.push(chunk)
    
    }

    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
      req.body = null
    }

    res.setHeader('Content-type', 'application/json')


}

//esse unico arquivo (middleware/json.js) lida tanto com o json de entrada (converte o corpo da nossa requisição em json) qto já devolve os dados em json - fala pro nosso frontend que os dados estão em json






