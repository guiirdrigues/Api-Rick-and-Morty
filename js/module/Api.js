// URL da API para todos os personagens
const apiUrlAllCharacters = 'https://rickandmortyapi.com/api/character';
// URL da API para personagens filtrados por nome e status
const apiUrlFilteredCharacters = 'https://rickandmortyapi.com/api/character/?name=rick&status=alive';

// Função para obter todos os personagens
async function getAllCharacters(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const characters = data.results;

        const cardProdutos = document.getElementById('cardProdutos');

        characters.forEach(character => {
            const divPersonagem = document.createElement('div');
            divPersonagem.classList.add('personagem');

            const img = document.createElement('img');
            img.src = character.image;

            const pNome = document.createElement('p');
            pNome.textContent = character.name;

            const pStatus = document.createElement('p');
            pStatus.textContent = `Status: ${character.status}`;

            const pSpecies = document.createElement('p');
            pSpecies.textContent = `Species: ${character.species}`;

            divPersonagem.appendChild(img);
            divPersonagem.appendChild(pNome);
            divPersonagem.appendChild(pStatus);
            divPersonagem.appendChild(pSpecies);
            cardProdutos.appendChild(divPersonagem);  
        });
    } catch (error) {
        console.error('Erro ao obter os personagens:', error);
    }
}

// Chama a função para carregar todos os personagens quando a página carregar
window.addEventListener('load', function() {
    getAllCharacters(apiUrlAllCharacters);
    getAllCharacters(apiUrlFilteredCharacters);
});
