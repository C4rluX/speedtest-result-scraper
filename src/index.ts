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

/**
 * Get all of the information of a result ID from speedtest.com, using web scraping
 * @param {string} resultId The result ID from where you want to get information
 * @returns {Promise<SpeedtestResultData | null>} The information on succeed, or null if the result ID was not found
*/
async function scrape(resultId: string | number): Promise<SpeedtestResultData | null> {
    if (
        typeof resultId == "string" &&
        resultId.length !== resultId.match(/\d/g)?.length
    ) throw new Error("You can only pass a string contained by just numbers");
    const body = await (await fetch(`https://www.speedtest.net/result/${encodeURIComponent(resultId)}`)).text();
    if (body.indexOf("OOKLA.INIT_DATA") == -1) return null;
    let found = body.slice(body.indexOf('OOKLA.INIT_DATA'));
    found = found.slice(0, found.indexOf("}};")) + "}}";
    return JSON.parse(found.slice(found.indexOf('{"'))).result;
}

export default scrape;