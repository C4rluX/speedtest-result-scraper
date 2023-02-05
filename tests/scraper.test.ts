import { scrape } from "../src/index";

test("error when providing string that contains characters that are not numbers", async () => {
    try {
        await scrape("abc123");
    } catch (err: any) {
        expect(err.toString()).toMatch("You can only pass a string contained by just numbers")
    }
});

test("get null when the result id doesn't exists", async () => {
    const data = await scrape(new Array(100).fill("9").join(""));
    expect(data).toBeNull();
});

test("get a result information with download_latency, upload_latency and idle_latency", async () => {
    const keys = Object.keys(await scrape("14311127665") ?? {});
    expect(
        keys.includes("download_latency") &&
        keys.includes("idle_latency") &&
        keys.includes("upload_latency")
    ).toBeTruthy();
});

test("get a result information without download_latency, upload_latency and idle_latency", async () => {
    const keys = Object.keys(await scrape("13122459704") ?? {});
    expect(
        !keys.includes("download_latency") &&
        !keys.includes("idle_latency") &&
        !keys.includes("upload_latency")
    ).toBeTruthy();
});