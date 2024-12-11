const url = 'https://api.github.com/users/bpn333/repos';
const projectContainer = document.getElementById('projects');
const skillsContainer = document.getElementById('skills');
fetch(url)
    .then(response => response.json())
    .then(repos => {
        let languageCounts = {};
        repos.sort((a, b) => a.name.length - b.name.length).forEach(repo => {
            const link = document.createElement('a');
            link.href = repo.svn_url;
            link.className = 'proje';

            const title = document.createElement('h3');
            title.textContent = repo.name;

            link.appendChild(title);
            projectContainer.appendChild(link);

            const repoLanguage = repo.language || "Unknown";
            if (!languageCounts[repoLanguage]) {
                languageCounts[repoLanguage] = 1;
            } else {
                languageCounts[repoLanguage] += 1;
            }
        });
        setSkills(languageCounts);
    });

function getIconClass(language) {
    const iconMap = {
        'C': 'bx bx-code-curly',
        'C++': 'bx bxl-c-plus-plus',
        'Python': 'bx bxl-python',
        'JavaScript': 'bx bxl-javascript',
        'HTML': 'bx bxl-html5',
        'CSS': 'bx bxl-css3',
        'Shell': 'bx bx-terminal',
        'Java': 'bx bxl-java',
        'PHP': 'bx bxl-php',
        'Go': 'bx bxl-go-lang',
        'TypeScript': 'bx bxl-typescript',
        'Node.js': 'bx bxl-nodejs',
        'Unknown': 'bx bx-question-mark',
    };
    return iconMap[language] || 'bx bx-code';
}

function setSkills(languageData) {
    const totalCount = Object.values(languageData).reduce((sum, count) => sum + count, 0);
    for (const [language, count] of Object.entries(languageData)) {
        const percentage = Math.round((count / totalCount) * 100);

        const skillDiv = document.createElement('div');
        skillDiv.className = 'sk';
        skillDiv.title = `${language}: ${percentage}%`;
        const icon = document.createElement('i');
        icon.className = getIconClass(language);
        const progress = document.createElement('progress');
        progress.max = 100;
        progress.value = percentage;

        skillDiv.appendChild(icon);
        skillDiv.appendChild(progress);
        skillsContainer.appendChild(skillDiv);
    }
}
