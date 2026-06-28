import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About me',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      initialValue: "I am Menni Kiran Kumar, a B.Tech Computer Science student specializing in AI & Data Science. I focus on UI/UX design, frontend development, and backend systems, crafting striking and unforgettable digital solutions. Let's build something incredible together!",
    }),
    defineField({
      name: 'moonImage',
      title: 'Moon Decorative Image',
      type: 'image',
    }),
    defineField({
      name: 'legoImage',
      title: 'Lego Decorative Image',
      type: 'image',
    }),
    defineField({
      name: 'decorObject1',
      title: 'Bottom Left Decorative Image',
      type: 'image',
    }),
    defineField({
      name: 'decorObject2',
      title: 'Bottom Right Decorative Image',
      type: 'image',
    }),
  ],
});
