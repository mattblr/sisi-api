export {};

const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const jwt = require("jsonwebtoken");
const { transformUser } = require("./transform");

module.exports = {
  createUser: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Not authorized!");
    }
    try {
      const existingUser = await User.findOne({
        email: args.email,
      });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = new User({
        email: args.email,
        password: hashedPassword,
      });

      const result = await newUser.save();

      return transformUser(result);
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }: any) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Login failed - please check email");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Login failed - please check password");
    }
    const token = await jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      "somesupersecretkey",
      { expiresIn: "1h" }
    );
    return { userId: user.id, token: token, tokenExpiration: "1" };
  },
};
