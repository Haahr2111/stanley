


let Youtube = {
 getIdFromUrl:function (videoIdorUrl) {
if (videoIdorUrl.indexOf('http')==0){
    return videoIdorUrl.split('v=')[1];
} else {
    return videoIdorUrl;
}
 },

    generateEmbedUrl:function (videoIdorUrl) {
return 'https://www.youtube.com/embed/'+Youtube.getIdFromUrl(videoIdorUrl);
    }
};


let movies =
    [
        {

            "Title":"Paths of Glory",
            "YoutubeID":"nmDA60X-f_A"
        },
        {
            "Title":"Dr.Strangelove",
            "YoutubeID":"x9MrPP-KisQ"
        },
        {
            "Title":"A Clockwork Orange",
            "YoutubeID":"brDo5yRY6-0"
        },
        {
            "Title":"The Shining",
            "YoutubeID":"S014oGZiSdI"

        },
        {
            "Title":"Full Metal Jacket",
            "YoutubeID":"Ks_MbPPkhmA"
        }
    ];

//finding object film
const app = document.getElementById('film');

//creating a container element
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

movies.forEach( movie => {


//the url is our endpoint and contains the data that we want to work with

let url ='http://www.omdbapi.com/?t='+movie.Title+'&apikey=50f7f345';

let proxyUrl = 'https://cors-anywhere.herokuapp.com/';


    fetch(proxyUrl+url)
    //when the promise is resolved we extract the JSON part of the response object
        .then(response => {
            return response.json();})
        .then(data =>{

            console.log('data',+data);

const card = document.createElement('div');
card.setAttribute('class','box')

const h2 = document.createElement('h2');
h2.setAttribute('class','movieTitle')
h2.textContent = movie.Title;

const youtube = document.createElement('iframe');
youtube.setAttribute('src', Youtube.generateEmbedUrl(movie.YoutubeID));





            const p = document.createElement('p');
p.setAttribute('class','moviePlot')
p.textContent = data.Plot;

const rateM = document.createElement('p');
rateM.setAttribute('class','meta')
rateM.textContent = 'Metascore: ' +data.Metascore;

const rateImb = document.createElement('p');
rateImb.setAttribute('class','Imb')
rateImb.textContent = 'imdb-Rating: '+data.imdbRating;

const age = document.createElement('p');
let date = new Date();
let year = date.getFullYear();
let HowOld = year - data.Year;
age.textContent = 'Age: '+HowOld+' years';


card.appendChild(h2);
card.appendChild(youtube);
card.appendChild(p);
card.appendChild(age);
card.appendChild(rateM);
card.appendChild(rateImb);

container.appendChild(card);

        })
        .catch(err => {
                // Do something for an error here
                const errorMessage = document.createElement('mistake');
                errorMessage.textContent = `dude...you messed up somewhere!`;
                app.appendChild(errorMessage);
            }

        )
});

