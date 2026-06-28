import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'num',
      title: 'Number Label',
      type: 'string',
      description: 'e.g. 01, 02, etc.',
    }),
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      description: 'e.g. Programming, Development, AI / ML',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      description: 'Choose from: Code, Layout, Brain, Wrench, Camera',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'skills',
      title: 'Skills List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
