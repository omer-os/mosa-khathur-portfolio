export default {
  name: 'certificates',
  title: 'certificates',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => [Rule.required()],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'coverImage',
    },
  },
}
