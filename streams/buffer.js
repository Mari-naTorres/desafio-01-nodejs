//Buffer é uma representação de um espaço na memória do computador, usado especificamente para transitar dados de uma maneira muito rápida, ou seja, eles são armazenados para logo serem enviados para outro lugar e depois removidos (ver a explicação do Gemini).

//Ele guarda os dados na memória de uma maneira binária.

//É uma API criada dentro do Node especificamente pela incapacidade do JS de trabalhar com dados binários de maneira eficiente.

const buf = Buffer.from('hello')

console.log(buf)

//se eu rodar no terminal (node streams/buffer.js) ele vai devolver <Buffer 6f 6b> , isso é um hexadecimal em que cada um desses (6f e 6b) representa uma letra dessa palavra ('ok') - o primeiro representa 'o' e o segundo representa o 'k'.
// Se a palavra for diferente, o hexadecimal muda (troquei para 'hello'): o resultado, neste caso, fica <Buffer 68 65 6c 6c 6f>

// hexadecimal significa que tem até 16 bits por caractere (base 16)
//decimal são 10 (base 10)
//binário (base 2) só tem 0 e 1

console.log(buf.toString())
//essa é a prova real para ver o caminho de volta nesse mesmo arquivo - sugestão do Gemini - o resultado, portanto, é o texto