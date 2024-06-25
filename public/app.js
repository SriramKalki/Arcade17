document.getElementById('urlForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const originalUrl = document.getElementById('originalUrl').value;
  
    const response = await fetch('/url/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      document.getElementById('shortenedUrl').textContent = `${window.location.origin}/url/${result.shortUrl}`;
      document.getElementById('result').classList.remove('hidden');
    } else {
      alert(result);
    }
  });
  