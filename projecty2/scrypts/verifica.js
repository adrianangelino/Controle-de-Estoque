// Função para realizar o login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Sucesso no login
            const user = userCredential.user;
            console.log('Login bem-sucedido:', user);
            window.location.href = "home.html";
        })
        .catch((error) => {
            // Erro no login
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Erro ao fazer login:', errorCode, errorMessage);
        });

}
