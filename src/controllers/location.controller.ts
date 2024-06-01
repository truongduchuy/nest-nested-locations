import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { LocationService } from '@/services/location.service';
import { CreateLocationDto, UpdateLocationDto } from '@/dtos/location.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/location')
@ApiTags('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('building')
  @ApiOperation({ summary: 'Create a building' })
  async createBuilding(@Body('name') name: string) {
    return this.locationService.createBuilding(name);
  }

  @Get(':id/locations')
  @ApiOperation({ summary: 'Get locations of a building' })
  async getLocationsByBuilding(@Param('id') buildingId: number) {
    return this.locationService.getLocationsByBuilding(buildingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by id' })
  async getLocation(@Param('id') id: number) {
    return this.locationService.getLocation(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location' })
  async updateLocation(@Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.updateLocation(updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location' })
  async removeLocation(@Param('id') id: number) {
    return this.locationService.removeLocation(id);
  }
}
