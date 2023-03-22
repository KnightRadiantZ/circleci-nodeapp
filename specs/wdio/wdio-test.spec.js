const TEXT1 = `Hello Mars! ${new Date()}`;
const TEXT2 = `Hello Universe! ${new Date()}`;

describe('Electron app tests', () => {
    it('As a user: Test I can launch app and verify app is visible', async () => {
        await browser.$('h1').isDisplayed();
        const text1 = await browser.$('[data-qa="title"]').getText();
        expect(text1).toContain('Hello World!');
    })

    it('As a user: Test I can type text into input and verify displayed text', async () => {
        const textInput = await browser.$('[data-qa="textInput"]')
        await textInput.isDisplayed();
        await textInput.setValue(TEXT1);
        await browser.$('[data-qa="displayTextButton"]').click();

        const displayedText = await browser.$('#displayDiv');
        await displayedText.isDisplayed();
        const text2 = await displayedText.getText();
        expect(text2).toContain(TEXT1);
    })
    
    it('As a user: Test I can clear, re-type text input and verify a different displayed text', async () => {
        const textInput = await browser.$('[data-qa="textInput"]')
        await textInput.clearValue();
        await browser.$('[data-qa="displayTextButton"]').click();
        const displayedText = await browser.$('#displayDiv');
        const text1 = await displayedText.getText();
        expect(text1).not.toContain(TEXT1);

        await textInput.setValue(TEXT2);
        await browser.$('[data-qa="displayTextButton"]').click();
        const text2 = await displayedText.getText();
        expect(text2).toContain(TEXT2);
    })
    
    it.skip('should display the correct title', async () => {
        // TODO: missing config to auto complete or auto link methods
        await browser.url('https://app.slack.com/client/T016TPDB2HM');
        const signinButton = await browser.$('[data-qa="ssb-signin-btn"]');
        await expect(signinButton).toBeDisplayed();

        await signinButton.click();
        await browser.pause(15000);
    });
});