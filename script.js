url = 'https://api.github.com/users/bpn333/repos'
container = document.getElementById('projects')
fetch(url).then(r => r.json()).then(datas =>{
    datas.forEach(repo =>{
        lin = document.createElement('a');
        lin.href = repo.svn_url
        lin.className = 'proje'
        tit = document.createElement('h3')
        tit.textContent = repo.name
        lin.appendChild(tit)
        container.appendChild(lin)
    })
})
