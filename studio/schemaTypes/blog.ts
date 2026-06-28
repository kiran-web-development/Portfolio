import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. 5 min read',
    }),
    defineField({
      name: 'date',
      title: 'Date String',
      type: 'string',
      description: 'e.g. Jun 08, 2026',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
        ],
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'views',
      title: 'Views Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'likes',
      title: 'Likes Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'Main body content of the blog post',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'review',
          title: 'Review',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'rating', type: 'number', title: 'Rating' },
            { name: 'comment', type: 'text', title: 'Comment' },
            { name: 'date', type: 'string', title: 'Date String' },
          ],
        },
      ],
    }),
  ],
});
