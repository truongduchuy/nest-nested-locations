// location.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from '@/controllers/location.controller';
import { LocationService } from '@/services/location.service';
import { Location } from '@/models/location.entity';
import { Building } from '@/models/building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Building])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
