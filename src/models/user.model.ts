import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/600x400`,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY as string;

  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    secret,
    { expiresIn: expiry } as SignOptions
  );
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;
  const expiry = process.env.REFRESH_TOKEN_EXPIRY as string;

  if (!secret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined in .env file");
  }
  if (!expiry) {
    throw new Error("REFRESH_TOKEN_EXPIRY is not defined in .env file");
  }

  const token = jwt.sign(
    {
      _id: this._id.toString(),
    },
    secret,
    { expiresIn: expiry } as SignOptions
  );

  return token;
};

userSchema.methods.generateTemporaryToken = function () {
  const unhashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000;

  return {
    unhashedToken,
    hashedToken,
    tokenExpiry,
  };
};

export const User = mongoose.model("User", userSchema);
