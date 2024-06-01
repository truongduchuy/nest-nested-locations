import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from '../services/location.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Building } from '@/models/building.entity';
import { Location } from '@/models/location.entity';
import { Repository } from 'typeorm';
import { UpdateLocationDto } from '@/dtos/location.dto';
import { NotFoundException } from '@nestjs/common';

const building = { id: 1, name: 'Building1', locations: [] };
const locationPayload1 = {
  name: 'Location1',
  locationNumber: 'location1 number',
  parentId: null,
  area: 100,
  buildingId: 1,
};

const locationPayload2 = {
  name: 'Location2',
  locationNumber: 'location2 number',
  parentId: null,
  area: 200,
  buildingId: 1,
};

const location1 = {
  id: 1,
  name: 'Location1',
  locationNumber: 'location1 number',
  parentId: null,
  area: 100,
  building,
};

const location2 = {
  id: 1,
  name: 'Location1',
  locationNumber: 'location1 number',
  parentId: 1,
  area: 100,
  building,
};

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        { provide: getRepositoryToken(Building), useClass: Repository },
        { provide: getRepositoryToken(Location), useClass: Repository },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should create a building', async () => {
    jest
      .spyOn(service, 'createBuilding')
      .mockImplementation(() => Promise.resolve(building));

    expect(await controller.createBuilding('Building1')).toBe(building);
  });

  it('should create a building, create locations, and get locations of a building', async () => {
    jest
      .spyOn(service, 'createBuilding')
      .mockImplementation(() => Promise.resolve(building));

    jest
      .spyOn(service, 'createLocation')
      .mockImplementationOnce(() => Promise.resolve(location1))
      .mockImplementationOnce(() => Promise.resolve(location2));

    jest
      .spyOn(service, 'getLocationsByBuilding')
      .mockImplementation(() => Promise.resolve([location1, location2]));

    const createdBuilding = await controller.createBuilding('Building1');
    expect(createdBuilding).toBe(building);

    const createdLocation1 = await controller.createLocation(locationPayload1);
    expect(createdLocation1).toBe(location1);

    const createdLocation2 = await controller.createLocation(locationPayload2);
    expect(createdLocation2).toBe(location2);

    const locations = await controller.getLocationsByBuilding(building.id);
    expect(locations).toEqual([location1, location2]);
  });

  it('should get a location by id', async () => {
    const parentId = location1.id;
    const locationsWithParentId = [location1, location2];

    jest
      .spyOn(service, 'getLocation')
      .mockImplementation(() => Promise.resolve(locationsWithParentId));

    expect(await controller.getLocation(parentId)).toEqual(
      locationsWithParentId,
    );
  });

  it('should create a location', async () => {
    jest
      .spyOn(service, 'createLocation')
      .mockImplementation(() => Promise.resolve(location1));

    expect(await controller.createLocation(locationPayload1)).toBe(location1);
  });

  it('should update a location', async () => {
    const updatedLocation = { ...location1, name: 'updated Location1' };

    jest
      .spyOn(service, 'updateLocation')
      .mockImplementation(() => Promise.resolve(updatedLocation));

    expect(
      await controller.updateLocation({
        id: 1,
        name: 'updated Location1',
      } as UpdateLocationDto),
    ).toBe(updatedLocation);
  });

  it('should delete a location', async () => {
    jest
      .spyOn(service, 'removeLocation')
      .mockImplementation(() => Promise.resolve(location1));

    expect(await controller.removeLocation(location1.id)).toBe(location1);
  });

  it('should delete a wrong location', async () => {
    const wrongId = 2;
    const result = new NotFoundException(
      `Location with ID ${wrongId} not found`,
    );

    jest.spyOn(service, 'removeLocation').mockImplementation(() => {
      throw result;
    });

    try {
      await controller.removeLocation(wrongId);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe(result.message);
    }
  });
});
