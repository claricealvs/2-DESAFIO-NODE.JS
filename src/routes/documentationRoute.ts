import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../documentation.json';

const router = Router();

router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default router;
