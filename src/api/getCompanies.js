export default function getCompanies() {
    const url = "https://lettercodeapi.000webhostapp.com/api/companies";

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
