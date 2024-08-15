//Cod. Propio
// Buscar data del usuario desde BACKEND
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const userContainer = document.getElementById('user-container');

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.className = 'user';

                userDiv.innerHTML = `
                <img src="${user.picture}" alt="${user.name}">
                <h2>${user.name}</h2>
                <p><strong>Genero:</strong> ${user.gender}</p>
                <p><strong>Locación:</strong> ${user.location}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Fecha de Nacimiento:</strong> ${new Date(user.dob).toDateString()}</p>
            `;

                userContainer.appendChild(userDiv);
            });
        })
        .catch(error => {
            console.error('Error buscado Usuarios', error);
        });
});