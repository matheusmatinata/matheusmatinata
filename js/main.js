const USERNAME = "matheusmatinata";

async function carregarPerfil() {
    const response = await fetch(`https://api.github.com/users/${USERNAME}`);
    const usuario = await response.json();
    document.getElementById("avatar").src = usuario.avatar_url;
}

async function carregarProjetos() {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
    const repositorios = await response.json();
    const container = document.getElementById("projects");

    const projetos = repositorios
        .filter(repo => !repo.fork && repo.name !== USERNAME)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    projetos.forEach(repo => {
        const card = document.createElement("div");
        card.className = "card";
        const demoUrl = `https://${USERNAME}.github.io/${repo.name}/`;

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "Projeto desenvolvido com tecnologias web."}</p>
            <div class="language">
                <span>${repo.language || "Web"}</span>
            </div>
            <div class="buttons">
                <a class="btn" href="${repo.html_url}" target="_blank">GitHub</a>
                <a class="btn" href="${demoUrl}" target="_blank">Demo</a>
            </div>
        `;
        container.appendChild(card);
    });
}

carregarPerfil();
carregarProjetos();