import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): Promise<import("./service.entity").Service>;
    findAll(): Promise<import("./service.entity").Service[]>;
    findOne(id: string): Promise<import("./service.entity").Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<import("./service.entity").Service>;
    remove(id: string): Promise<void>;
}
