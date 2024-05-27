import { Test, TestingModule } from '@nestjs/testing';
import { ChismesService } from './chismes.service';

describe('ChismesService', () => {
  let service: ChismesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChismesService],
    }).compile();

    service = module.get<ChismesService>(ChismesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
