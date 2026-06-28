import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: "Hi, i'm Kiran",
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'a web developer & AI Prompt Engineer and Content Creator | Photographer',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF',
      type: 'file',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      initialValue: 'https://github.com/mennikiran',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://www.linkedin.com/in/mennikiran',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://instagram.com/mennikiran',
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'WhatsApp URL',
      type: 'url',
      initialValue: 'https://wa.me/919390227632',
    }),
  ],
});
