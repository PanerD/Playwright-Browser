document.getElementById('openUrl').addEventListener('click', () => {
    let url = document.getElementById('urlInput').value.trim();
    const userAgent = document.getElementById('userAgentInput').value.trim();
    const locale = document.getElementById('localeInput').value.trim();
    const timezone = document.getElementById('timezoneInput').value.trim();

    let finalUrl = url || "https://www.google.com";
    const finalUserAgent = userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"; // Specify your own default User-Agent if needed
    const finalLocale = locale || "en-US,en";
    const finalTimezone = timezone || "Europe/Berlin";

    // Check if the URL starts with "http://" or "https://", prepend "https://" if not.
    if (!finalUrl.match(/^[a-zA-Z]+:\/\//)) {
        finalUrl = "https://" + finalUrl;
    }

    window.electronAPI.runPlaywright(finalUrl, finalUserAgent, finalLocale, finalTimezone)
        .then(result => console.log("Navigated to " + finalUrl))
        .catch(err => console.error(err));
});