import * as prismic from '@prismicio/client'

const repoName = import.meta.env.PRISMIC_REPO_NAME;
const accessToken = import.meta.env.PRISMIC_API_KEY;
const apiEndpoint = prismic.getEndpoint(repoName)
const client = prismic.createClient(apiEndpoint, { accessToken: accessToken})


export function getHome(){
    return client.getByType('home');
}

export function getAbout(){
    return client.getByType('about');
}

export function getUses(){
    return client.getByType('uses');
}

export function getExperiencePage(){
    return client.getByType('experience_page')
}

export function getAllProjects(){
    let params = { orderings: {field: 'my.project.project_start_date', direction: 'desc'}, pageSize: 100}
    return client.getByType('project', params)
}

export function getProjectByUid(uid){
    return client.getByUID('project', uid)
}

export function getCurrentProjects(){
    let params = { 
        predicates: [prismic.predicate.at("my.project.is_current", true)],
        orderings: { field: 'my.project.project_start_date', direction: 'desc'}, 
        pageSize: 12
    }
    return client.getByType('project', params)
}

export function getWorkExperience(){
    let params = {
        orderings: { field: 'my.experience.started_using', direction: 'asc'}, 
        pageSize: 50
    }
    return client.getByType('experience', params)
}