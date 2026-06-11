async function loadBlocklist() {
    const response = await fetch(
        browser.runtime.getURL("blocklist.txt")
    );

    const domains = (await response.text())
        .split("\n")
        .map(x => x.trim())
        .filter(x => x && !x.startsWith("#"));

    const rules = domains.map((domain, index) => ({
        id: index + 1,
        priority: 1,
        action: {
            type: "block"
        },
        condition: {
            urlFilter: `||${domain}^`,
            resourceTypes: [
                "main_frame",
                "sub_frame",
                "script",
                "image",
                "xmlhttprequest"
            ]
        }
    }));

    const existingRules =
        await browser.declarativeNetRequest.getDynamicRules();

    await browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRules.map(r => r.id),
        addRules: rules
    });

    console.log(`Loaded ${rules.length} blocking rules`);
}

loadBlocklist();