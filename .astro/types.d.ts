declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"caddy": {
"configure.md": {
	id: "configure.md";
  slug: "configure";
  body: string;
  collection: "caddy";
  data: any
} & { render(): Render[".md"] };
"container.md": {
	id: "container.md";
  slug: "container";
  body: string;
  collection: "caddy";
  data: any
} & { render(): Render[".md"] };
"intro.md": {
	id: "intro.md";
  slug: "intro";
  body: string;
  collection: "caddy";
  data: any
} & { render(): Render[".md"] };
};
"hetzner": {
"firewall.md": {
	id: "firewall.md";
  slug: "firewall";
  body: string;
  collection: "hetzner";
  data: InferEntrySchema<"hetzner">
} & { render(): Render[".md"] };
"intro.md": {
	id: "intro.md";
  slug: "intro";
  body: string;
  collection: "hetzner";
  data: InferEntrySchema<"hetzner">
} & { render(): Render[".md"] };
"load-balancer.md": {
	id: "load-balancer.md";
  slug: "load-balancer";
  body: string;
  collection: "hetzner";
  data: InferEntrySchema<"hetzner">
} & { render(): Render[".md"] };
"network.md": {
	id: "network.md";
  slug: "network";
  body: string;
  collection: "hetzner";
  data: InferEntrySchema<"hetzner">
} & { render(): Render[".md"] };
"provision.md": {
	id: "provision.md";
  slug: "provision";
  body: string;
  collection: "hetzner";
  data: InferEntrySchema<"hetzner">
} & { render(): Render[".md"] };
};
"postgres": {
"backups.md": {
	id: "backups.md";
  slug: "backups";
  body: string;
  collection: "postgres";
  data: any
} & { render(): Render[".md"] };
"configure.md": {
	id: "configure.md";
  slug: "configure";
  body: string;
  collection: "postgres";
  data: any
} & { render(): Render[".md"] };
"container.md": {
	id: "container.md";
  slug: "container";
  body: string;
  collection: "postgres";
  data: any
} & { render(): Render[".md"] };
"intro.md": {
	id: "intro.md";
  slug: "intro";
  body: string;
  collection: "postgres";
  data: any
} & { render(): Render[".md"] };
};
"redis": {
"backups.md": {
	id: "backups.md";
  slug: "backups";
  body: string;
  collection: "redis";
  data: any
} & { render(): Render[".md"] };
"container.md": {
	id: "container.md";
  slug: "container";
  body: string;
  collection: "redis";
  data: any
} & { render(): Render[".md"] };
"intro.md": {
	id: "intro.md";
  slug: "intro";
  body: string;
  collection: "redis";
  data: any
} & { render(): Render[".md"] };
};
"sqlite": {
"intro.md": {
	id: "intro.md";
  slug: "intro";
  body: string;
  collection: "sqlite";
  data: InferEntrySchema<"sqlite">
} & { render(): Render[".md"] };
"ws4sqlite.md": {
	id: "ws4sqlite.md";
  slug: "ws4sqlite";
  body: string;
  collection: "sqlite";
  data: InferEntrySchema<"sqlite">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
