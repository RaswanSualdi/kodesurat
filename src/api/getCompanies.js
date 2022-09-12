export default function getCompanies() {
    const url = "http://127.0.0.1:8000/api/companies";

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
