document.addEventListener('DOMContentLoaded', function() {
  const iframe = document.getElementById("iframe");
  if (!iframe) return console.warn('No iFrame with ID of "iframe"')

  window.addEventListener('message', (e) => {
    const messageType = e.data.type;

    switch (messageType) {
      case "resize":
        iframe.style.minHeight = `${e.data.data.height + 50}px`;
        break;
      case "location":
        window.scroll(0, iframe.offsetTop);
        break;
      case "settings":
        if (e.data.data.state === "initial") {
          setInitialSettings(iframe, e.data);
        }
    }
  });

  const setInitialSettings = (
    iframe,
    e
  ) => {
    const background = iframe.getAttribute("data-background-color");
    if (background) {
      const message = {
        type: "background",
        data: {
          background,
        },
      };
      iframe.contentWindow.postMessage(message, "*");
    }

    if (e.data.height) {
      iframe.style.minHeight = `${e.data.height + 50}px`;
    }
  };
});