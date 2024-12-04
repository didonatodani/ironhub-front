import "./AboutPage.css"
import teamData from "../../data/team.json"
import AboutCard from "../../components/AboutCard/AboutCard"

function AboutPage(){


    return(
        <>
        {
            teamData.map((member, index)=>{
                return <AboutCard key={index} member={member}/>
            })
        }
        </>
    )
}

export default AboutPage