import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getDatabase, ref, get, set, remove } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

// Configuração do Firebase
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
const database = getDatabase(app);

// Referência para os agendamentos
const agendamentosRef = ref(database, 'agendamentos');

// Elementos do formulário de edição
const formEdicao = document.getElementById('form-edicao');
const agendamentoIdInput = document.getElementById('agendamento-id');
const nomeInput = document.getElementById('nome');
const cnpjInput = document.getElementById('cnpj');
const tempoInput = document.getElementById('tempo');
const precoInput = document.getElementById('preco');
const salvarButton = document.getElementById('salvar');
const cancelarButton = document.getElementById('cancelar');

// Função para buscar e mostrar os agendamentos
function mostrarAgendamentos() {
  get(agendamentosRef).then((snapshot) => {
    if (snapshot.exists()) {
      const agendamentos = snapshot.val();
      const lista = document.getElementById('agendamentos-lista');
      
      if (lista) {
        lista.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        for (const key in agendamentos) {
          if (agendamentos.hasOwnProperty(key)) {
            const agendamento = agendamentos[key];
            const item = document.createElement('div');
            item.className = 'agendamento';
            
            // Criar um cabeçalho com o nome do cliente
            const header = document.createElement('h2');
            header.textContent = agendamento.nome;
            item.appendChild(header);

            // Adicionar informações adicionais
            const cnpjP = document.createElement('p');
            cnpjP.textContent = `CNPJ: ${agendamento.cnpj}`;
            item.appendChild(cnpjP);

            const tempoP = document.createElement('p');
            tempoP.textContent = `Data: ${agendamento.tempo}`;
            item.appendChild(tempoP);

            const preco = document.createElement('p');
            preco.textContent = `Preco: ${agendamento.preco}`;
            item.appendChild(preco);

            // Botão de edição
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editarAgendamento(key, agendamento));
            item.appendChild(editButton);

            // Botão de exclusão
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => excluirAgendamento(key));
            item.appendChild(deleteButton);

            lista.appendChild(item);
          }
        }
      } else {
        console.log('Elemento com o ID "agendamentos-lista" não encontrado.');
      }
    } else {
      console.log('Nenhum dado encontrado.');
    }
  }).catch((error) => {
    console.error('Erro ao buscar os agendamentos:', error);
  });
}

// Função para excluir um agendamento
function excluirAgendamento(key) {
  const agendamentoRef = ref(database, `agendamentos/${key}`);
  remove(agendamentoRef).then(() => {
    console.log('Agendamento excluído com sucesso.');
    mostrarAgendamentos(); // Atualiza a lista após a exclusão
  }).catch((error) => {
    console.error('Erro ao excluir o agendamento:', error);
  });
}

// Função para exibir o formulário de edição com dados preenchidos
function editarAgendamento(key, agendamento) {
  agendamentoIdInput.value = key;
  nomeInput.value = agendamento.nome;
  cnpjInput.value = agendamento.cnpj;
  tempoInput.value = agendamento.tempo;
  precoInput.value = agendamento.preco;

  formEdicao.style.display = 'block'; // Exibe o formulário de edição
}

// Função para salvar as alterações
salvarButton.addEventListener('click', () => {
  const key = agendamentoIdInput.value;
  const updatedAgendamento = {
    nome: nomeInput.value,
    cnpj: cnpjInput.value,
    tempo: tempoInput.value,
    preco: precoInput.value
  };

  const agendamentoRef = ref(database, `agendamentos/${key}`);
  set(agendamentoRef, updatedAgendamento).then(() => {
    console.log('Agendamento atualizado com sucesso.');
    formEdicao.style.display = 'none'; // Oculta o formulário de edição
    mostrarAgendamentos(); // Atualiza a lista após a edição
  }).catch((error) => {
    console.error('Erro ao atualizar o agendamento:', error);
  });
});

// Função para cancelar a edição
cancelarButton.addEventListener('click', () => {
  formEdicao.style.display = 'none'; // Oculta o formulário de edição
});

document.addEventListener('DOMContentLoaded', mostrarAgendamentos);
