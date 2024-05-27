import { Test, TestingModule } from '@nestjs/testing';
import { ChismososController } from './chismosos.controller';

describe('ChismososController', () => {
  let controller: ChismososController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChismososController],
    }).compile();

    controller = module.get<ChismososController>(ChismososController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
