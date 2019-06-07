import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import { cn } from '../lib/helpers'

import BlockText from './block-text'

import styles from './project-preview.module.css'
import { responsiveTitle3 } from './typography.module.css'

function ProjectPreview (props) {
  const { categories } = props
  return (
    <Link className={styles.root} to={`/projects/${props.slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && props.mainImage.asset.fluid && (
          <Img fluid={props.mainImage.asset.fluid} alt={props.mainImage.alt} />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
      {categories && (
        <div className={styles.categories}>
          <ul>
            {categories.map(category => (
              <li key={category._id}>{category.title}</li>
            ))}
          </ul>
        </div>
      )}
    </Link>
  )
}

export default ProjectPreview
