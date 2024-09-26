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
const database = getDatabase(app);

const insereFinanceiro = document.querySelector("#insereFinanceiro");

insereFinanceiro.addEventListener('click', function(event) {
    event.preventDefault();

    const nfs = document.querySelector("#nfs").value;
    const tipo = document.querySelector("#tipo").value;
    const temp = document.querySelector("#temp").value;
    const fornecedor = document.querySelector("#fornecedor").value;
    const valorNFS = document.querySelector("#valorNFS").value;
    const codigo = document.querySelector("#codigo").value;
    const descricao = document.querySelector("#descricao").value;
    const valorUNI = document.querySelector("#valorUNI").value;
    const QTD = document.querySelector("#QTD").value; // Mantendo o nome da quantidade como 'QTD'

    console.log('nfs:', nfs);
    console.log('tipo:', tipo);
    console.log('temp:', temp);
    console.log('fornecedor:', fornecedor);
    console.log('valorNFS:', valorNFS);
    console.log('codigo:', codigo);
    console.log('descricao:', descricao);
    console.log('valorUNI:', valorUNI);
    console.log('QTD:', QTD);

    const financeiroRef = ref(database, 'financeiro/' + tipo);
    set(financeiroRef, {
        nfs: nfs,
        tipo: tipo,
        temp: temp,
        fornecedor: fornecedor,
        valorNFS: valorNFS,
        codigo: codigo,
        descricao: descricao,
        valorUNI: valorUNI,
        QTD: QTD, 
    }).then(() => {
        alert('Financeiro salvo com sucesso!');
    }).catch((error) => {
        alert('Erro ao salvar o financeiro: ' + error.message);
    });
});
