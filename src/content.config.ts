import { defineCollection, z } from 'astro:content';

const langSchema = z.enum(['fr', 'en', 'it']);
const breadcrumbSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
});
const alternatesSchema = z.object({
  fr: z.string().optional(),
  en: z.string().optional(),
  it: z.string().optional(),
});

const baseSchema = z.object({
  key: z.string(),
  lang: langSchema,
  slug: z.string(),
  route: z.string(),
  title: z.string(),
  description: z.string(),
  alternates: alternatesSchema.default({}),
  breadcrumb: z.array(breadcrumbSchema).default([]),
  image: z.object({ src: z.string(), alt: z.string() }).nullable().optional(),
  paragraphs: z.array(z.string()).default([]),
});

const activities = defineCollection({
  type: 'data',
  schema: baseSchema.extend({
    activityName: z.string(),
    backLabel: z.string().nullable().optional(),
    backUrl: z.string().nullable().optional(),
    bookingLabel: z.string().nullable().optional(),
  }),
});

const events = defineCollection({
  type: 'data',
  schema: baseSchema.extend({
    eventName: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.string().nullable().optional(),
    datetime: z.string().nullable().optional(),
    backLabel: z.string().nullable().optional(),
    backUrl: z.string().nullable().optional(),
    bookingLabel: z.string().nullable().optional(),
  }),
});

const rooms = defineCollection({
  type: 'data',
  schema: baseSchema.extend({
    roomName: z.string(),
    subtitle: z.string().nullable().optional(),
    tagline: z.string().nullable().optional(),
    heroImage: z.string(),
    amenities: z.array(z.string()).default([]),
    amenitiesTitle: z.string().nullable().optional(),
    amenitiesSummary: z.string().nullable().optional(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    galleryTitle: z.string().nullable().optional(),
    bookingLabel: z.string().nullable().optional(),
    otherRoomsTitle: z.string().nullable().optional(),
    otherRoomsLabel: z.string().nullable().optional(),
    otherRoomsUrl: z.string().nullable().optional(),
  }),
});

export const collections = {
  activities,
  events,
  rooms,
};
