document.addEventListener('DOMContentLoaded', () => {
    // Manejar cambio entre login y registro
    const authTabs = document.querySelectorAll('.auth-tab');
    const authContents = document.querySelectorAll('.auth-content');

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            authTabs.forEach(t => t.classList.remove('active'));
            authContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`#${tabName}Form`).classList.add('active');
        });
    });

    // Manejar formulario de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        // Aquí iría la lógica de autenticación
        console.log('Login:', { username, password });
    });

    // Manejar formulario de registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Aquí iría la lógica de registro
        console.log('Register:', { username, email, password });
    });

    // Manejar botones de redes sociales
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList[1];
            // Aquí iría la lógica de autenticación social
            console.log('Social login:', platform);
        });
    });
});
