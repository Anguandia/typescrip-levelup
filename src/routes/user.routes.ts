import {Express} from "express";
import UserController from '../controllers/user.controller'

export const userRoutes = (app: Express) => {

    app.get("/users/:id", UserController.findUserById);
    app.put("/users/:id", UserController.updateUser);
    app.delete("/users/:id", UserController.deleteUser);
    app.get("/users", UserController.allUsers);
    app.post("/users", UserController.signup);
    app.post("/users/login", UserController.login);

};