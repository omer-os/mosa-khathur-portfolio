export default {
  name: 'featuredCertificate',
  type: 'document',
  title: 'Featured Certificate',
  fields: [
    {
      name: 'certificate',
      title: 'Select a Certificate',
      type: 'reference',
      to: [{type: 'certificates'}],
      validation: (Rule) => [Rule.required()],
    },
  ],
  preview: {
    select: {
      title: 'certificate.title',
      subtitle: 'certificate.subtitle',
      coverImage: 'certificate.coverImage',
    },
    prepare(selection) {
      const {title, subtitle, coverImage} = selection
      return {
        title: `Featured Certificate: ${title}`,
        subtitle: `Issued by: ${subtitle}`,
        media: coverImage,
      }
    },
  },
}
