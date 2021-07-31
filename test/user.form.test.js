test('sample test doing math', () => {
    expect(1+2).toBe(3);
});

test("plainText", () => {
    expect(plainText("really plain")).toBe({
        "type": "plain_text",
        "text": "really plain",
        "emoji": true
    });
});

test("no q's", () => {
    expect(formJson("EMPTY", [])).toBe({
        "type": "heading",
        "text": plainText("EMPTY")
    });
});