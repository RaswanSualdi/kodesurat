export default function putDetailSurat(data, id) {
    const url = `https://lettercodeapi.000webhostapp.com/api/letters/${id}`;

    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + window.localStorage.getItem("TOKEN_AUTH"),
        },
    });
}
