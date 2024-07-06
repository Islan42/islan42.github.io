const habilidadesUL = $('#habilidadesList')
const projetosUL = $('#projetosList')

$.getJSON('static/data.json', function (data) {
    habilidadesUL.empty()
    $.each(data.habilidades, function (index, habilidade) {
        habilidadesUL.append(`
            <li><img src="static/images/icons/${habilidade}" class="w-12"></img></li>
        `)
    })

    projetosUL.empty()
    $.each(data.projetos, function (index, projeto) {
        projetosUL.append(`
            <li><div>
                <p class="text-blue-600"><a href="${projeto.url}" target="_blank">${projeto.nome}</a></p> <p>${projeto.descricao}</p>
            </div></li>
        `)
    })
})