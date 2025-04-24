document.getElementById("btnAdicionar").addEventListener("click", adicionarTarefa);

document.getElementById('inputTarefa').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
})

let tarefas = [];

function adicionarTarefa() {
    const inputTarefa = document.getElementById('inputTarefa');
    let tarefa = inputTarefa.value.trim();

    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = '';
    
    if(tarefa == '') {
        mensagem.textContent = 'Por favor, digite uma tarefa!';
    } else {
        tarefas.push(tarefa);
        inputTarefa.value = '';
        renderizarLista();
    }
}

function renderizarLista() {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = ''; // Limpa a lista antes de renderizar novamente

    for (let i = 0; i < tarefas.length; i++) {
        let novaTarefa = document.createElement('li');

        let label = document.createElement('label');
        label.classList.add('checkbox-container');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        let checkmark = document.createElement('span');
        checkmark.classList.add('checkmark');

        let textoTarefa = document.createElement('span');
        textoTarefa.classList.add('texto-tarefa');
        textoTarefa.textContent = tarefas[i];

        let btnEditar = document.createElement('button');
        btnEditar.innerHTML = '&#x270F;&#xFE0F;';
        btnEditar.classList.add('btnEditar');

        let btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = '&#x274C;';
        btnExcluir.classList.add('btnExcluir');

        // Evento para excluir a tarefa
        btnExcluir.addEventListener('click', function() {
            tarefas.splice(i, 1); // remove do array
            renderizarLista(); // atualiza a lista
        });

        // Evento para editar a tarefa
        btnEditar.addEventListener('click', function() {
            let inputEdicao = document.createElement('input');
            inputEdicao.type = 'text';
            inputEdicao.value = textoTarefa.textContent;
            inputEdicao.id = 'inputEdicao';

            // Esconder os botões enquanto edita
            btnEditar.style.display = "none";
            btnExcluir.style.display = "none";

            label.replaceChild(inputEdicao, textoTarefa);
            inputEdicao.focus();

            inputEdicao.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    salvarEdicao();
                }
            });

            inputEdicao.addEventListener('blur', salvarEdicao);

            function salvarEdicao() {
                let novoTexto = inputEdicao.value.trim();
                if (novoTexto !== '') {
                    tarefas[i] = novoTexto;
                }
                renderizarLista(); // atualiza a lista toda
            }
        });

        label.append(checkbox, checkmark, textoTarefa, btnEditar, btnExcluir);
        novaTarefa.appendChild(label);
        listaTarefas.appendChild(novaTarefa);
    }
}
