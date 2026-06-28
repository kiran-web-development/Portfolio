import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'num',
      title: 'Project Number',
      type: 'string',
      description: 'e.g. 01, 02',
    }),
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. AI & React, Web & Supabase',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Include hashtags e.g. #React, #TypeScript',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live View URL',
      type: 'url',
    }),
    defineField({
      name: 'initialLikes',
      title: 'Initial Likes',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
