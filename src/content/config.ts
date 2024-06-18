import { defineCollection, z } from 'astro:content';

export const TypeEnum = z.enum([
	'base',
	'database',
	'storage',
	'queue',
	'webserver'
]);

export const ServiceName = z.enum([
	'base',
	'SQLite',
	'Postgres',
	'Caddy',
	'Redis',
	'RabbitMQ',
	'Kafka',
	'Elasticsearch',
	'Nginx',
	'Apache',
	'Nginx',
	'Apache',
])

const baseSchema = z.object({
	type: z.literal('base').optional().default('base'),
	name: ServiceName.optional().default('base'),
	shortTitle: z.string(),
	order: z.number().optional().default(Infinity),
	title: z.string(),
	description: z.string(),
	lastModifiedAt: z.coerce.date().optional(),
	publishedAt: z.coerce.date(),
});

const SQLite = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		type: z.literal(TypeEnum.enum.database).default(TypeEnum.enum.database),
		name: z.literal('SQLite').default('SQLite'),
	})
})

const Postgres = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		type: z.literal(TypeEnum.enum.database).default(TypeEnum.enum.database),
		name: z.literal('Postgres').default('Postgres'),
	})
})

const Redis = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		type: z.literal(TypeEnum.enum.database).default(TypeEnum.enum.database),
		name: z.literal('Redis').default('Redis'),
	})
})

const Caddy = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		type: z.literal(TypeEnum.enum.webserver).default(TypeEnum.enum.webserver),
		name: z.literal('Caddy').default('Caddy'),
	})
})

export const collections = {
	sqlite: SQLite,
	postgres: Postgres,
	caddy: Caddy,
	redis: Redis,
};
