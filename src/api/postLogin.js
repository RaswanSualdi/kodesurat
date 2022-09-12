export default function postLogin(data) {
    const url = `https://lettercodeapi.000webhostapp.com/api/auth/login`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
