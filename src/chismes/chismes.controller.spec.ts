import { Test, TestingModule } from '@nestjs/testing';
import { ChismesController } from './chismes.controller';

describe('ChismesController', () => {
  let controller: ChismesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChismesController],
    }).compile();

    controller = module.get<ChismesController>(ChismesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
