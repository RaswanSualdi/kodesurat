export default function deleteDetailSurat(id) {
    const url = `http://127.0.0.1:8000/api/letters/${id}`;

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
