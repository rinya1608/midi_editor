import localforage from "localforage";

export class AuthService{
    static async getCurrentUser() {
        if (await localforage.getItem("token").then((el) => {
            return el !== undefined && el !== null && el !== '';
        })) {
            return fetch('/api/auth/currentuser', {
                headers: {
                    "Authorization": "Bearer " + await localforage.getItem("token")
                }
            }).then(r => {
                if (!r.ok) {
                    throw new Error("Not authorized");
                }
                return r.json();
            })
        }
    }


}