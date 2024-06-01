import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '@/models/building.entity';
import { Location } from '@/models/location.entity';
import { CreateLocationDto, UpdateLocationDto } from '@/dtos/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async getLocationsByBuilding(buildingId: number) {
    const building = await this.buildingRepository.findOne({
      where: { id: buildingId },
      relations: ['locations'],
    });
    if (!building)
      throw new NotFoundException(`Building with ID ${buildingId} not found`);
    console.log({ locations: building.locations });
    return building.locations;
  }

  async getLocation(id: number) {
    const location = await this.locationRepository.find({
      where: [{ id }, { parentId: id }],
    });

    if (!location)
      throw new NotFoundException(`Location with ID ${id} not found`);

    return location;
  }

  async createBuilding(name: string) {
    const building = this.buildingRepository.create({ name });

    return this.buildingRepository.save(building);
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    const building = await this.buildingRepository.findOne({
      where: { id: createLocationDto.buildingId },
    });

    if (!building) throw new NotFoundException(`buildingId not found`);

    const { name, locationNumber, parentId, area } = createLocationDto;
    const location = this.locationRepository.create({
      building,
      name,
      locationNumber,
      parentId,
      area,
    });

    return this.locationRepository.save(location);
  }

  async updateLocation(updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOne({
      where: {
        id: updateLocationDto.id,
      },
    });

    if (location) {
      location.name = updateLocationDto.name;
      location.locationNumber = updateLocationDto.locationNumber;
      location.parentId = updateLocationDto.parentId;
      location.area = updateLocationDto.area;

      return this.locationRepository.save(location);
    }
    return null;
  }

  async removeLocation(id: number) {
    const location = await this.locationRepository.findOne({
      where: {
        id,
      },
    });

    if (location) {
      // Remove child locations
      await this.locationRepository
        .createQueryBuilder()
        .delete()
        .from(Location)
        .where('parentId = :id', { id })
        .execute();

      // Remove the location itself
      return this.locationRepository.remove(location);
    }

    throw new NotFoundException(`Location with ID ${id} not found`);
  }
}
