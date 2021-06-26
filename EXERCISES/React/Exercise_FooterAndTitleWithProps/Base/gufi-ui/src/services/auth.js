// define a constante "usuarioAutenticado" para verificar se o usuário está logado
export const usuarioAutenticado = () => localStorage.getItem('usuario-login') !== null;

// define a constante "parseJwt" que retorna o payload do usuário convertido em JSON
export const parseJwt = () => {
    // define a variável "base64" que recebe o payload do usuário logado codificado
    // pega o payload do token e salva na "base64"
    let base64 = localStorage.getItem("usuario-login").split('.')[1];

    // decodifica a "base64" para string, através do método "atob" e converte a string para JSON
    return JSON.parse(window.atob(base64));
}