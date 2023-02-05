# 📡 speedtest-result-scraper

Simple module to get information from a [speedtest.com](https://speedtest.net) result ID by using web scraping.

# Usage

1. First, import the module:

    ```js
    // Using CommonJS
    const { scraper } = require("speedtest-result-scraper").default;

    // Using TypeScript or ESM
    import { scraper } from "speedtest-result-scraper";
    ```

2. Then, you just have to call it directly by passing the result ID as a number or string to get the information:

    ```js
    // Using promises
    scraper(14311127665).then(result => console.log(result));

    // Using async/await
    const result = await scraper(14311127665);
    console.log(result);

    // Expected
    {
        date: 1675633163,
        id: '14311127665',
        connection_icon: 'wireless',
        download: 2695,
        upload: 2732,
        latency: 33,
        distance: 0,
        country_code: 'VE',
        server_id: 49826,
        server_name: 'Cúa',
        sponsor_name: 'Wifitelrva',
        sponsor_url: null,
        connection_mode: 'multi',
        isp_name: 'MDS Telecom',
        isp_rating: '3.5',
        test_rank: 88,
        test_grade: 'A',
        test_rating: 5,
        idle_latency: '60',
        download_latency: '56',
        upload_latency: '56',
        additional_servers: [
            {
                server_id: 54037,
                server_name: 'Maturín',
                sponsor_name: 'Star Team'
            },
            {
                server_id: 29540,
                server_name: 'Maturin',
                sponsor_name: 'CiX!'
            },
            {
                server_id: 40217,
                server_name: 'Barcelona',
                sponsor_name: 'Inter - Corporacion Telemic'
            }
        ],
        path: 'result/14311127665',
        hasSecondary: true
    }
    ```

# API

```ts
scrape(resultId: string | number) => Promise<SpeedtestResultData | null>

interface SpeedtestResultData {
    additional_servers: {
        server_id: number,
        server_name: string,
        sponsor_name: string
    }[],
    connection_icon: string,
    connection_mode: string,
    country_code: string,
    date: number,
    distance: number,
    download: number,
    download_latency?: string,
    hasSecondary: boolean,
    id: string,
    idle_latency?: string,
    isp_name: string,
    isp_rating: string,
    latency: number,
    path: string,
    server_id: number,
    server_name: string,
    sponsor_name: string,
    sponsor_url: string | null,
    test_grade: string,
    test_rank: number,
    test_rating: number,
    upload: number,
    upload_latency?: string
}
```

Get all of the information of a result ID from **speedtest.com**, using web scraping. Returns a **Promise** with the result, or **null** if it was not found.

Notes:

-   The properties `download` and `upload` are in kilobytes.
-   The properties `download_latency`, `upload_latency` and `idle_latency` are optional because old tests only had the property `latency` (this property is still present on recent tests anyways).
