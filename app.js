function agegarAmigo(nome, idade) {
  return {
    nome: nome,
    idade: idade
  };
}

function listarAmigos(amigos) {
  amigos.forEach(function(amigo) {
    console.log("Nome: " + amigo.nome + ", Idade: " + amigo.idade);
  });
}

function sortearAmigo(amigos) {
  if (amigos.length === 0) {
    console.log("Nenhum amigo cadastrado.");
    return;
  }
  const indiceSorteado = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceSorteado];
  console.log("Amigo sorteado: " + amigoSorteado.nome + ", Idade: " + amigoSorteado.idade);
}