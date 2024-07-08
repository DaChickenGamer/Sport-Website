const topHeadlinesDisplay = document.getElementById('top-headlines');
const sports = ["basketball", "football", "hockey", "baseball"];
const leagues = ["nba", "nfl", "nhl", "mlb"];

async function generateHeadlines() {
    let headlines = [];

    const fetchPromises = sports.map(async function(sport, index) {
        const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${leagues[index]}/news`);
        const data = await response.json();
        data.articles.forEach(function(article) {
            headlines.push(article.description);
        });
    });

    await Promise.all(fetchPromises);

    return headlines;
}

function displayHeadlines(headlines) {
    headlines.forEach(function(headline) {
        const headlineContainer = document.createElement('div')
        const headlineElement = document.createElement('p');
        headlineElement.textContent = headline;
        headlineContainer.appendChild(headlineElement);
        headlineElement.setAttribute('id', 'headline')
        const line = document.createElement("hr")
        headlineContainer.appendChild(line);
        topHeadlinesDisplay.appendChild(headlineContainer)
    });
}

generateHeadlines().then(function(headlines) {
    displayHeadlines(headlines);
}).catch(function(error) {
    console.error('Error fetching headlines:', error);
});
