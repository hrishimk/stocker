const getData = (url) => {
    return fetch(url);
};

const getQuality30 = async () => {
    const url = './data/MW-NIFTY200-QUALITY.csv';
    const data = await getData(url);
    console.log(data);
};

const getLowVolatile = async () => {
    const url = './data/MW-NIFTY100-LOW-VOLATILITY.csv';
    const data = await getData(url);
    console.log(data);
};

getQuality30();
getLowVolatile();