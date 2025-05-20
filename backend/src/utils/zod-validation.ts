import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from "@nestjs/common";
import { ZodSchema } from "zod";

export class Validation implements PipeTransform {
	constructor(private readonly schema: ZodSchema) {}

	transform(value: unknown, metadata: ArgumentMetadata) {
		try {
			const parsedValue = this.schema.parse(value);
			return parsedValue;
		} catch (error) {
			throw new BadRequestException("Validation failed");
		}
	}
}
