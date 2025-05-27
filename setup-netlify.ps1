# Script para configurar el despliegue en Netlify

# Configurar Git
Write-Host "Configurando Git..."
git config --global user.email "ivan_aguirre1995@hotmail.com"

# Inicializar repositorio
git init
git add .
git commit -m "Initial commit"

# Mostrar instrucciones para GitHub
Write-Host ""Write-Host "Por favor, ve a GitHub y crea un nuevo repositorio llamado 'nemesis'"
Write-Host "Luego, copia la URL del repositorio y ejecuta:"
Write-Host "git remote add origin <URL_DEL_REPOSITORIO>"
Write-Host "git branch -M main"
Write-Host "git push -u origin main"

# Mostrar instrucciones para Netlify
Write-Host ""Write-Host "Ahora, ve a Netlify (https://app.netlify.com/signup) y:"
Write-Host "1. Crea una cuenta (puedes usar tu GitHub)"
Write-Host "2. Haz clic en 'New site from Git'"
Write-Host "3. Selecciona 'GitHub'"
Write-Host "4. Selecciona tu repositorio 'nemesis'"
Write-Host "5. Netlify configurará automáticamente HTTPS y el certificado SSL"

Write-Host ""Write-Host "Una vez que Netlify termine el despliegue, te dará una URL segura como:"
Write-Host "https://nemesis.netlify.app"
Write-Host "Esta URL será segura y no mostrará mensajes de advertencia en ningún navegador"
