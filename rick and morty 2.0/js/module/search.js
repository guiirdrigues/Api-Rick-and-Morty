document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const cardProdutos = document.getElementById('cardProdutos');
    const apiUrl = 'https://rickandmortyapi.com/api/character'; // URL base para todos os personagens

    function debounce(fn, delay) {
        let timeoutId = null;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function fetchCharacters(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayCharacters(data.results);
                if (data.info) {
                    updatePaginationControls(data.info);
                }
            })
            .catch(error => console.error('Erro ao buscar personagens:', error));
    }

    function displayCharacters(characters) {
        cardProdutos.innerHTML = '';
        characters.forEach(character => {
            const div = document.createElement('div');
            div.className = 'personagem';
            div.innerHTML = `<img src="${character.image}" alt="${character.name}">
                             <p><strong>${character.name}</strong></p>
                             <p>Status: ${character.status}</p>
                             <p>Espécie: ${character.species}</p>`;
            cardProdutos.appendChild(div);
        });
    }

    function updatePaginationControls(info) {
        document.getElementById('currentPage').textContent = info.page;
        document.getElementById('prevPage').disabled = !info.prev;
        document.getElementById('nextPage').disabled = !info.next;
    }

    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length === 0) {
            // Se a barra de pesquisa está vazia, carrega todos os personagens novamente
            fetchCharacters(`${apiUrl}?page=1`);
            return;
        }
        fetchCharacters(`${apiUrl}?name=${encodeURIComponent(searchTerm)}`);
    }

    searchInput.addEventListener('input', debounce(handleSearch, 300)); // Debounce para otimizar a chamada ao digitar
    searchButton.addEventListener('click', handleSearch);

    // Carregar todos os personagens inicialmente
    fetchCharacters(`${apiUrl}?page=1`);
});



