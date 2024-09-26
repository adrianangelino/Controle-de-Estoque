import {
  initializeApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Verificar se o Firebase já foi inicializado
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Usar a instância já inicializada
}

const database = getDatabase(app);

// Referência para os Financeiro
const financeiroRef = ref(database, "financeiro");

// Formulário de edição
const formEdicao = document.getElementById("form-edicao");
const fornecedorIdInput = document.getElementById("fornecedor-id");
const fornecedorInput = document.getElementById("fornecedor");
const nfsInput = document.getElementById("nfs");
const tipoInput = document.getElementById("tipo");
const valorNFS = document.getElementById("valorNFS");
const salvarButton = document.getElementById("salvar");
const cancelarButton = document.getElementById("cancelar");

// Função para exibir os dados financeiros
function mostrarFinanceiro() {
  get(financeiroRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const financeiro = snapshot.val();
        const lista = document.getElementById("financeiro-lista");
        lista.innerHTML = ""; // Limpa a lista

        for (const key in financeiro) {
          if (financeiro.hasOwnProperty(key)) {
            const itemFinanceiro = financeiro[key];
            const item = document.createElement("div");
            item.className = "financeiro";

            const header = document.createElement("h2");
            header.textContent = itemFinanceiro.fornecedor || "Fornecedor não definido";
            item.appendChild(header);

            const nfs = document.createElement("p");
            nfs.textContent = `Número da NFs: ${itemFinanceiro.nfs || "N/A"}`;
            item.appendChild(nfs);

            const valorNFS = document.createElement("p");
            valorNFS.textContent = `Preço: ${itemFinanceiro.valorNFS ? `R$${itemFinanceiro.valorNFS}` : "N/A"}`;
            item.appendChild(valorNFS);

            const tipo = document.createElement("p");
            tipo.textContent = `Tipo: ${itemFinanceiro.tipo || "N/A"}`;
            item.appendChild(tipo);

            // Botão de edição
            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.addEventListener("click", () =>
              editarFinanceiro(key, itemFinanceiro)
            );
            item.appendChild(editButton);

            // Botão de exclusão
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.addEventListener("click", () =>
              excluirFinanceiro(key)
            );
            item.appendChild(deleteButton);

            lista.appendChild(item);
          }
        }
      } else {
        console.log("Nenhum dado encontrado.");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar os agendamentos:", error);
    });
}

// Função para excluir um item financeiro
function excluirFinanceiro(key) { 
  const financeiroRef = ref(database, `financeiro/${key}`);
  remove(financeiroRef).then(() => {
    mostrarFinanceiro();
    console.log('Financeiro excluído com sucesso.');
  }).catch((error) => {
    console.error('Erro ao excluir o financeiro:', error);
  });
}

// Função para exibir o formulário de edição com os dados do item
function editarFinanceiro(key, itemFinanceiro) {
  fornecedorIdInput.value = key;
  fornecedorInput.value = itemFinanceiro.fornecedor || "";
  nfsInput.value = itemFinanceiro.nfs || "";
  tipoInput.value = itemFinanceiro.tipo || "";
  valorNFS.value = itemFinanceiro.valorNFS || "";
  formEdicao.style.display = "block"; // Exibe o formulário de edição
}

// Função para salvar as alterações
salvarButton.addEventListener('click', () => {
  const key = fornecedorIdInput.value;
  const updateFinanceiro = {
    fornecedor: fornecedorInput.value,
    nfs: nfsInput.value,
    tipo: tipoInput.value,
    valorNFS: valorNFS.value
  };

  const financeiroRef = ref(database, `financeiro/${key}`);
  set(financeiroRef, updateFinanceiro).then(() => {
    console.log('Atualizado com sucesso.');
    mostrarFinanceiro();
    formEdicao.style.display = "none"; // Oculta o formulário de edição
  }).catch((error) => {
    console.error('Erro ao atualizar:', error);
  });
});

// Função para cancelar a edição
cancelarButton.addEventListener('click', () => {
  formEdicao.style.display = 'none'; // Oculta o formulário de edição
});

// Chama a função para mostrar os dados quando a página é carregada
document.addEventListener('DOMContentLoaded', mostrarFinanceiro);
