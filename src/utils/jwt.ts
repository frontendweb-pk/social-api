import JWT, { JwtPayload, SignOptions } from "jsonwebtoken";

const DEFAULT_OPTIONS: SignOptions = {
  expiresIn: "1h",
};

export class Jwt {
  static sign(payload: JwtPayload, options = DEFAULT_OPTIONS) {
    return JWT.sign(payload, process.env.SECRET_KEY!, options);
  }
  static verify(token: string) {
    return JWT.verify(
      token,
      process.env.SECRET_KEY!,
      function done(err, decoded) {
        if (err) {
          return new Error("Invalid token");
        }
        return decoded;
      }
    );
  }
}
