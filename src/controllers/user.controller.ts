import { Request, Response } from "express";
import { User, Iuser } from "../db/models/User";
import { where } from "sequelize/types";

export class UserController {

  public findUserById(req: Request, res: Response) {
    const { id } = req.params;
    User.findByPk<User>(id)
      .then((user) => {
        if (user) {
          res.status(200).json({
            message: `User ${user.firstName} found`,
            data: user,
          })
        }
        else res.status(404).json({ error: 'User not found' })
      }
      );
  }

  public allUsers(req: Request, res: Response) {
    User.findAll<User>({ order: [['createdAt', 'DESC']] })
      .then((users: User[]) => res.status(200).json({
        message: `${users.length} Users found`,
        data: users
      }))
      .catch((err: Error) => res.status(500).json({
        err,
        error: 'operation failed',
      }));
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const existing = await User.findOne<User>({ where: { email } });
    existing
      ? password === existing.password
        ? res.status(200).json({
          message: `Welcome ${existing.firstName}`,
          data: existing,
          token: `${existing.firstName},${existing.role}`
        })
        : res.status(401).json({
          message: 'unauthorized'
        })
      : res.status(404).json({
        message: `User with email ${email} not found`,
      })
  }

  public async signup(req: Request, res: Response) {
    // let data: User;
    // let message: string;
    const body: Iuser = req.body;
    const existing: any = await User.findOne<User>({ where: { email: body.email } })
    // .then((e:any) => Promise.resolve(e));
    // console.log(params, existing);
    existing
      ? res.status(400).json({
        error: `User with email ${existing.dataValues.email} exists`,
        data: existing
      })
      : User.create<User>(body)
        .then((user: User) => res.status(201).json({
          message: `User ${user.firstName} successfully signed up`,
          data: user
        }))
        .catch((err: Error) => res.status(500).json({
          err,
          error: 'failed to create User'
        }));
  }

  public async updateUser(req: Request, res: Response) {
    const { params: { id }, body } = req;
    const existing = await User.findByPk(id);
    User.update(body, { where: { id }, returning: true })
      .then((resp) => res.status(200).json({ message: `User ${existing.firstName} updated`, data: resp[1][0] }))
      .catch((e) => res.status(500).json({ error: 'update failed' }));
  }

  public deleteUser(req: Request, res: Response) {
    const { params: { id } } = req;
    User.destroy({ where: { id } })
      .then((del) => del !== 0
        ? res.status(200).json({ message: 'successfully deleted' })
        : res.status(400).json({ error: 'not deleted' }))
      .catch((e) => res.status(500).json({ error: 'internal error' }));
  }
}

export default new UserController();