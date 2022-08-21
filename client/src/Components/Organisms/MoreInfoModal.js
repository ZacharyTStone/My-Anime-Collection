

const MoreInfoModal = ({ anime }) => {
    
    console.log("anime prop",anime);

    // 1st find the anime id using the English anime title
   const findIDQuery = `
    query {
        Page(page: 1, perPage: 1) {
            media(search: ${anime.title}) {
                id
            }
        }
    }
    `;

    // 2nd if that doesn't work, find the anime id using the Japanese anime title

    const findIDQuery2 = `
    query {
        Page(page: 1, perPage: 1) {
            media(search: ${anime.title}) {
                id
            }
        }
    }
     
    `;

    /* 3rd if that doesn't work, set notFound to true and display an error message
    or if the anime is found set all the anime info and begin looking up sub queries
    */


// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: findIDQuery,
           
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

    return (
        null)
}

export default MoreInfoModal;
