import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}; 

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// iniciar database
const database = getDatabase(app);

const inseredb = document.querySelector("#insere");


inseredb.addEventListener('click', function(event) {
event.preventDefault();

  const nome = document.querySelector("#cliente").value;
  const cnpj = document.querySelector("#cnpj").value;
  const tempo = document.querySelector("#tempo").value;
  const preco = document.querySelector("#preco").value;

  console.log('Nome:', nome);
  console.log('CNPJ:', cnpj);
  console.log('Tempo:', tempo);
  console.log('preco:', preco );

  const agendamentoRef = ref(database, 'agendamentos/' + cnpj);
  set(agendamentoRef, {
    nome: nome,
    cnpj: cnpj,
    tempo: tempo,
    preco: preco
  }).then(() => {
    alert('Agendamento salvo com sucesso!');
  }).catch((error) => {
    alert('Erro ao salvar o agendamento: ' + error.message);
  });
});
