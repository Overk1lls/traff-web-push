if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');

  document.getElementById('subscribe').onclick = () => {
    Notification
      .requestPermission()
      .then(
        () => navigator.serviceWorker.ready.then(
          (reg) => reg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array('BHjIuw1hHO4cLxDgShEkOCGSoongQaSI6UEVmEaRdVt_QGtHD8Sod8Ag2VMXGIMjFxNiGwRE7Q3MKwT0Iuc0cXM'),
            })
            .then((sub) => {
              console.log(sub);

              fetch('/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sub),
              });
            }),
        ),
      );
  };

  document.getElementById('send-campaign').onclick = () => {
    fetch('campaign/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Web Push Alert',
        message: 'This is a test campaign!',
      }),
    });
  };
} else {
  console.log('ServiceWorker is not enabled!');
}
