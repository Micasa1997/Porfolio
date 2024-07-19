const BASE_IMAGE_URL = 'https://gkfibffviwvmphzqvuqe.supabase.co/storage/v1/object/public/fci-personal';

function formatComments(comentarios) {
  return comentarios.map(comentario => {
    if (comentario.user && comentario.text) {
      return `<strong>${comentario.user}</strong>: ${comentario.text}`;
    } else {
      return 'Comentario no disponible';
    }
  }).join('<br>');
}

async function obtenerimagen(postId) {
  let imagen = [];
  try {
    let response = await fetch(`https://gkfibffviwvmphzqvuqe.supabase.co/rest/v1/post_images?id=eq.c8d45990-08f4-41a1-8048-6bdfbb76ef5b.${postId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0'
      },
    });
    if (response.status >= 200 && response.status < 300) {
      let responseData = await response.json();
      if (responseData[0] && responseData[1].imagen) {
        for (let i = 0; i < responseData[0].imagen.length; i++) {
          let imageUrl = BASE_IMAGE_URL + '/' + responseData[0].imagen[i];
          imagen.push(imageUrl);
        }
        console.log('Imágenes descargadas de forma correcta. Código:', response.status);
      } else {
        console.log('No se encontraron imágenes para este postId');
      }
    }
  } catch (error) {
    console.error('Error. Código:', error);
  }
  return imagen;
}

async function obtenerpost() {
  try {
    let response = await fetch('https://gkfibffviwvmphzqvuqe.supabase.co/rest/v1/posts?select=*', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0'
      },
    });
    if (response.status >= 200 && response.status < 300) {
      let data = await response.json();
      if (data) {
        const contenedorPosts = document.querySelector('.middle-main-2');
        for (let post of data) {
          let imagenes = await obtenerimagen(post.id);
          const postElemento = document.createElement('div');
          postElemento.classList.add('post-about');
          let contenidoPost = `
          <div class="post">
  <div class="post-header">
    <img src="${data[1].imagenPerfil}" alt="Foto de perfil" class="profile-pic">
    <div>
      <p class="name">${data[1].user_name}</p>
      <p class="post-time">${data[1].created_at}</p>
    </div>
    <div class="post-options">
    <button style="height: 24px; width: 24px;" class="button-opcions"><img src="assets/icons/FrameMenu.svg" alt="ociones"/></button>
    </div>
  </div>
  <p class="post-content">${data[1].description}</p>
  <div class="post-images">
  ${imagenes.map(imagen => `<img src="${imagen}" alt="Imagen del post">`).join('')}
  </div>

  <div class="post-qr">
   
    <img src="assets/icons/FrameQR.svg" alt="Código QR">
  </div>
  <p class="post-likes">Likes: ${data[1].likes}</p>
  
  <button style="height: 24px; width: 24px;" class="button-like"><img src="assets/icons/VectorMe gusta.svg" alt="Likes"/></button>
  <button style="height: 24px; width: 24px;" class="button-comentar"><img src="assets/icons/comment-dots 1Comentar.svg" alt="Comentar"/></button>
  <button style="height: 24px; width: 24px;" class="button-recomendar"><img src="assets/icons/FrameRecomendat.png" alt="Recomednar"/></button>
  <button style="height: 24px; width: 24px;" class="button-Enviar"><img src="assets/icons/VectorEnviar.svg" alt="Enviar"/></button>
  
  <div class="post-comments">
    <p>${formatComments(data[1].comments)}</p>
  </div>
</div>
        `;

       
          for (let imagen of imagenes) {
            contenidoPost += `<img src="${imagen}" alt="Imagen del post">`;
          }

          
          postElemento.innerHTML = contenidoPost;

          
          contenedorPosts.appendChild(postElemento);
        }
      }
    }
  } catch (error) {
    console.error('Ha ocurrido un error:', error);
  }
}

obtenerpost();