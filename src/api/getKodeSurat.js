export default function getKodeSurat(page = 1, data = 20, search = "") {
    const url = `https://lettercodeapi.000webhostapp.com/api/letters?page=${page}&data=${data}&search=${search}`;
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + window.localStorage.getItem("TOKEN_AUTH"),
        },
    });
}
