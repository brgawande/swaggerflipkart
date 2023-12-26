import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: function (password) {
          const upperCaseRegex = /[A-Z]/;
          const lowerCaseRegex = /[a-z]/;
          const numbersRegex = /[0-9]/;
          const specialCharectersRegex = /[!@#$%^&*()_+]/;

          return (
            upperCaseRegex.test(password) &&
            lowerCaseRegex.test(password) &&
            numbersRegex.test(password) &&
            specialCharectersRegex.test(password) &&
            password.length >= 6
          );
        },
        message:
          "Password must contain atleast One Uppercase, One lowerCase, one Number,one special charecter and must have atleast 6 charecters",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
