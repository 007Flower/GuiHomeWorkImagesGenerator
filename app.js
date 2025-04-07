const fetchBtn = document.getElementById('fetchBtn');
const imageContainer = document.getElementById('imageContainer');
const greetingElement = document.getElementById('greeting');

// API keys
const imageApiKey = 'sZPdNy5wSGnffudbele9zEz22qVuB76ZEsLRhQ5aURFLay3OpA5ibuwt';
const quoteApiKey = 'FzxVeA6XxllQjm/n7yUe6A==IQGmVUqpdlx8lBkQ';

fetchBtn.addEventListener('click', () => {
    const query = 'cool wallpaper';
    const imageApiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`;
    const quoteApiUrl = 'https://api.api-ninjas.com/v1/quotes?';

    const fetchQuotePromise = fetch(quoteApiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': quoteApiKey
        }
    });

    const fetchImagePromise = fetch(imageApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': imageApiKey
        }
    });

    Promise.all([fetchQuotePromise, fetchImagePromise])
        .then(responses => {
            const [quoteRes, imageRes] = responses;
            if (!quoteRes.ok) throw new Error(`Quote API error! Status: ${quoteRes.status}`);
            if (!imageRes.ok) throw new Error(`Image API error! Status: ${imageRes.status}`);
            return Promise.all([quoteRes.json(), imageRes.json()]);
        })
        .then(([quoteData, imageData]) => {
            // Handle quote
            if (quoteData && quoteData.length > 0) {
                greetingElement.textContent = `"${quoteData[0].quote}" — ${quoteData[0].author}`;
            } else {
                throw new Error("No quotes found.");
            }

            // Handle image
            if (imageData.photos.length > 0) {
                const randomIndex = Math.floor(Math.random() * imageData.photos.length);
                const imageUrl = imageData.photos[randomIndex].src.large;

                imageContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.width = '300px';
                img.style.borderRadius = '10px';
                img.alt = 'Cool Wallpaper';

                imageContainer.appendChild(img);
            } else {
                throw new Error("No images found.");
            }
        })
        .catch(error => {
            console.error('Error:', error);

            if (error.message.includes('Quote')) {
                greetingElement.textContent = 'Failed to load greeting. Please try again later.';
            }

            if (error.message.includes('Image')) {
                imageContainer.innerHTML = '<p style="color:red;">Failed to fetch image. Please try again later.</p>';
            }
        });
});
