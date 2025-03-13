// import parkingsRoute from "./parkings";
import userRoute from "./users";
import rechargeRoute from "./recharge";


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 * security:
 *   - bearerAuth: [] 
 */

export { userRoute, rechargeRoute };