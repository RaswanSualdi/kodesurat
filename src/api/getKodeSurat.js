export default function getKodeSurat(page = 1, data = 20, search = "") {
    const url = `http://127.0.0.1:8000/api/letters?page=${page}&data=${data}&search=${search}`;
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
