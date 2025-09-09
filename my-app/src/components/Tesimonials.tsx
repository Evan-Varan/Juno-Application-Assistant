import Testimonial from './Testimonial'
import SectionHeading from './SectionHeading'
import { Section } from './Section'

const testimonials = [
  {
    contentText:
      "This app saved me hours of rewriting my job applications. The AI suggestions felt natural and professional.",
    userName: "Sarah Johnson",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Full-Stack Developer",
  },
  {
    contentText:
      "The layout is clean and easy to use. I was able to generate cover letters in minutes instead of stressing for days.",
    userName: "James Patel",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Software Engineer",
  },
  {
    contentText:
      "What impressed me the most is how personalized the recommendations felt. It's like having a career coach in your pocket.",
    userName: "Emily Chen",
    profilePicture: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "UX Designer",
  },
  {
    contentText:
      "I landed 3 interviews within two weeks after using this tool. Highly recommend for anyone on the job hunt.",
    userName: "Michael Thompson",
    profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
    role: "Data Analyst",
  },
]


export default function Testimonials(){
    return(
        <Section className = "flex flex-col items-center gap-4">
          <SectionHeading subheadingText = "TESTIMONIALS" headingText ="WHAT REAL DEVELOPERS SAY" pageText =""/> 

          {/* <h1 className="text-3xl flex text-white font-bold">WHAT REAL DEVELOPERS SAY</h1>  Maybe change size of heading text?*/}
      
          <div className = "flex flex-row gap-4 bottom-4 items-center justify-center">
              {testimonials.map((testimonial,key) =>(
                  <Testimonial
                  key = {key}
                  contentText= {testimonial.contentText}
                  userName= {testimonial.userName}
                  profilePicture= {testimonial.profilePicture}
                  role = {testimonial.role}
                  />
              ))}
          </div>
        </Section>
    )
}