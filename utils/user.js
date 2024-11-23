export async function checkToken() {
    try {
        return await request("/users/ckeck_token");
    } catch (error) {}
}

export async function userRegister(login, password) {
    await requestAuth("/users/register", {
        login: login,
        password: password,
    });
}

export async function userLogin(login, password) {
    await requestAuth("/users/login", {
        login: login,
        password: password,
    });
}

export async function userLoginChange(current_password, new_value) {
    return await request("/users/change/login", {
        current_password: current_password,
        new_value: new_value,
    });
}

export async function userPasswordChange(current_password, new_value) {
    return await request("/users/change/password", {
        current_password: current_password,
        new_value: new_value,
    });
}
