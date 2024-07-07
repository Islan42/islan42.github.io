const habilidadesUL = $('#habilidadesList')
const projetosUL = $('#projetosList')

let toggle = ''

$.getJSON('static/data.json', function (data) {
    habilidadesUL.empty()
    $.each(data.habilidades, function (index, habilidade) {
        const habilidadeObjeto = $(`
            <li><img src="static/images/icons/${habilidade}_256.webp" class="w-12 hover:w-16"></img></li>
        `)
        
        habilidadesUL.append(habilidadeObjeto)
        
        habilidadeObjeto.on('click', function (event) {
            if (toggle !== habilidade) {
                filtrarPorHabilidade(habilidade)
            } else {
                filtrarPorHabilidade(habilidade, 'invertido')
            }
        })
    })

    projetosUL.empty()
    $.each(data.projetos, function (index, projeto) {
        const projetoObjeto = $(`
            <li><div>
                <p class="text-blue-600"><a href="${projeto.url}" target="_blank">${projeto.nome}</a></p>
                <p>${projeto.descricao}</p>
                <ul id="projeto-${index}-habilidades" class="flex justify-center items-center space-x-1  my-2 min-h-24">
                </ul>
            </div></li>
        `)
        projetosUL.append(projetoObjeto)
        projetoObjeto.addClass(projeto.habilidades)

        $.each(projeto.habilidades, function (i, habilidade) {
            $('#projeto-' + index + '-habilidades').append(`
                <li><img src="static/images/icons/${habilidade}_256.webp" class="w-8 hover:w-10"></img></li>    
            `)
        })
    })
})

function filtrarPorHabilidade(habilidade, sentido = '') {
    $.each(projetosUL.children().toArray(), function (i, projeto) {
        $(projeto).removeClass('hidden')
        
        if (sentido !== 'invertido') {
            if (! $(projeto).hasClass(habilidade)) {
                $(projeto).addClass('hidden')
            }
            toggle = habilidade
        } else {
            toggle = ''
        }
    })
}