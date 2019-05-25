export default {
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    {
      name: 'quoteNumber',
      title: 'Quote Number',
      type: 'string'
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule projects where you show them',
      type: 'date'
    },
    {
      name: 'specification',
      title: 'Specification',
      type: 'markdown'
    },
    {
      name: 'validity',
      title: 'Validity',
      type: 'markdown'
    },
    {
      name: 'taskRow',
      title: 'Task',
      type: 'array',
      of: [
        {
          title: 'Task',
          type: 'quoteTask'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'client',
      quoteNumber: 'quoteNumber',
      publishedAt: 'publishedAt'
    },
    prepare ({ title = 'No title', quoteNumber = 'No quote number', publishedAt }) {
      return {
        title,
        subtitle: quoteNumber
      }
    }
  }
}
