export function buildRoutePath(path) {
    //1. Encontra onde tem o :id (ou qualquer outro parãmetro)

    const routeParametersRegex = /:([a-zA-Z]+)/g

    //2. Substitui o :id pela regra de Regex que aceita letras, números e hífens
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\\-_]+)')

    //3. Cria a expressão regular final e garante que ela comece com esse caminho (^)
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    //4. Devolve a regra  pronta para o server.js poder usar o .test()
    return pathRegex 
}


//Regex é uma expressão regular, que é uma forma de encontrar textos que seguem um formato específico dentro de um texto muito maior.


