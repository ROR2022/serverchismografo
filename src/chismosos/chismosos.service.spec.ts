import { Test, TestingModule } from '@nestjs/testing';
import { ChismososService } from './chismosos.service';

describe('ChismososService', () => {
  let service: ChismososService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChismososService],
    }).compile();

    service = module.get<ChismososService>(ChismososService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
