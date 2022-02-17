import { Router } from 'express';
import { URLScrapeRepository } from '../repositories/UrlScrapeRepository';
import { URLScrapeController } from '../controllers/URLScrapeController';
import { URLScrapeService } from '../services/URLScrapeService';
export default () => {
  const router = Router();

  const controller = new URLScrapeController(new URLScrapeService( new URLScrapeRepository));
  router.route('/').get((req, res, next) => controller.get(req, res, next));
  router.route('/').post((req, res, next) => controller.save(req, res, next));

  return router;
};
