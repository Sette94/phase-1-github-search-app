
const githubFormContainer = document.getElementById("github-form")
const gitInfoContainer = document.getElementById("user-list")
const gitRepoContainer = document.getElementById("repos-list")


const gitHubUrl = "https://api.github.com/search/users?q="

githubFormContainer.addEventListener("submit", (e) => {
    // debugger
    e.preventDefault()
    console.log(e.target.search.value)
    userSearch(e.target.search.value)




})

function userSearch(username) {
    fetch(gitHubUrl + username)
        .then(res => res.json())
        .then(data => {
            renderUser(data.items[0])

        })

}

function renderUser(obj) {

    let username = obj.login
    let userurl = obj.html_url
    let avatarurl = obj.avatar_url

    let h2Name = document.createElement('h2')

    let linktoProfile = document.createElement('a')
    linktoProfile.href = userurl
    linktoProfile.target = '_blank';

    linktoProfile.textContent = username
    h2Name.appendChild(linktoProfile)

    let img = document.createElement('img')
    img.src = avatarurl

    gitInfoContainer.appendChild(h2Name)
    gitInfoContainer.appendChild(img)

    fetch(obj.repos_url)
        .then(res => res.json())
        .then(data => {
            data.forEach(repos => {
                let li = document.createElement('li')

                let linktoRepo = document.createElement('a')
                linktoRepo.href = repos.html_url
                linktoRepo.target = '_blank';

                linktoRepo.textContent = repos.name

                li.appendChild(linktoRepo)
                gitRepoContainer.appendChild(li)
                gitInfoContainer.appendChild(gitRepoContainer)


            })

        })






}