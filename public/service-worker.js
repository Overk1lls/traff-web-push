addEventListener('push', (event) => {
  const data = event.data.json();

  registration.showNotification(data.title, {
    body: data.message,
  });
});
