import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req 

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url) 
  })
 
  if (route) {
    const routeParams = url.match(route.path)

    // 1. A edição ninja: separa a query do resto dos parâmetros
    const { query, ...params } = routeParams.groups

    // 2. Coloca os parâmetros da URL (tipo o ID) no req.params
    req.params = params

    // 3. Se tiver query, ele extrai. Se não tiver, devolve um objeto vazio {}
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  // Não podemos esquecer o coitado do 404 aqui no final!
  return res.writeHead(404).end()
})

server.listen(3333)



//3 FORMAS DO  FRONTEND ENVIAR INFORMAÇÕES PARA A NOSSA API:

/*Query parameters: URL Stateful
parametros nomeados que enviamos no proprio endereço da requisição. Ex:
 http://localhost:3333/users?userId=1 o userID chamamos de query parameter e ele tem o valor de 1 e a chave userId
//cada parametro informado na url tem um nome e o valor, chave e o valor . Se quiser informar mais parametros, vou concatenando com '&'
Geralmente usamos para enviar informações que não são sensíveis, para modoficar a resposta que o backend vai dar. São coisas para filtros, paginação, buscar, informações não-obrigatórias.
*/

/*Route parameters:Identificação de recurso
parametros não nomeados que tbm ficam na rota. Ex:
http://localhost:3333/users/1
esse 1 no final chamamos de route parameters, ele quase faz parte da url, não tem um nome (tipo um Id), e geralmente serve paraidentificar um RECURSO. o método http já diz o que esse 1 significa. Ex: DELETE http://localhost:3333/users/1 (aqui dá para entender, a partir dessa rota DELETE, que eu estou querendo deletar o usuário com id 1)
Nenhum deles (query ou route parameters) podem ser usados para envio de dados sensíveis, como senhas, pqr causa da segurança, é fácil interceptar.
*/

/* Request body: Envio de informações de um formulario (HTTPs)
Não fica na url de jeito nenhum. Fariamos um POST pra criar um usuario: POST http://localhost:3333/users 
O corpo da requisição é enviado à parte, pelo body, não na url.
*/
//Demais rotas para edição e remoção de usuarios.





//req = criar um usuário (name, email, senha)  acesso a todos as informações da requisição de quem está chamando o nosso servidor.

//res = para devolver uma resposta para quem está chamando o nosso servidor


//localhost:3333 - para o servidor ouvir a porta 3333 do localhost da máquina
//req e res = request e response


//rotas = são meios de entrada e formas de quem está consumindo nossa api executar diferentes operações dentro do backend. Ex; vamos ter uma rota para criar usuários, uma para listagem de usuarios, uma para edição de usuarios, uma para remoção de usuarios 

//HTTP
// Composta de 2 principais recursos: 
//      - metodo http e 
//      - url

//5 metodos que vamos utilizar dentro das nossas api's: GET, POST, PUT, PATCH, DELETE

//GET = sempre que buscar  um recurso do backend

//POST = criar um recurso no backend

//PUT = editar ou atualizar um recurso no backend

//PATCH = atualizar uma informação unica ou especifica de um recurso no backend, facilmente confundido com PUT

//a diferença é que PUT é para quando quero atualizar uma entidade quase por completo..por exemplo um formulario de edição do meu perfil, posso atualizar meu nome, email, biografia, foto..muitos campos ao mesmo tempo. 
// E o PATCH é quando quero fazer uma atualização especifica, por exemplo qdo tenho uma rota no backend que serve especificamente para falar se quero aceitar notificações ou não..aí posso aceitar ou não..alterando uma informação mto especifica dentro do cadastro do usuario.. neste caso usamos o PATCH 

//DELETE = deletar um recurso do backend

//dentro do backend vamos divergir/diferenciar cada uma das rotas unicamente pela soma do metodo com a url. Isso significa que eu posso ter 2 rotas no meu backend, as duas serem a mesma url, porem com metodos diferentes. 

// GET /users = buscando usuarios no backend 
//POST /users = criar um usuario no backend

//ou seja o conj de http + recurso ou url é o que dá a rota e o result final que vamos executar dentro do backend

//STATEFUL - STATELESS
//A diferença é que a aplicação STATEFUL sempre vai ter algum tipo de informação sendo guardada na memoria, ou seja, ela depende das infos que são salvas em memoria para continuar funcionando. Stateless não salva nada em memoria, geralmente salva em dispositivos externos, independente se pararmos a aplicação e rodar ela de novo, os dados, arquivos ou qualquer tipo de funcionamento, vai se manter igual sem nenhum tipo de problema.
//Por enq vamos criar uma aplicação stateful, onde os dados da aplicação são armazenados localmente em memoria. Vamos criar uma constante users que vai ser um array vazio

//JSON - Javascript Object Notation

//Cabeçalhos (REQUISIÇÃO/RESPOSTA) => METADADOS - infos adicionais que não tem a ver com o dado retornado do backend para o frontend mas sim como ele pode ser interpretado pelo frontend.

//Toda vez que meu servidor restartar, a memoria dele é jogada fora - isso faz com que a aplicação STATELESS seja problematica se colocada em produção - não podemos perder os dados dos usuarios, por isso usamos mecanismos como bancos de dados.

//middleware - é um interceptador, são fáceis de ser reconhecidos pq sempre vçao receber como parametro o req e o res, e eles serão transformados ali dentro