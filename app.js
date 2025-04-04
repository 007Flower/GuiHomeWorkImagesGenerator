const fetchBtn = document.getElementById('fetchBtn');
const imageContainer = document.getElementById('imageContainer');
const greetingElement = document.getElementById('greeting');

// Your API keys
const imageApiKey = 'sZPdNy5wSGnffudbele9zEz22qVuB76ZEsLRhQ5aURFLay3OpA5ibuwt'; // Replace with your actual Pexels API key
const quoteApiKey = 'FzxVeA6XxllQjm/n7yUe6A==IQGmVUqpdlx8lBkQ'; // Your Quote API key

fetchBtn.addEventListener('click', () => {
    const query = 'cool wallpaper';  
    const imageApiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`; // Fetch 5 images
    const quoteApiUrl = 'https://api.api-ninjas.com/v1/quotes?'; // Fetch a random inspiring quote

    // Fetch a random quote for greeting
    fetch(quoteApiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': quoteApiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Quote API error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.length > 0) {
            // Set the greeting as the quote
            greetingElement.textContent = `"${data[0].quote}" — ${data[0].author}`;
        } else {
            throw new Error("No quotes found.");
        }
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
        greetingElement.textContent = 'Failed to load greeting. Please try again later.';
    });

    // Fetch images from Pexels API
    fetch(imageApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': imageApiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Image API error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.photos.length > 0) {
            // Pick a random image from the fetched results
            const randomIndex = Math.floor(Math.random() * data.photos.length);
            const imageUrl = data.photos[randomIndex].src.large;  

            // Clear previous content and display only one image
            imageContainer.innerHTML = ''; 
            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '300px';  // Adjust size as needed
            img.style.borderRadius = '10px';
            img.alt = 'Cool Wallpaper';
            
            imageContainer.appendChild(img);
        } else {
            throw new Error("No images found.");
        }
    })
    .catch(error => {
        console.error('Error fetching image:', error);
        imageContainer.innerHTML = '<p style="color:red;">Failed to fetch image. Please try again later.</p>';
    });
});
