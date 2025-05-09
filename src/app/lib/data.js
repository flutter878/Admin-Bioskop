import { connect } from "mongoose"
import { connectToDB } from "./utils";

export const fetchUser = async () => {
    try {
        connectToDB()
        const user = await User.find();
        return user
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users!");
    }
}