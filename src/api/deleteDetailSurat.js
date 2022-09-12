export default function deleteDetailSurat(id) {
    const url = `https://lettercodeapi.000webhostapp.com/api/letters/${id}`;

    return fetch(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + window.localStorage.getItem("TOKEN_AUTH"),
        },
    });
}
