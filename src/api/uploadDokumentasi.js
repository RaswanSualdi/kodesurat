export default function uploadDokumentasi(data, id) {
    const url = `http://127.0.0.1:8000/api/files/${id}`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + window.localStorage.getItem("TOKEN_AUTH"),
        },
    });
}