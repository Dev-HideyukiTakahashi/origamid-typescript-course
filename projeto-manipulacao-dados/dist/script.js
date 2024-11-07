import fetchData from "./fetchData.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json");
    if (data) {
        data.forEach(element => {
            console.log(element.Email);
        });
    }
}
;
handleData();
//# sourceMappingURL=script.js.map