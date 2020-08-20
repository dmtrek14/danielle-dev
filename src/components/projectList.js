import React from 'react'
import { Link } from 'gatsby';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const ProjectList = ({data, isForHome}) => {
        
        return (
            <>
            { isForHome === true &&
                <>
                    <hr/>
                    <h2>what I'm working on</h2>
                </>
            }              
            <div className="project-list">
                {data.allMdx.edges.map(
                    ({ node}) => (
                        <div key={node.id} >
                            <h3> 
                            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                            </h3>
                            <p>{node.excerpt}</p>
                        </div>
                    )
                )}
            </div>
            </>
        )
    }
    
export default ProjectList;