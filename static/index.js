const habilidadesUL = $('#habilidadesList')
const projetosUL = $('#projetosList')

let toggle = ''

naoHaNadaProjetos(-1)

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
            <li class="bg-gradient-to-b from-zinc-200 to-orange-200 hover:bg-gradient-to-br rounded-md  p-2"><div>
                <img src="static/images/thumbs/${projeto.thumb}" class="mx-auto"></img>
                <p class="text-blue-600 text-center font-semibold"><a href="${projeto.url}" target="_blank">${projeto.nome}</a></p>
                <p class="text-justify">${projeto.descricao}</p>
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
    let hidden = 0

    $.each(projetosUL.children().toArray(), function (i, projeto) {
        $(projeto).removeClass('hidden')
        
        if (sentido !== 'invertido') {
            if (! $(projeto).hasClass(habilidade)) {
                $(projeto).addClass('hidden')
                hidden++
            }
            toggle = habilidade
        } else {
            toggle = ''
        }
    })
    naoHaNadaProjetos(hidden)
}

function naoHaNadaProjetos (hidden) {
    // console.log(projetosUL.children().length)
    if (projetosUL.children().length === hidden) {
        $('#naoHaNadaProjetos').removeClass('hidden')
    } else {
        $('#naoHaNadaProjetos').addClass('hidden')
    }
}