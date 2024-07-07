const habilidadesUL = $('#habilidadesList')
const projetosUL = $('#projetosList')

$.getJSON('static/data.json', function (data) {
    habilidadesUL.empty()
    $.each(data.habilidades, function (index, habilidade) {
        habilidadesUL.append(`
            <li class="my-2"><img src="static/images/icons/${habilidade}_256.webp" class="w-12 hover:w-16"></img></li>
        `)
    })

    projetosUL.empty()
    $.each(data.projetos, function (index, projeto) {
        projetosUL.append(`
            <li><div>
                <p class="text-blue-600"><a href="${projeto.url}" target="_blank">${projeto.nome}</a></p>
                <p>${projeto.descricao}</p>
                <ul id="projeto-${index}-habilidades" class="flex justify-center items-center space-x-1  my-2 min-h-24">
                </ul>
            </div></li>
        `)


        $.each(projeto.habilidades, function (i, habilidade) {

            $('#projeto-' + index + '-habilidades').append(`
                <li><img src="static/images/icons/${habilidade}_256.webp" class="w-8 hover:w-10"></img></li>    
            `)
        })
    })
})