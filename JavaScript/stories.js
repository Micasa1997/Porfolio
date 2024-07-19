
const BASE_IMAGE_URL = 'https://gkfibffviwvmphzqvuqe.supabase.co/storage/v1/object/public/fci-personal';

function formatter(storie, BASE_IMAGE_URL) {
    return {
        id: storie.id || null,
        createdAt: storie.created_at || null,
        userName: storie.profile_name || '',
        img: BASE_IMAGE_URL + (storie.profile_image || ''), 
        isUpToDate: storie.is_up_to_date || true
    };
}

async function getStories(){
    let arrayHistorias = [];
    let response = await fetch('https://gkfibffviwvmphzqvuqe.supabase.co/rest/v1/stories?select=*',{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0'
        },
    })
        .then(async (response) => {
            if (response.status >= 200 && response.status < 300){
                await response.json()
                .then((responseData) => {
                    for (let i = 0; i < responseData.length; i++) {
                        arrayHistorias.push(formatter(responseData[i], BASE_IMAGE_URL));
                    }
                    console.log('Historias descargadas de forma correcta. Código:', response.status);
                })
                .catch((error) => {
                    console.error('Error al procesar los datos de la respuesta. Código:', error);
                });
            } else if (response.status >= 100 && response.status < 200) { 
                console.error('Respuestas informativas. Código:', response.status);
            } else if (response.status >= 300 && response.status < 400) { 
                console.error('Redirecciones. Código:', response.status);
            } else if (response.status >= 400 && response.status < 500) { 
                console.error('Error en cliente. Código:', response.status);
            } else if (response.status >= 500 && response.status < 600) { 
                console.error('Error en servidor. Código:', response.status);
            }
        })
        .catch((error) => {
            console.error('No se ha podido descargar la historia, intente más tarde', error);
        });
                
    let seccionHistoria = document.getElementById('Historias de usuario');
    for (let i = 0; i < arrayHistorias.length; i++) {
        seccionHistoria.innerHTML += `
        
        <div class="usuario-info" id="${arrayHistorias[i].isUpToDate ? 'usuario-info-post' : 'usuario-info-outdated'}"> <!-- Corrección: Añadir condicional para el ID -->
          <div class="imagen-usuario"> <img src="${arrayHistorias[i].img}"/>
          </div>
          <div class="info-usuario" id="info-usuario-post">
            <span class="nombre-usuario" id="nombre-usuario-post">${arrayHistorias[i].userName}</span>
            <span class="hora-publicacion" id="hora-publicacion-post">${arrayHistorias[i].createdAt}</span>
          </div>
        </div>
    `;
    }
}
getStories();


