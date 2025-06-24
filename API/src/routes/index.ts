import userRoute from "./users.ts";
import rechargeRoute from "./recharge.ts";

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