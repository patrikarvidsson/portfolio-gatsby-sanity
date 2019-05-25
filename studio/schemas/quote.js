import sanityClient from 'part:@sanity/base/client'
import slugify from 'uuid/v4'

const uuidv4 = require('uuid/v4')

function uuidSlugifier (input, type) {
  const slug = uuidv4()
  const query = 'count(*[_type=="quote" && slug.current == $slug]{_id})'
  const params = { slug: slug }
  return sanityClient.fetch(query, params).then(count => {
    return `${slug}`
  })
}

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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'quoteNumber',
        slugify: uuidSlugifier
      }
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
