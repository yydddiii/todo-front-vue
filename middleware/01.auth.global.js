export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) return;

    const router = useRouter();

    const token = JSON.parse(localStorage.getItem("token"));

    const user_info = useState("user_info");

    if (!token?.name && (to.path.includes("/login") || to.path.includes("/reg"))) return;

    if (!token?.name && !to.path.includes("/login") && !to.path.includes("/reg")) {
        router.push("/reg");

        setTimeout(() => {
            router.push("/login");
        }, 20);
        return;
    }

    try {
        const response = await checkToken();

        if (response.data.value.code != 200) {
            user_info.value = null;
            localStorage.setItem("token", JSON.stringify({name: null}));

            if (to.path.includes("/login") || to.path.includes("/reg")) return;

            router.push("/reg");
            setTimeout(() => {
                router.push("/login");
            }, 20);
            return;
        }

        user_info.value = {
            user_id: response.data.value.data.user_id,
            user_login: response.data.value.data.user_login,
        };

        await getTasks();
        await getCategories();
        
        if (to.path.includes("/login") || to.path.includes("/reg")){

            router.push("/archive");
            setTimeout(() => {
                router.push("/");
            }, 20);
            return ;
        } 
    } catch (error) {
        user_info.value = null;
        localStorage.setItem("token", JSON.stringify({name: null}));
        
        if (to.path.includes("/login") || to.path.includes("/reg")) return;
        
        router.push("/reg");
        setTimeout(() => {
            router.push("/login");
        }, 20);
    }
});
