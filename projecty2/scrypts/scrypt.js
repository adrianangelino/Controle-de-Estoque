const btnClient = document.querySelector("#link1");
const btnAgenda = document.querySelector("#link2");
const btnFinanceiro = document.querySelector("#link3");
const btnMostraFinanceiro = document.querySelector("#link4");
const btnEstoque = document.querySelector("#link5")

btnClient.addEventListener('click', function(){
    window.location.href = "client.html";
});

btnAgenda.addEventListener('click', function(){
    window.location.href = "agendamentos.html";
});


btnFinanceiro.addEventListener('click', function(){
    window.location.href = "financeiro.html";
});

btnMostraFinanceiro.addEventListener('click', function(){
    window.location.href = "mostrarFinanc.html";
});

btnEstoque.addEventListener('click', function(){
    window.location.href = "estoque.html";
});
