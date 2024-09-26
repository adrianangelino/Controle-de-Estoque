import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get, query, orderByChild, limitToLast, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let currentKey; // Variável para armazenar a chave do item a ser editado

// Função para exibir os últimos itens lançados
function exibirUltimosItens() {
    const estoqueRef = ref(database, "financeiro");
    const ultimosItensQuery = query(estoqueRef, orderByChild('timestamp'), limitToLast(5));

    get(ultimosItensQuery).then((snapshot) => {
        if (snapshot.exists()) {
            const dados = snapshot.val();
            const ultimosItens = document.getElementById("ultimos-itens");
            ultimosItens.innerHTML = "";  // Limpar os últimos itens

            for (const key in dados) {
                if (dados.hasOwnProperty(key)) {
                    const produto = dados[key];
                    const produtoEST = document.createElement("div");
                    produtoEST.className = "dados";

                    const header = document.createElement("h2");
                    header.textContent = produto.descricao || "Sem descrição";
                    produtoEST.appendChild(header);

                    const codigoElement = document.createElement("p");
                    codigoElement.textContent = "Código: " + (produto.codigo || "Sem código");
                    produtoEST.appendChild(codigoElement);

                    const fornecedorElement = document.createElement("p");
                    fornecedorElement.textContent = "Fornecedor: " + (produto.fornecedor || "Desconhecido");
                    produtoEST.appendChild(fornecedorElement);

                    const qtdElement = document.createElement("p");
                    qtdElement.textContent = "Quantidade: " + (produto.QTD || "Sem quantidade");
                    produtoEST.appendChild(qtdElement);

                    // Botão de editar quantidade
                    const editButton = document.createElement("button");
                    editButton.textContent = "Editar Quantidade";
                    editButton.addEventListener("click", function() {
                        currentKey = key; // Armazena a chave do produto atual
                        document.getElementById("newQuantity").value = produto.QTD; // Preenche o input com a quantidade atual
                        document.getElementById("editModal").style.display = "block"; // Mostra o modal
                    });
                    produtoEST.appendChild(editButton);

                    ultimosItens.appendChild(produtoEST);
                }
            }
        } else {
            document.getElementById("ultimos-itens").innerHTML = "<p>Nenhum item encontrado.</p>";
        }
    }).catch((error) => {
        console.error("Erro ao buscar dados:", error);
    });
}

// Função para atualizar a quantidade no Firebase
function atualizarQuantidade() {
    const novaQtd = document.getElementById("newQuantity").value;
    const financeiroRef = ref(database, 'financeiro/' + currentKey);
    update(financeiroRef, {
        QTD: novaQtd,
    }).then(() => {
        alert('Quantidade atualizada com sucesso!');
        document.getElementById("editModal").style.display = "none"; // Fecha o modal
        exibirUltimosItens(); // Recarregar os itens após a atualização
    }).catch((error) => {
        alert('Erro ao atualizar a quantidade: ' + error.message);
    });
}

// Função para pesquisar o item
function pesquisarItem() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase().trim();

    const estoqueRef = ref(database, "financeiro");

    get(estoqueRef).then((snapshot) => {
        if (snapshot.exists()) {
            const dados = snapshot.val();
            const estoque = document.getElementById("estoque");
            estoque.innerHTML = "";  // Limpar o estoque

            let encontrou = false;
            for (const key in dados) {
                if (dados.hasOwnProperty(key)) {
                    const produto = dados[key];
                    const descricao = produto.descricao ? produto.descricao.toLowerCase() : "";
                    const codigo = produto.codigo ? produto.codigo.toLowerCase() : "";

                    if (descricao.includes(searchInput) || codigo.includes(searchInput)) {
                        const produtoEST = document.createElement("div");
                        produtoEST.className = "dados";

                        const header = document.createElement("h2");
                        header.textContent = produto.descricao || "Sem descrição";
                        produtoEST.appendChild(header);

                        const codigoElement = document.createElement("p");
                        codigoElement.textContent = "Código: " + (produto.codigo || "Sem código");
                        produtoEST.appendChild(codigoElement);

                        const fornecedorElement = document.createElement("p");
                        fornecedorElement.textContent = "Fornecedor: " + (produto.fornecedor || "Desconhecido");
                        produtoEST.appendChild(fornecedorElement);

                        const qtdElement = document.createElement("p");
                        qtdElement.textContent = "Quantidade: " + (produto.QTD || "Sem quantidade");
                        produtoEST.appendChild(qtdElement);

                        // Botão de editar quantidade
                        const editButton = document.createElement("button");
                        editButton.textContent = "Editar Quantidade";
                        editButton.addEventListener("click", function() {
                            currentKey = key; // Armazena a chave do produto atual
                            document.getElementById("newQuantity").value = produto.QTD; // Preenche o input com a quantidade atual
                            document.getElementById("editModal").style.display = "block"; // Mostra o modal
                        });
                        produtoEST.appendChild(editButton);

                        estoque.appendChild(produtoEST);

                        encontrou = true;
                    }
                }
            }

            if (!encontrou) {
                estoque.innerHTML = "<p>Nenhum item encontrado.</p>";
            }
        } else {
            estoque.innerHTML = "<p>Nenhum dado disponível.</p>";
        }
    }).catch((error) => {
        console.error("Erro ao buscar dados:", error);
    });
}

// Adicionar eventos
document.getElementById("pesquisarBtn").addEventListener("click", function() {
    pesquisarItem();
});

document.getElementById("saveQuantityBtn").addEventListener("click", function() {
    atualizarQuantidade();
});

document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("editModal").style.display = "none"; // Fecha o modal
});

// Chama as funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirUltimosItens();
    pesquisarItem(); // Inicialmente, exibe todos os itens para mostrar se houver dados
});
