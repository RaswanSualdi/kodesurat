export default function postLogin(data) {
    const url = `http://127.0.0.1:8000/api/auth/login`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
