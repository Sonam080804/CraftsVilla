import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    /* next -> Passes control to the next middleware or route 
    handler in the chain.*/
    // verify fun is used to compare (token verification)
    // Token present in header (headers.authorization -> Token)
    // console.log("Authorization Header:", req.headers.authorization);
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // After verification Token decode
    // decode -> Attaching Decoded Data to req.user (eg -> _id , expireDate etc..)
    req.user = decode;
    /* next() -> Ensures that the request-response 
    cycle is completed and does not get stuck.
    */ 
    next();
  } catch (error) {
    console.log(error);
  }
};



//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      // 
      const user = await userModel.findById(req.user._id);
      /* role = 0 -> normal user , role = 1 -> admin*/
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
};
