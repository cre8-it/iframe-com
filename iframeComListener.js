document.addEventListener('DOMContentLoaded', function() {
  const iframe = document.getElementById("iframe");
  if (!iframe) return console.warn('No iFrame with ID of "iframe"')

  window.addEventListener('message', (e) => {
    const messageType = e.data.type;

    switch (messageType) {
      case "resize":
        iframe.style.minHeight = `${e.data.data.height}px`;
        break;
      case "location":
        window.scroll(0, iframe.offsetTop);
        break;
      case "redirect":
        const redirectUrl = e.data.redirectUrl;
        if (!redirectUrl) {
          break;
        }
        window.location.replace(redirectUrl)
        break;
      case "scrollToTop":
        window.scrollTo({ top: 0, behavior: "smooth" });
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
      iframe.style.minHeight = `${e.data.height}px`;
    }

    iframe.style.width = '100%';
    iframe.style.border = '0';
    iframe.style.lineHeight = '1';
    iframe.style.margin = '0';
  };
});
