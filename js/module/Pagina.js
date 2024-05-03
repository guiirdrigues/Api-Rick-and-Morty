document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const apiUrl = 'https://rickandmortyapi.com/api/character';

    function fetchCharacters(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayCharacters(data.results);
                updatePaginationControls(data.info);
            })
            .catch(error => console.error('Erro ao buscar personagens:', error));
    }

    function displayCharacters(characters) {
        const container = document.getElementById('cardProdutos');
        container.innerHTML = '';
        characters.forEach(character => {
            const div = document.createElement('div');
            div.className = 'personagem';
            div.innerHTML = `<img src="${character.image}" alt="${character.name}">
                             <p><strong>${character.name}</strong></p>
                             <p>Status: ${character.status}</p>
                             <p>Espécie: ${character.species}</p>`;
            container.appendChild(div);
        });
    }

    function updatePaginationControls(info) {
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('prevPage').disabled = !info.prev;
        document.getElementById('nextPage').disabled = !info.next;
    }

    function handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const filterUrl = `${apiUrl}?name=${encodeURIComponent(searchInput.value.trim())}`;
        fetchCharacters(filterUrl);
    }

    document.getElementById('searchButton').addEventListener('click', handleSearch);
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchCharacters(`${apiUrl}?page=${currentPage}`);
        }
    });
    document.getElementById('nextPage').addEventListener('click', () => {
        currentPage++;
        fetchCharacters(`${apiUrl}?page=${currentPage}`);
    });

    fetchCharacters(`${apiUrl}?page=1`);
});
