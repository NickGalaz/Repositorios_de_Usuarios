
window.onload = function () {
    let baseUrl = "https://api.github.com/users";
    // Se crea un div para cada sección: usuario y repos del usuario
    const userDiv = document.createElement("div");
    const repoDiv = document.createElement("div");

    // Función utilitaria de request
    const request = async (url) => {
        const data = await fetch(url)
        const response = await data.json();
        // Alerta cuando no se encuentra usuario
        if (response.message == 'Not Found') {
            alert('Usuario no encontrado. Intenta con otro.');
        } else {
            return response
        }
    }

    const getUser = async (user) => {
        const url = `${baseUrl}/${user}`;
        return request(url);
    }

    const getRepo = async (user, page, reposQuantity) => {
        const url = `${baseUrl}/${user}/repos?page=${page}&per_page=${reposQuantity}`;
        return request(url);
    }

    let form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // Guardar los valores de los 3 inputs en variables
        const user = document.getElementById('nombre').value;
        const page = document.getElementById('pagina').value;
        const reposQuantity = document.getElementById('repoPagina').value;
        // Seleccionar div de resultados y agregarle los divs anteriormente creados
        const results = document.getElementById('resultados');
        results.append(userDiv);
        results.append(repoDiv);
        // Prueba para ver response con datos de user
        console.log(user);

        const llamado = async () => {
            const usert = getUser(user);
            const repot = getRepo(user, page, reposQuantity);
            try {
                const user = await usert;
                const repo = await repot;
                // Prueba en consola para ver data de usuario y sus repos
                console.log('User: ', user);
                console.log('Repo: ', repo);
                // Llamado a las funciones que mostraran los datos
                showUserData(user);
                showRepoData(repo, reposQuantity);
            }
            catch (error) {
                console.log('Error: ', error);
            }
        }

        const showUserData = (user) => {
            userDiv.innerHTML = `<h3>Datos de Usuario</h3><img src="${user.avatar_url}" alt="Avatar de Github"><ul><li>Nombre de usuario: ${user.name}</li><li>Nombre de login: ${user.login}</li><li>Cantidad de repositorios: ${user.public_repos}</li><li>Localidad: ${user.location}</li><li>Tipo de usuario: ${user.type}</li></ul>`;
        }
        const showRepoData = (repo, reposQuantity) => {
            repoDiv.innerHTML = "<h3>Repositorios</h3>";
            const list = document.createElement("ul");

            // Por cada elemento, crear un elemento li (ítem de lista), dentro escribirle las urls de los repos, y una vez listo, adjuntar listItem al elemento lista
            for (let i = 0; i < reposQuantity; i++) {
                let listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${repo[i].html_url}">${repo[i].name}</a>`;
                list.append(listItem)
            }
            // Cuando el ciclo for termina, adjuntar elemento list al div RepoDiv
            repoDiv.append(list);
            // Adjuntar repoDiv al elemento results
            results.append(repoDiv);
        }

        llamado();
    })

}