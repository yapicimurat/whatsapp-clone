

const fetchData =  async () => {

    const data1 = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data1");
        }, 3000);
    });


    const data2 = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("data2");
        }, 1500);
    });

    console.log(data1, data2);

};

fetchData();