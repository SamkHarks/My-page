import { getStyle } from "./utils";

test('Should return 10px', () => {
    document.documentElement.style.setProperty('--spacing-XS', '10px');
    const value = getStyle('--spacing-XS').trim();
    expect(value).toMatchInlineSnapshot(`"10px"`);
});
