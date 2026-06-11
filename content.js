const adSelectors = [
  '.ad-slot',
  '.advertising',
  '#banner-ad',
  '[id^="div-gpt-ad"]',
  '.sponsored-post'
];

function hideAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.display = 'none';
    });
  });
}

hideAds();

const observer = new MutationObserver(hideAds);
observer.observe(document.body, { childList: true, subtree: true });