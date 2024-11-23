export async function request(endpoint, query = {}) {
    const user_info = useState("user_info"); // информация о пользователе
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token?.name) return;

    if (user_info.value) {
        query.user_id = user_info.value?.user_id;
    }

    query.token = token?.name;

    try {
        return await useFetch(`http://176.114.89.170/api${endpoint}`, {
            method: "post",
            query: query,
        });
    } catch (error) {}
}

export async function requestAuth(endpoint, query) {
    const router = useRouter();
    try {
        const response = await useFetch(`http://176.114.89.170/api${endpoint}`, {
            method: "post",
            query: query,
        });

        if (response.data.value.code != 200) {
            return;
        }
        localStorage.setItem("token", JSON.stringify({name: response.data.value.data.token}));
        router.push("/");
    } catch (error) {}
}
