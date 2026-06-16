const USERNAME = "matheusmatinata";

async function carregarPerfil() {
    try {
        const response = await fetch(`https://api.github.com/users/${USERNAME}`);
        if (!response.ok) throw new Error("Erro ao buscar perfil");
        const usuario = await response.json();
        document.getElementById("avatar").src = usuario.avatar_url;
    } catch (error) {
        console.error(error);
    }
}

async function carregarProjetos() {
    try {
        const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated`);
        const repositorios = await response.json();
        const container = document.getElementById("projects");
        
        container.innerHTML = "";

        const projetos = repositorios.filter(repo => !repo.fork && repo.name !== USERNAME);

        projetos.forEach(repo => {
            const card = document.createElement("div");
            card.className = "card";
            const demoUrl = `https://${USERNAME}.github.io/${repo.name}/`;

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Projeto em desenvolvimento."}</p>
                <div class="language">
                    <span>${repo.language || "N/A"}</span>
                </div>
                <div class="buttons">
                    <a class="btn" href="${repo.html_url}" target="_blank">Código</a>
                    <a class="btn" href="${demoUrl}" target="_blank">Demo</a>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        document.getElementById("projects").innerHTML = "<p>Não foi possível carregar os projetos no momento.</p>";
    }
}

carregarPerfil();
carregarProjetos();