export default function getDetailSurat(
    id,
    page = 1,
    data = 20,
    query = "",
    filterCompany = "0",
    dateFrom = 0,
    dateTo = 0
) {
    let url;
    if (filterCompany !== "0" && dateTo) {
        url = `https://lettercodeapi.000webhostapp.com/api/letters/${id}?page=${page}&data=${data}&search=${query}&date_from=${dateFrom}&date_to=${dateTo}&company=${filterCompany}`;
    } else if (filterCompany !== "0") {
        url = `https://lettercodeapi.000webhostapp.com/api/letters/${id}?page=${page}&data=${data}&search=${query}&company=${filterCompany}`;
    } else if (dateFrom && dateTo) {
        url = `https://lettercodeapi.000webhostapp.com/api/letters/${id}?page=${page}&data=${data}&search=${query}&date_from=${dateFrom}&date_to=${dateTo}`;
    } else {
        url = `https://lettercodeapi.000webhostapp.com/api/letters/${id}?page=${page}&data=${data}&search=${query}`;
    }

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
