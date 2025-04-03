document.getElementById("btnAdicionar").addEventListener("click", adicionarTarefa);

document.getElementById('inputTarefa').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
})

function adicionarTarefa() {
    const inputTarefa = document.getElementById('inputTarefa')
    let tarefa = inputTarefa.value.trim()

    const mensagem = document.getElementById('mensagem')
    mensagem.textContent = ''
    
    if(tarefa == '') {
        mensagem.textContent = 'Por favor, digite uma tarefa!'
    } else {
        const listaTarefas = document.getElementById('listaTarefas')
        let novaTarefa = document.createElement('li')

        let label = document.createElement('label')
        label.classList.add('checkbox-container')

        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'

        let checkmark = document.createElement('span')
        checkmark.classList.add('checkmark')

        let textoTarefa = document.createElement('span')
        textoTarefa.classList.add('texto-tarefa')
        textoTarefa.textContent = tarefa

        let btnEditar = document.createElement('button')
        btnEditar.innerHTML = '&#x270F;&#xFE0F;'
        btnEditar.classList.add('btnEditar')

        let btnExcluir = document.createElement('button')
        btnExcluir.innerHTML = '&#x274C;'
        btnExcluir.classList.add('btnExcluir')

        // Evento para excluir a tarefa
        btnExcluir.addEventListener('click', function() {
            novaTarefa.remove();
        });

        // Evento para editar a tarefa
        btnEditar.addEventListener('click', function() {
            let inputEdicao = document.createElement('input');
            inputEdicao.type = 'text';
            inputEdicao.value = textoTarefa.textContent;
            inputEdicao.id = 'inputEdicao'

            // Esconder os botões enquanto edita
            btnEditar.style.display = "none";
            btnExcluir.style.display = "none";

            // Substituir o texto pelo input
            label.replaceChild(inputEdicao, textoTarefa);
            inputEdicao.focus();

            // Salvar edição ao pressionar "Enter" ou sair do campo
            inputEdicao.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    salvarEdicao();
                }
            });

            inputEdicao.addEventListener('blur', salvarEdicao);

            function salvarEdicao() {
                let novoTexto = inputEdicao.value.trim();
                if (novoTexto !== '') {
                    textoTarefa.textContent = novoTexto;
                }
                label.replaceChild(textoTarefa, inputEdicao);

                // Mostrar os botões novamente
                btnEditar.style.display = "inline-block";
                btnExcluir.style.display = "inline-block";
            }
        });

        label.append(checkbox, checkmark, textoTarefa, btnEditar, btnExcluir);
        novaTarefa.appendChild(label);
        listaTarefas.appendChild(novaTarefa);
    }
    inputTarefa.value = '';
}